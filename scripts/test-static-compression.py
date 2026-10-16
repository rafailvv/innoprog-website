import importlib.util
from pathlib import Path
import tempfile
import unittest
import sys

sys.dont_write_bytecode = True

ROOT = Path(__file__).resolve().parents[1]
spec = importlib.util.spec_from_file_location("compression", ROOT / "deploy/configure-static-compression.py")
module = importlib.util.module_from_spec(spec)
spec.loader.exec_module(module)
DIRECTIVES = (ROOT / "deploy/nginx/website-static-compression.conf").read_text()
SOURCE = '''server {
    server_name innoprog.ru;
    location ^~ /_next/static/ {
        alias /opt/innoprog/data/website-static/;
        add_header Cache-Control "public, max-age=31536000, immutable" always;
    }
    location / { proxy_pass http://127.0.0.1:8082; }
}
server { server_name app.innoprog.ru; location / { return 200; } }
'''


class CompressionTests(unittest.TestCase):
    def test_scoped_idempotent_patch_and_retained_headers(self):
        patched = module.patch_configuration(SOURCE, DIRECTIVES)
        self.assertEqual(module.patch_configuration(patched, DIRECTIVES), patched)
        self.assertIn('gzip_types text/css application/javascript', patched)
        self.assertEqual(patched.split('    location / ')[1:], SOURCE.split('    location / ')[1:])
        self.assertIn('add_header Cache-Control "public, max-age=31536000, immutable" always;', patched)
        tracked = (ROOT / "deploy/nginx/website-release-routing.conf").read_text()
        self.assertEqual(module.patch_configuration(tracked, DIRECTIVES), tracked)

    def test_ambiguous_or_unknown_configuration_fails_closed(self):
        for source in [SOURCE + SOURCE, SOURCE.replace('website-static/', 'other-static/'), SOURCE.replace('        alias', '        gzip on;\n        alias')]:
            with self.assertRaises(ValueError):
                module.patch_configuration(source, DIRECTIVES)

    def test_configuration_failure_restores_exact_bytes_and_permissions(self):
        with tempfile.TemporaryDirectory() as directory:
            path = Path(directory) / 'site.conf'
            path.write_text(SOURCE)
            path.chmod(0o640)
            calls = []
            def validate():
                calls.append('validate')
                if len(calls) == 1:
                    raise RuntimeError('syntax rejected')
            with self.assertRaisesRegex(RuntimeError, 'syntax rejected'):
                module.configure(path, ROOT / 'deploy/nginx/website-static-compression.conf', validate, lambda: calls.append('reload'))
            self.assertEqual(path.read_text(), SOURCE)
            self.assertEqual(path.stat().st_mode & 0o777, 0o640)
            self.assertEqual(calls, ['validate', 'validate', 'reload'])
            self.assertEqual(list(Path(directory).iterdir()), [path])

    def test_install_and_idempotent_retry_reload_validated_config(self):
        with tempfile.TemporaryDirectory() as directory:
            path = Path(directory) / 'site.conf'
            path.write_text(SOURCE)
            calls = []
            for expected in [True, False]:
                self.assertEqual(module.configure(path, ROOT / 'deploy/nginx/website-static-compression.conf', lambda: calls.append('validate'), lambda: calls.append('reload')), expected)
            self.assertEqual(calls, ['validate', 'reload', 'validate', 'reload'])

    def test_reload_failure_restores_prior_config(self):
        with tempfile.TemporaryDirectory() as directory:
            path = Path(directory) / 'site.conf'
            path.write_text(SOURCE)
            calls = []
            def reload():
                calls.append('reload')
                if calls.count('reload') == 1:
                    raise RuntimeError('reload rejected')
            with self.assertRaisesRegex(RuntimeError, 'reload rejected'):
                module.configure(path, ROOT / 'deploy/nginx/website-static-compression.conf', lambda: calls.append('validate'), reload)
            self.assertEqual(path.read_text(), SOURCE)
            self.assertEqual(calls, ['validate', 'reload', 'validate', 'reload'])

    def test_documented_include_layout_is_supported_without_site_mutation(self):
        with tempfile.TemporaryDirectory() as directory:
            root = Path(directory)
            routing = root / 'routing.conf'
            template = root / 'frozen.conf'
            content = module.patch_configuration(SOURCE, DIRECTIVES)
            routing.write_text(content)
            template.write_text(content)
            site = root / 'site.conf'
            site.write_text(f'server {{ include {routing}; }}\n')
            before = site.read_bytes()
            calls = []
            self.assertFalse(module.configure(site, ROOT / 'deploy/nginx/website-static-compression.conf', lambda: calls.append('validate'), lambda: calls.append('reload'), routing, template))
            self.assertEqual(site.read_bytes(), before)
            self.assertEqual(routing.read_text(), content)
            self.assertEqual(calls, ['validate', 'reload'])
            routing.write_text(content + '# concurrent checkout change\n')
            with self.assertRaisesRegex(ValueError, 'checkout drift'):
                module.configure(site, ROOT / 'deploy/nginx/website-static-compression.conf', lambda: None, lambda: None, routing, template)
            self.assertTrue(routing.read_text().endswith('# concurrent checkout change\n'))

    def test_deploy_executes_helper_and_policy_from_frozen_archive(self):
        deploy = (ROOT / 'deploy/deploy-blue-green.sh').read_text()
        command = 'python3 "$build_context/deploy/configure-static-compression.py"'
        self.assertIn(command, deploy)
        self.assertIn('--snippet "$build_context/deploy/nginx/website-static-compression.conf"', deploy)
        self.assertLess(deploy.index(command), deploy.index('rm -rf "$build_context"', deploy.index(command)))


if __name__ == '__main__':
    unittest.main()

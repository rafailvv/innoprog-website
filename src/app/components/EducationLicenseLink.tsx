import { EDUCATION_LICENSE_NUMBER, LEGAL_LINKS } from "../legalLinks";

export function EducationLicenseLink({ className }: { className?: string } = {}) {
  return (
    <a className={className} href={LEGAL_LINKS.licenseRegistry} rel="noopener noreferrer" target="_blank">
      Образовательная лицензия № <span className="site-license-number">{EDUCATION_LICENSE_NUMBER}</span>
    </a>
  );
}

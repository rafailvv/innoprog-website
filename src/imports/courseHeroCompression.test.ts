import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import sharp from 'sharp';
import { describe, expect, it } from 'vitest';

const shared = ['cpp-processor', 'data-analyst-dashboard', 'frontend-code-window', 'java-coffee-cup', 'ml-neural-network', 'mobile-developer-phone', 'unreal-engine-mark'];
const pairs = shared.flatMap(name => [
  { source: `shared/course-heroes/${name}.webp`, target: `shared/course-heroes/${name}.delivery.webp`, budget: 150 * 1024 },
  { source: `shared/course-heroes/${name}-420h.lossless.webp`, target: `shared/course-heroes/${name}-420h.delivery.webp`, budget: 80 * 1024 },
]).concat(['2x', '840', '480'].map(size => ({
  source: `DataScienceCourseDesktop/data-science-hero-${size}.lossless.webp`,
  target: `DataScienceCourseDesktop/data-science-hero-${size}.delivery.webp`, budget: (size === '2x' ? 250 : 150) * 1024,
})));
const file = (path: string) => resolve(process.cwd(), 'src/imports', path);

describe('course hero image compression', () => {
  it.each(pairs)('preserves size, transparency and appearance while reducing delivery bytes: $target', async ({ source, target, budget }) => {
    const original = readFileSync(file(source));
    const delivered = readFileSync(file(target));
    const before = await sharp(original).metadata();
    const after = await sharp(delivered).metadata();
    expect([after.width, after.height, after.hasAlpha]).toEqual([before.width, before.height, before.hasAlpha]);
    expect(delivered.length).toBeLessThanOrEqual(budget);
    expect(delivered.length).toBeLessThan(original.length * 0.5);
    const originalAlpha = await sharp(original).extractChannel('alpha').raw().toBuffer();
    const deliveredAlpha = await sharp(delivered).extractChannel('alpha').raw().toBuffer();
    expect(deliveredAlpha.equals(originalAlpha)).toBe(true);
    for (const background of ['#ffffff', '#464a6a']) {
      const a = await sharp(original).flatten({ background }).raw().toBuffer();
      const b = await sharp(delivered).flatten({ background }).raw().toBuffer();
      let absoluteError = 0;
      for (let index = 0; index < a.length; index++) absoluteError += Math.abs(a[index] - b[index]);
      expect(absoluteError / a.length).toBeLessThan(1.25);
    }
  });
});

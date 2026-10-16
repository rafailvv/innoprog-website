import { createHash } from "node:crypto";
import { readFileSync, statSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const courses = [
  ["courseProjectVisualImages.ts", 15],
  ["javaProjectVisualImages.ts", 15],
  ["cppProjectVisualImages.ts", 15],
  ["dataScienceProjectVisualImages.ts", 13],
  ["dataAnalystProjectVisualImages.ts", 15],
  ["frontendProjectVisualImages.ts", 15],
  ["mlEngineerProjectVisualImages.ts", 15],
  ["mobileDeveloperProjectVisualImages.ts", 15],
  ["unrealEngineProjectVisualImages.ts", 6],
] as const;

function projectFiles(mapping: string) {
  const source = readFileSync(resolve("src/imports", mapping), "utf8");
  return Array.from(source.matchAll(/import\s+\w+\s+from\s+["'](\.\/courseProjectVisuals\/[^"']+)["']/g),
    (match) => resolve("src/imports", match[1]));
}

describe("course project image catalogue", () => {
  it.each(courses)("provides one small WebP per project in %s", (mapping, count) => {
    const files = projectFiles(mapping);
    expect(files).toHaveLength(count);
    for (const file of files) {
      const bytes = readFileSync(file);
      expect(file).toMatch(/\.webp$/);
      expect(bytes.toString("ascii", 0, 4)).toBe("RIFF");
      expect(bytes.toString("ascii", 8, 12)).toBe("WEBP");
      expect(statSync(file).size).toBeLessThanOrEqual(150 * 1024);
    }
  });

  it("never repeats the same image within or across directions", () => {
    const files = courses.flatMap(([mapping]) => projectFiles(mapping));
    const hashes = files.map((file) => createHash("sha256").update(readFileSync(file)).digest("hex"));
    expect(new Set(files).size).toBe(files.length);
    expect(new Set(hashes).size).toBe(files.length);
  });
});

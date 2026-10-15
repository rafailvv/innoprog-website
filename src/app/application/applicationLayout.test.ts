import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

describe("standalone application layout", () => {
  it("loads its form stylesheet at the application route boundary", () => {
    const layout = readFileSync(resolve(process.cwd(), "src/app/application/layout.tsx"), "utf8");
    const rootStyles = readFileSync(resolve(process.cwd(), "src/styles/index.css"), "utf8");

    expect(layout).toContain('import "../../styles/application.css"');
    expect(rootStyles).not.toMatch(/\.site-application-page\s*\{/);
  });

  it("keeps the invisible captcha from sharing a horizontal row with the form", () => {
    const css = readFileSync(resolve(process.cwd(), "src/styles/application.css"), "utf8");
    const pageRule = css.match(/\.site-application-page\s*\{([^}]*)\}/)?.[1] ?? "";

    expect(pageRule).toContain("display: flex");
    expect(pageRule).toContain("flex-direction: column");
  });
});

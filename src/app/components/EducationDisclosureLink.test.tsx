import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import NotFoundPageContent from "../NotFoundPageContent";
import { SiteFooter } from "./ResponsiveSiteFooter";

describe("educational disclosure footer link", () => {
  const disclosureLinkPattern = /<a\b[^>]*href="\/sveden\/common"[^>]*>Сведения об образовательной организации<\/a>/g;

  it.each([
    ["desktop", false, 1],
    ["mobile", true, 1],
  ] as const)("renders a clickable link in the shared %s footer", (_name, isMobile, scale) => {
    const html = renderToStaticMarkup(<SiteFooter isMobile={isMobile} scale={scale} />);

    expect(html.match(disclosureLinkPattern)).toHaveLength(1);
    expect(html).not.toContain("Сведения об образовательной деятельности");
  });

  it("renders the same clickable link in the standalone 404 footer", () => {
    const html = renderToStaticMarkup(<NotFoundPageContent />);

    expect(html.match(disclosureLinkPattern)).toHaveLength(1);
  });
});

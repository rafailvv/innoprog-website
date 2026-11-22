import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import NotFoundPageContent from "../NotFoundPageContent";
import { ResponsiveSiteFooter } from "./ResponsiveSiteFooter";

describe("educational disclosure footer link", () => {
  const disclosureLinkPattern = /<a\b[^>]*href="\/sveden\/common"[^>]*>Сведения об образовательной организации<\/a>/g;

  it("renders a clickable link in the shared footer", () => {
    const html = renderToStaticMarkup(<ResponsiveSiteFooter />);

    expect(html.match(disclosureLinkPattern)).toHaveLength(1);
    expect(html).not.toContain("Сведения об образовательной деятельности");
  });

  it("renders the same clickable link in the standalone 404 footer", () => {
    const html = renderToStaticMarkup(<NotFoundPageContent />);
    const footer = html.match(/<footer\b[\s\S]*?<\/footer>/)?.[0] ?? "";

    expect(footer.match(disclosureLinkPattern)).toHaveLength(1);
  });
});

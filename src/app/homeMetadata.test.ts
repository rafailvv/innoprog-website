import { describe, expect, it } from "vitest";

import { metadata } from "./page";
import { HOME_PAGE_TITLE, webPageJsonLd } from "./seo";

describe("home page title", () => {
  it("uses the same full title in browser and link preview metadata", () => {
    expect(metadata.title).toEqual({ absolute: HOME_PAGE_TITLE });
    expect(metadata.openGraph?.title).toBe(HOME_PAGE_TITLE);
    expect(metadata.twitter?.title).toBe(HOME_PAGE_TITLE);
  });

  it("uses the full title in WebPage structured data", () => {
    const structuredData = webPageJsonLd({
      path: "/",
      name: HOME_PAGE_TITLE,
      description: "Описание",
    });

    expect(structuredData.name).toBe(HOME_PAGE_TITLE);
  });

  it("does not contain non-breaking spaces that can split the title inconsistently", () => {
    expect(HOME_PAGE_TITLE).toBe("ИННОПРОГ - курсы программирования для взрослых и детей");
    expect(HOME_PAGE_TITLE).not.toContain("\u00a0");
  });
});

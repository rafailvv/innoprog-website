import { describe, expect, it, vi } from "vitest";
import Page, { dynamicParams, generateMetadata, generateStaticParams } from "./page";
import { SVEDEN_SECTION_SLUGS } from "../data";

vi.mock("next/navigation", () => ({
  notFound: () => { throw new Error("NEXT_HTTP_ERROR_FALLBACK;404"); },
}));

describe("sveden route boundaries", () => {
  it("prerenders known sections and allows the explicit unknown-slug guard to run", () => {
    expect(generateStaticParams()).toEqual(SVEDEN_SECTION_SLUGS.map((section) => ({ section })));
    expect(dynamicParams).toBe(true);
  });

  it.each(SVEDEN_SECTION_SLUGS)("keeps %s accessible with its canonical URL", async (section) => {
    const params = Promise.resolve({ section });
    expect((await Page({ params })).props.section).toBe(section);
    expect((await generateMetadata({ params })).alternates?.canonical).toBe(`https://innoprog.ru/sveden/${section}`);
  });

  it.each(["null", "undefined", "not-a-section", "constructor", "__proto__"])(
    "rejects %s before metadata or content rendering", async (section) => {
      const params = Promise.resolve({ section });
      await expect(generateMetadata({ params })).rejects.toThrow("NEXT_HTTP_ERROR_FALLBACK;404");
      await expect(Page({ params })).rejects.toThrow("NEXT_HTTP_ERROR_FALLBACK;404");
    },
  );
});

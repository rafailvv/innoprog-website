import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { SvedenPage } from "./SvedenPage";
import { SVEDEN_SECTION_SLUGS } from "./data";

describe("educational disclosure server HTML", () => {
  it.each(SVEDEN_SECTION_SLUGS)("renders the %s section without client-side data loading", (section) => {
    const html = renderToStaticMarkup(<SvedenPage section={section} />);
    expect(html).toContain("Сведения об образовательной организации");
    expect(html).toContain(`href="/sveden/${section}"`);
    expect(html).toContain("itemProp=");
    expect(html).toContain("<h1 ");
    expect(html).toContain("<h2>");
    expect(html).toContain("<h3>");
  });

  it("renders all 47 education programs and approved totals", () => {
    const html = renderToStaticMarkup(<SvedenPage section="education" />);
    expect(html.match(/itemProp="eduOp"/g)).toHaveLength(47);
    expect(html.match(/itemProp="opMain"/g)).toHaveLength(47);
    expect(html.match(/itemProp="educationPlan"/g)).toHaveLength(47);
    expect(html.match(/itemProp="educationRpd"/g)).toHaveLength(47);
    expect(html.match(/itemProp="educationShedule"/g)).toHaveLength(47);
    expect(html).toContain('itemProp="languageEl"');
    expect(html).toContain('itemProp="eduChislenEl"');
    expect(html).toContain("72 человека: 68 по программам ДО и 4 по программам ДПО");
  });

  it("marks the license registry extract with the required property", () => {
    const html = renderToStaticMarkup(<SvedenPage section="common" />);
    expect(html).toContain('itemProp="licenseDocLink"');
  });

  it("uses the same generated header and footer surfaces as the main site", () => {
    const html = renderToStaticMarkup(<SvedenPage section="common" />);
    expect(html).toContain("site-main-header--mobile");
    expect(html).toContain("site-main-header--desktop");
    expect(html).toContain("site-main-footer-surface__mobile-canvas");
    expect(html).toContain('href="/reviews"');
    expect(html).toContain('href="/about"');
    expect(html).toContain('href="/application"');
    expect(html).toContain('aria-expanded="false"');
    expect(html).toContain("<header");
    expect(html).toContain("<footer");
  });

  it("publishes required negative document information", () => {
    const html = renderToStaticMarkup(<SvedenPage section="document" />);
    expect(html).toContain('itemProp="collectiveDog"');
    expect(html).toContain("Коллективный договор отсутствует");
    expect(html).toContain('itemProp="prescriptionDocLink"');
  });

  it("shows the freshness date only for dynamic disclosures", () => {
    for (const section of ["education", "employees", "budget", "vacant"] as const) {
      expect(renderToStaticMarkup(<SvedenPage section={section} />)).toContain("01.08.2026");
    }
    expect(renderToStaticMarkup(<SvedenPage section="common" />)).not.toContain("Дата актуальности динамических сведений");
    expect(renderToStaticMarkup(<SvedenPage section="struct" />)).not.toContain("Дата актуальности динамических сведений");
  });

  it("renders all 47 vacancy rows and funding sources", () => {
    const html = renderToStaticMarkup(<SvedenPage section="vacant" />);
    expect(html.match(/itemProp="vacant"/g)).toHaveLength(47);
    expect(html.match(/itemProp="eduCourse"/g)).toHaveLength(47);
    expect(html.match(/itemProp="numberBFVacant"/g)).toHaveLength(47);
    expect(html.match(/itemProp="numberBRVacant"/g)).toHaveLength(47);
    expect(html.match(/itemProp="numberBMVacant"/g)).toHaveLength(47);
    expect(html.match(/itemProp="numberPVacant"/g)).toHaveLength(47);
    expect(html).not.toMatch(/itemProp="number(?:BF|BR|BM|P)Vac"/);
  });
});

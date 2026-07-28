import React from "react";
import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import {
  FooterLegalDetails,
  SOFTWARE_REGISTRY_NOTICE,
} from "./FooterLegalDetails";

describe("FooterLegalDetails", () => {
  it("places the software registry notice immediately before the activity codes", () => {
    const { container } = render(
      <p>
        <FooterLegalDetails />
      </p>,
    );

    expect(container.textContent).toContain(SOFTWARE_REGISTRY_NOTICE);
    expect(container.textContent).toContain(
      `${SOFTWARE_REGISTRY_NOTICE}ОКВЭД: 62.09 (основной)`,
    );
  });

  it("keeps the compact mobile activity-code wording", () => {
    const { container } = render(
      <p>
        <FooterLegalDetails compactActivityCodes />
      </p>,
    );

    expect(container.textContent).toContain("ОКВЭД: 62.09 (осн.)");
  });
});

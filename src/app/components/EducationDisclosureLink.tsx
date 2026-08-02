import type { AnchorHTMLAttributes } from "react";
import { EDUCATION_DISCLOSURE_LABEL, LEGAL_LINKS } from "../legalLinks";

export function EducationDisclosureLink(props: AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <a {...props} href={LEGAL_LINKS.educationDisclosure}>
      {EDUCATION_DISCLOSURE_LABEL}
    </a>
  );
}

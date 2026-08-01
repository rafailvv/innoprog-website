import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SITE_NAME, SITE_URL } from "../../seo";
import { SvedenPage } from "../SvedenPage";
import { SVEDEN_SECTIONS, SVEDEN_SECTION_SLUGS, type SvedenSectionSlug } from "../data";

export const dynamicParams = false;

export function generateStaticParams() {
  return SVEDEN_SECTION_SLUGS.map((section) => ({ section }));
}

function isSection(value: string): value is SvedenSectionSlug {
  return (SVEDEN_SECTION_SLUGS as readonly string[]).includes(value);
}

export async function generateMetadata({ params }: { params: Promise<{ section: string }> }): Promise<Metadata> {
  const { section } = await params;
  if (!isSection(section)) return {};
  const info = SVEDEN_SECTIONS[section];
  const url = `${SITE_URL}/sveden/${section}`;
  return {
    title: `${info.title} — ${SITE_NAME}`,
    description: info.description,
    alternates: { canonical: url },
    openGraph: { title: info.title, description: info.description, url, type: "website" },
    robots: { index: true, follow: true },
  };
}

export default async function SvedenSectionPage({ params }: { params: Promise<{ section: string }> }) {
  const { section } = await params;
  if (!isSection(section)) notFound();
  return <SvedenPage section={section} />;
}

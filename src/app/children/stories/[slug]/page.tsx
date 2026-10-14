import type { Metadata } from "next";
import { notFound } from "next/navigation";
import data from "../../school/source-data.json";
import StoryPage from "../StoryPage";
import {
  JsonLd,
  createPageMetadata,
  breadcrumbJsonLd,
  absoluteUrl,
} from "../../../seo";
import { storySlugs, storyTitles, storySeo } from "../story-data";
const slugs: readonly string[] = storySlugs;
export function generateStaticParams() {
  return slugs.map((slug) => ({ slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const index = slugs.indexOf(slug);
  const item = data.reviews[index];
  if (!item) return {};
  return createPageMetadata({
    title: storySeo[index].title,
    description: storySeo[index].description,
    path: `/children/stories/${slug}`,
    ogImage: `/og/children-story-${slug}-v1.png`,
    ogImageAlt: storyTitles[index],
    ogImageSize: { width: 1200, height: 630 },
  });
}
export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const index = slugs.indexOf(slug);
  if (index < 0) notFound();
  const item = data.reviews[index];
  const path = `/children/stories/${slug}`;
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Главная", path: "/" },
          { name: "Программирование для детей", path: "/children" },
          { name: item.name, path },
        ])}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: storyTitles[index],
          description: storySeo[index].description,
          articleBody: item.text,
          inLanguage: "ru-RU",
          url: absoluteUrl(path),
          mainEntityOfPage: { "@type": "WebPage", "@id": absoluteUrl(path) },
          publisher: { "@id": "https://innoprog.ru/#organization" },
          image: [item.image, ...item.gallery].map(absoluteUrl),
          author: {
            "@type": "Organization",
            name: "ИННОПРОГ",
            url: "https://innoprog.ru",
          },
        }}
      />
      <StoryPage index={index} />
    </>
  );
}

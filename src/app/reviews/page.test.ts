import { describe, expect, it, vi } from "vitest";
import { generateMetadata } from "./page";
vi.mock("next/navigation", () => ({ useRouter: () => ({ push: vi.fn(), back: vi.fn(), replace: vi.fn(), prefetch: vi.fn() }) }));

describe("review filter indexing metadata", () => {
  it.each([{}, { utm_source: "example" }])("keeps the master reviews page indexable: %j", async (query) => {
    const metadata = await generateMetadata({ searchParams: Promise.resolve(query) });
    expect(metadata.robots).toMatchObject({ index: true, follow: true });
    expect(metadata.alternates?.canonical).toBe("https://innoprog.ru/reviews");
  });
  it.each([{ direction: "python" }, { review: "andrey" }, { direction: "python", review: "andrey" }, { direction: ["python", "java"] }])("aligns filter meta with HTTP noindex/follow: %j", async (query) => {
    const metadata = await generateMetadata({ searchParams: Promise.resolve(query) });
    expect(metadata.robots).toMatchObject({ index: false, follow: true, googleBot: { index: false, follow: true } });
    expect(metadata.alternates?.canonical).toBe("https://innoprog.ru/reviews");
    expect(metadata.title).toBe("Отзывы учеников ИННОПРОГ");
  });
});

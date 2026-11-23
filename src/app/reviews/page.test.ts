import { describe, expect, it, vi } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import ReviewsPage, { generateMetadata } from "./page";
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
    expect(metadata.title).toBe("Отзывы о курсах программирования и преподавателях");
  });
});

describe("reviews first render", () => {
  it("renders a selected review in the server HTML", async () => {
    const page = await ReviewsPage({ searchParams: Promise.resolve({ direction: "python", review: "vildan" }) });
    const document = new DOMParser().parseFromString(renderToStaticMarkup(page), "text/html");
    expect(document.querySelector(".site-course-review-feature h2")?.textContent).toContain("Вильдан");
    expect(document.querySelector(".site-shell--ready")).not.toBeNull();
  });
});

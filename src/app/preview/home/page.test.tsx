import type { ReactNode } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";
import MainScreenMobile from "../../../imports/MainScreenMobile/MainScreenMobile";
import HomePage, { metadata as homeMetadata } from "../../page";
import { GET as getRobots } from "../../robots.txt/route";
import sitemap from "../../sitemap";
import { HomeAudience } from "./HomeAudience";
import HomePreviewPage, { metadata as previewMetadata } from "./page";

vi.mock("../../App", async () => {
  const { default: DesktopHome } = await import("../../../imports/MainScreenDesktop/MainScreenDesktop");
  return {
    default: ({ homeBeforeCourses }: { homeBeforeCourses?: ReactNode }) =>
      <DesktopHome beforeCourses={homeBeforeCourses} />,
  };
});
vi.mock("next/navigation", () => ({ useRouter: () => ({ push: vi.fn() }) }));

describe("home audience preview", () => {
  it.each([
    ["desktop preview", <HomePreviewPage />],
    ["mobile home layout", <MainScreenMobile beforeCourses={<HomeAudience />} />],
  ])("shows four audience groups before the catalog in %s", (_layout, page) => {
    const document = new DOMParser().parseFromString(renderToStaticMarkup(page), "text/html");
    const audience = document.getElementById("komu-podoydet")!;
    const courses = document.getElementById("courses")!;
    expect(audience.compareDocumentPosition(courses) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    expect([...audience.querySelectorAll("h3")].map((heading) => heading.textContent)).toEqual([
      "С нуля", "Меняю профессию", "Уже работаю и хочу расти", "Школьник от 9 до 17 лет",
    ]);
    expect([...audience.querySelectorAll("a")].map((link) => link.getAttribute("href"))).toEqual([
      "/free-courses", "/python-course", "/frontend-developer-course",
      "/data-analyst-course", "/data-science-course", "/ml-engineer-course", "/children",
    ]);
  });

  it("keeps the new block out of the ordinary home page", () => {
    const html = renderToStaticMarkup(<HomePage />);
    expect(html).toContain('id="courses"');
    expect(html).not.toContain('id="komu-podoydet"');
  });

  it("applies indexing restrictions to the preview only", async () => {
    expect(previewMetadata.robots).toMatchObject({ index: false, follow: false });
    expect(homeMetadata.robots).toMatchObject({ index: true, follow: true });
    const robots = await getRobots().text();
    expect(robots).toMatch(/^Disallow: \/preview\/home$/m);
    expect(robots).toMatch(/^Allow: \/$/m);
    expect(sitemap().some(({ url }) => new URL(url).pathname === "/preview/home")).toBe(false);
  });
});

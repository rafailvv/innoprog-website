import { renderToStaticMarkup } from "react-dom/server";
import { expect, it } from "vitest";
import StudentStoriesPage from "./page";

it("renders both groups and their story links in the initial document", () => {
  const html = renderToStaticMarkup(<StudentStoriesPage />);
  const document = new DOMParser().parseFromString(html, "text/html");

  expect(document.querySelector('main a[href="/about"]')?.textContent?.trim()).toBe("О нас");
  expect(document.querySelector('main nav [aria-current="page"]')?.textContent).toBe("Истории учеников");
  expect([...document.querySelectorAll("main h2")].map((heading) => heading.textContent)).toEqual([
    "Истории взрослых",
    "Истории детей и подростков",
  ]);
  expect([...document.querySelectorAll("main section a")].map((link) => link.getAttribute("href"))).toEqual([
    "/reviews/kirill",
    "/reviews/anastasia",
    "/reviews/mikhail",
    "/children/stories/amir",
    "/children/stories/eldar",
    "/children/stories/almaz",
  ]);
  expect(document.querySelector('main a[href="/reviews"]')?.textContent?.trim()).toBe("все отзывы об обучении");
});

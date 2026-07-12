import { readFileSync } from "node:fs";

const appSource = readFileSync("src/app/App.tsx", "utf8");
const reviewsSource = readFileSync("src/app/studentReviewsData.ts", "utf8");

if (appSource.includes("replaceChildren(")) {
  throw new Error("Course review cards must not replace React-owned child nodes");
}

if (!appSource.includes("card.append(content)")) {
  throw new Error("Dynamic course review content must be appended without replacing React nodes");
}

const expectedCourseDirections = {
  PythonCoursePage: "python",
  DataScienceCoursePage: "data-science",
  FrontendCoursePage: "frontend",
  DataAnalystCoursePage: "data-science",
  CppCoursePage: "cpp",
  MobileDeveloperCoursePage: "mobile",
  UnrealEngineCoursePage: "unreal",
  JavaCoursePage: "java",
  MlEngineerCoursePage: "ml",
};

for (const [componentName, direction] of Object.entries(expectedCourseDirections)) {
  const componentStart = appSource.indexOf(`function ${componentName}(`);
  const nextComponentStart = appSource.indexOf("\nfunction ", componentStart + 1);
  const componentSource = appSource.slice(
    componentStart,
    nextComponentStart === -1 ? undefined : nextComponentStart,
  );

  if (componentStart === -1) {
    throw new Error(`Missing course component: ${componentName}`);
  }

  const expectedHook = `useCourseReviewDirection(courseCanvasRef, "${direction}")`;

  if (!componentSource.includes(expectedHook)) {
    throw new Error(`${componentName} must render only "${direction}" reviews`);
  }
}

const requiredDirections = new Set(Object.values(expectedCourseDirections));

for (const direction of requiredDirections) {
  const reviewsCount = [...reviewsSource.matchAll(new RegExp(`direction: "${direction}"`, "g"))].length;

  if (reviewsCount < 4) {
    throw new Error(`Direction "${direction}" must have at least 4 reviews, found ${reviewsCount}`);
  }
}

console.log("innoprog-website course review direction contracts ok");

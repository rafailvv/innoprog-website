import { readFileSync } from "node:fs";

const appSource = readFileSync("src/app/App.tsx", "utf8");
const reviewsSource = readFileSync("src/app/studentReviewsData.ts", "utf8");
const tariffsSource = appSource.slice(
  appSource.indexOf("const TARIFFS = ["),
  appSource.indexOf("const REVIEW_STORY_CARD_TITLES"),
);

for (const diploma of [
  "Диплом ИТ-школы ИННОПРОГ о прохождении курса",
  "Диплом о профессиональной переподготовке",
]) {
  const occurrences = tariffsSource.split(diploma).length - 1;

  if (occurrences !== 3) {
    throw new Error(`${diploma} must be included in all three tariffs`);
  }
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
  const courseName = componentName.replace(/Page$/, "");
  for (const viewport of ["Desktop", "Mobile"]) {
    const source = readFileSync(`src/imports/${courseName}${viewport}/${courseName}${viewport}.tsx`, "utf8");
    if ((source.match(/<CourseReviewCard /g) || []).length !== 4 ||
        !source.includes(`direction="${direction}"`)) {
      throw new Error(`${courseName}${viewport} must render four server-visible ${direction} reviews`);
    }
  }
}

const requiredDirections = new Set(Object.values(expectedCourseDirections));

for (const direction of requiredDirections) {
  const reviewsCount = [...reviewsSource.matchAll(new RegExp(`direction: "${direction}"`, "g"))].length;

  if (reviewsCount < 4) {
    throw new Error(`Direction "${direction}" must have at least 4 reviews, found ${reviewsCount}`);
  }
}

const expectedCourseDurations = {
  CppCourse: "12 месяцев",
  DataAnalystCourse: "10 месяцев",
  DataScienceCourse: "12 месяцев",
  FrontendCourse: "10 месяцев",
  JavaCourse: "12 месяцев",
  MlEngineerCourse: "12 месяцев",
  MobileDeveloperCourse: "10 месяцев",
  PythonCourse: "12 месяцев",
  UnrealEngineCourse: "10 месяцев",
};

for (const [courseName, duration] of Object.entries(expectedCourseDurations)) {
  for (const viewport of ["Desktop", "Mobile"]) {
    const source = readFileSync(
      `src/imports/${courseName}${viewport}/${courseName}${viewport}.tsx`,
      "utf8",
    );

    if (!source.includes(`За ${duration} освоите`)) {
      throw new Error(`${courseName}${viewport} must show the approved duration: ${duration}`);
    }

    if (/За 28 недель освоите/.test(source)) {
      throw new Error(`${courseName}${viewport} contains the obsolete 28-week duration`);
    }

    const diplomaFeatureGroups = source.split("<CourseTariffDiplomaFeatures tone=").length - 1;

    if (diplomaFeatureGroups !== 3) {
      throw new Error(`${courseName}${viewport} must include both diploma documents in all tariffs`);
    }
  }
}

console.log("innoprog-website course review direction contracts ok");

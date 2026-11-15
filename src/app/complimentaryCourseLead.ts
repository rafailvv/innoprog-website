export const FREE_MODULE_FORM_ID = "free-module-application";

type FreeModuleLocation = { page: "bonus" } | { page: "lesson"; lesson: string };

export type ComplimentaryCourseLeadSource = { module: string } & FreeModuleLocation;

const moduleNames: Record<string, string> = {
  "python-start": "Первые шаги в Python",
  "analytics-start": "Первые шаги в аналитике данных",
};

export function parseComplimentaryCourseLead(value: unknown): ComplimentaryCourseLeadSource | null {
  if (!value || typeof value !== "object") return null;
  const { module, page, lesson } = value as Record<string, unknown>;
  if (typeof module !== "string" || !Object.hasOwn(moduleNames, module)) return null;
  if (page === "bonus") return { module, page };
  if (page !== "lesson" || typeof lesson !== "string") return null;
  const title = lesson.replace(/\s+/g, " ").trim().slice(0, 140);
  return title ? { module, page, lesson: title } : null;
}

export function complimentaryCourseLeadLabel(source: ComplimentaryCourseLeadSource) {
  const location = source.page === "bonus"
    ? "страница бонуса, модуль пройден"
    : `урок «${source.lesson}»`;
  return `Бесплатник «${moduleNames[source.module]}», ${location}`;
}

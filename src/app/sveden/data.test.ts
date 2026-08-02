import { describe, expect, it } from "vitest";
import {
  EDUCATION_PROGRAMS,
  EDUCATION_TOTALS,
  SVEDEN_DOCUMENTS,
  SVEDEN_SECTION_SLUGS,
  VACANT_PROGRAMS,
} from "./data";

describe("educational disclosure contracts", () => {
  it("publishes all mandatory sections and approved PDF files", () => {
    expect(SVEDEN_SECTION_SLUGS).toHaveLength(14);
    expect(SVEDEN_DOCUMENTS).toHaveLength(101);
    expect(SVEDEN_DOCUMENTS.filter(({ category }) => category === "legal")).toHaveLength(3);
    expect(SVEDEN_DOCUMENTS.filter(({ category }) => category === "technical")).toHaveLength(2);
    expect(SVEDEN_DOCUMENTS.filter(({ category }) => category === "section" || category === "program")).toHaveLength(96);
    expect(new Set(SVEDEN_DOCUMENTS.map(({ storageKey }) => storageKey)).size).toBe(101);
    expect(SVEDEN_DOCUMENTS.every(({ storageKey }) => storageKey.startsWith("site-public/"))).toBe(true);
    expect(SVEDEN_DOCUMENTS.some(({ title }) => title === "Приказ № ОБР-8 об утверждении новых редакций локальных нормативных актов")).toBe(true);
    expect(SVEDEN_DOCUMENTS.some(({ title }) => title === "Приказ № ОБР-11 об утверждении новых редакций дополнительных профессиональных программ")).toBe(true);
    expect(SVEDEN_DOCUMENTS.some(({ title }) => title === "Приказ № ОБР-12 об организации образовательной деятельности с применением электронного обучения и дистанционных образовательных технологий.")).toBe(true);
    expect(SVEDEN_DOCUMENTS.some(({ title }) => title === "Приказ об организации обучения с применением электронного обучения и дистанционных образовательных технологий")).toBe(false);
    expect(SVEDEN_DOCUMENTS.some(({ title }) => title === "Положение о порядке разработки и утверждения дополнительных профессиональных программ")).toBe(true);
    expect(SVEDEN_DOCUMENTS.some(({ title }) => title === "Приказ № ОБР-9 об утверждении Положения о порядке разработки и утверждения дополнительных профессиональных программ")).toBe(true);
    expect(SVEDEN_DOCUMENTS.some(({ title }) => title === "Приказ ООО «ИННОПРОГ» от 02.08.2026 № ОБР-10 «Об утверждении количества вакантных мест для приёма (перевода) обучающихся»")).toBe(true);
    expect(SVEDEN_DOCUMENTS.some(({ sourceName }) => sourceName === "СВЕДЕНИЯ_О_ВАКАНТНЫХ_МЕСТАХ_НА_01.08.2026.pdf")).toBe(false);
  });

  it("keeps the approved program and student totals", () => {
    expect(EDUCATION_PROGRAMS).toHaveLength(47);
    expect(EDUCATION_PROGRAMS.filter(({ kind }) => kind === "ДО")).toHaveLength(38);
    expect(EDUCATION_PROGRAMS.filter(({ kind }) => kind === "ДПО")).toHaveLength(9);
    expect(EDUCATION_PROGRAMS.reduce((total, program) => total + program.students, 0)).toBe(72);
    expect(EDUCATION_PROGRAMS.filter(({ kind }) => kind === "ДО").reduce((total, program) => total + program.students, 0)).toBe(68);
    expect(EDUCATION_PROGRAMS.filter(({ kind }) => kind === "ДПО").reduce((total, program) => total + program.students, 0)).toBe(4);
    expect(EDUCATION_TOTALS).toMatchObject({ programs: 47, students: 72, generalStudents: 68, professionalStudents: 4 });
    expect(VACANT_PROGRAMS).toHaveLength(47);
    expect(VACANT_PROGRAMS.every(({ federal, regional, municipal }) => federal === 0 && regional === 0 && municipal === 0)).toBe(true);
    expect(VACANT_PROGRAMS.filter(({ kind }) => kind === "ДО").reduce((total, program) => total + program.paid, 0)).toBe(300);
    expect(VACANT_PROGRAMS.filter(({ kind }) => kind === "ДПО").reduce((total, program) => total + program.paid, 0)).toBe(100);
    expect(VACANT_PROGRAMS.map(({ paid }) => paid)).toEqual([
      5, 5, 12, 12, 5, 15, 5, 5, 5, 25, 20, 5, 8, 5, 8, 5, 12, 10, 5,
      10, 8, 8, 5, 5, 12, 10, 5, 10, 10, 5, 5, 5, 5, 5, 5, 5, 5, 5,
      10, 15, 15, 10, 10, 5, 25, 5, 5,
    ]);
    expect(EDUCATION_PROGRAMS.every(({ code }) => code === "Код и шифр образовательной программе не присвоены")).toBe(true);
    expect(EDUCATION_PROGRAMS.every(({ educationLevel }) => !educationLevel.includes("ДО"))).toBe(true);
    expect(EDUCATION_PROGRAMS.every(({ subjects, practice }) => subjects.length > 0 && practice.length > 0)).toBe(true);
    expect(EDUCATION_PROGRAMS.every(({ foreignStudents }) => foreignStudents === 0)).toBe(true);
  });
});

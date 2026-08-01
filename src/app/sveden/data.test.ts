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
    expect(SVEDEN_DOCUMENTS).toHaveLength(94);
    expect(SVEDEN_DOCUMENTS.filter(({ category }) => category === "legal")).toHaveLength(3);
    expect(SVEDEN_DOCUMENTS.filter(({ category }) => category === "technical")).toHaveLength(2);
    expect(SVEDEN_DOCUMENTS.filter(({ category }) => category === "section" || category === "program")).toHaveLength(89);
    expect(new Set(SVEDEN_DOCUMENTS.map(({ storageKey }) => storageKey)).size).toBe(94);
    expect(SVEDEN_DOCUMENTS.every(({ storageKey }) => storageKey.startsWith("site-public/"))).toBe(true);
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
    expect(EDUCATION_PROGRAMS.every(({ code }) => code === "Код и шифр дополнительной образовательной программе не присваиваются")).toBe(true);
    expect(EDUCATION_PROGRAMS.every(({ educationLevel }) => !educationLevel.includes("ДО"))).toBe(true);
    expect(EDUCATION_PROGRAMS.every(({ subjects, practice }) => subjects.length > 0 && practice.length > 0)).toBe(true);
    expect(EDUCATION_PROGRAMS.every(({ foreignStudents }) => foreignStudents === 0)).toBe(true);
  });
});

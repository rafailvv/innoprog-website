import { describe, expect, it } from "vitest";
import {
  EDUCATION_PROGRAMS,
  EDUCATION_TOTALS,
  SVEDEN_DOCUMENTS,
  SVEDEN_SECTION_SLUGS,
  VACANT_PROGRAMS,
} from "./data";
import {
  cppCourseJsonLd,
  dataAnalystCourseJsonLd,
  dataScienceCourseJsonLd,
  frontendCourseJsonLd,
  javaCourseJsonLd,
  mlEngineerCourseJsonLd,
  mobileDeveloperCourseJsonLd,
  pythonCourseJsonLd,
  unrealEngineCourseJsonLd,
} from "../seo";

describe("educational disclosure contracts", () => {
  it("publishes all mandatory sections and approved PDF files", () => {
    expect(SVEDEN_SECTION_SLUGS).toHaveLength(14);
    expect(SVEDEN_DOCUMENTS).toHaveLength(119);
    expect(SVEDEN_DOCUMENTS.filter(({ category }) => category === "legal")).toHaveLength(4);
    expect(SVEDEN_DOCUMENTS.filter(({ category }) => category === "technical")).toHaveLength(2);
    expect(SVEDEN_DOCUMENTS.filter(({ category }) => category === "archive")).toHaveLength(0);
    expect(SVEDEN_DOCUMENTS.filter(({ category }) => category === "section" || category === "program")).toHaveLength(113);
    expect(new Set(SVEDEN_DOCUMENTS.map(({ storageKey }) => storageKey)).size).toBe(119);
    expect(SVEDEN_DOCUMENTS.some(({ storageKey }) => storageKey === "site-public/legal/consent-representative.pdf")).toBe(true);
    expect(SVEDEN_DOCUMENTS.every(({ storageKey }) => storageKey.startsWith("site-public/"))).toBe(true);
    expect(SVEDEN_DOCUMENTS.some(({ title }) => title === "Приказ № ОБР-8 об утверждении новых редакций локальных нормативных актов")).toBe(true);
    expect(SVEDEN_DOCUMENTS.some(({ title }) => title === "Приказ № ОБР-11 об утверждении новых редакций дополнительных профессиональных программ")).toBe(true);
    expect(SVEDEN_DOCUMENTS.some(({ title }) => title === "Приказ № ОБР-12 об организации образовательной деятельности с применением электронного обучения и дистанционных образовательных технологий")).toBe(true);
    expect(SVEDEN_DOCUMENTS.some(({ title }) => title === "Приказ № ОБР-13 об утверждении детских образовательных программ")).toBe(true);
    expect(SVEDEN_DOCUMENTS.some(({ title }) => title === "Приказ № ОБР-14 о внесении изменений в приказ № ОБР-10 и установлении вакантных мест по детским образовательным программам")).toBe(true);
    expect(SVEDEN_DOCUMENTS.some(({ title }) => title === "Приказ об организации обучения с применением электронного обучения и дистанционных образовательных технологий")).toBe(false);
    expect(SVEDEN_DOCUMENTS.some(({ storageKey }) => storageKey.startsWith("site-public/sveden/archive/"))).toBe(false);
    expect(SVEDEN_DOCUMENTS.some(({ title }) => title === "Положение о порядке разработки и утверждения дополнительных профессиональных программ")).toBe(true);
    expect(SVEDEN_DOCUMENTS.some(({ title }) => title === "Приказ № ОБР-9 об утверждении Положения о порядке разработки и утверждения дополнительных профессиональных программ")).toBe(true);
    expect(SVEDEN_DOCUMENTS.some(({ title }) => title === "Приказ ООО «ИННОПРОГ» от 02.08.2026 № ОБР-10 «Об утверждении количества вакантных мест для приёма (перевода) обучающихся»")).toBe(true);
    expect(SVEDEN_DOCUMENTS.some(({ sourceName }) => sourceName === "СВЕДЕНИЯ_О_ВАКАНТНЫХ_МЕСТАХ_НА_01.08.2026.pdf")).toBe(false);
    expect(SVEDEN_DOCUMENTS).toContainEqual(expect.objectContaining({
      title: "Сведения о численности обучающихся по состоянию на 05.08.2026",
      sourceName: "СВЕДЕНИЯ_О_ЧИСЛЕННОСТИ_ОБУЧАЮЩИХСЯ_ПО_СОСТОЯНИЮ_НА_05.08.2026.pdf",
      sourceSha256: "29dc3e5ed523b73d1b6676e6e8a4cdbd23a628104c1ab1cf2678cd6c9ff5a3b2",
    }));
    expect(SVEDEN_DOCUMENTS.some(({ sourceName }) => sourceName === "Сведения_о_численности_обучающихся_по_реализуемым_образовательным_программам.pdf")).toBe(false);
  });

  it("keeps the approved program and student totals", () => {
    expect(EDUCATION_PROGRAMS).toHaveLength(62);
    expect(EDUCATION_PROGRAMS.filter(({ kind }) => kind === "ДО")).toHaveLength(53);
    expect(EDUCATION_PROGRAMS.filter(({ kind }) => kind === "ДПО")).toHaveLength(9);
    expect(EDUCATION_PROGRAMS.reduce((total, program) => total + program.students, 0)).toBe(72);
    expect(EDUCATION_PROGRAMS.filter(({ kind }) => kind === "ДО").reduce((total, program) => total + program.students, 0)).toBe(68);
    expect(EDUCATION_PROGRAMS.filter(({ kind }) => kind === "ДПО").reduce((total, program) => total + program.students, 0)).toBe(4);
    expect(EDUCATION_TOTALS).toMatchObject({ programs: 62, generalPrograms: 53, professionalPrograms: 9, students: 72, generalStudents: 68, professionalStudents: 4 });
    expect(VACANT_PROGRAMS).toHaveLength(62);
    expect(VACANT_PROGRAMS.every(({ federal, regional, municipal }) => federal === 0 && regional === 0 && municipal === 0)).toBe(true);
    expect(VACANT_PROGRAMS.filter(({ kind }) => kind === "ДО").reduce((total, program) => total + program.paid, 0)).toBe(420);
    expect(VACANT_PROGRAMS.filter(({ kind }) => kind === "ДПО").reduce((total, program) => total + program.paid, 0)).toBe(100);
    expect(VACANT_PROGRAMS.map(({ paid }) => paid)).toEqual([
      5, 5, 12, 12, 5, 15, 5, 5, 5, 25, 20, 5, 8, 5, 8, 5, 12, 10, 5,
      10, 8, 8, 5, 5, 12, 10, 5, 10, 10, 5, 5, 5, 5, 5, 5, 5, 5, 5,
      20, 20, 20, 20, 20, 20, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10, 15, 15, 10, 10, 5, 25, 5, 5,
    ]);
    expect(EDUCATION_PROGRAMS.every(({ code }) => code === "Код и шифр образовательной программе не присвоены")).toBe(true);
    expect(EDUCATION_PROGRAMS.every(({ educationLevel }) => !educationLevel.includes("ДО"))).toBe(true);
    expect(EDUCATION_PROGRAMS.every(({ subjects, practice }) => subjects.length > 0 && practice.length > 0)).toBe(true);
    expect(EDUCATION_PROGRAMS.every(({ foreignStudents }) => foreignStudents === 0)).toBe(true);
  });

  it("publishes the nine general programs approved by order No. OBR-5 with zero students", () => {
    const programs = EDUCATION_PROGRAMS.filter(({ fileName }) => fileName.includes("для детей от 12 лет и взрослых"));
    expect(programs).toHaveLength(9);
    expect(programs.every(({ kind, students, foreignStudents }) => kind === "ДО" && students === 0 && foreignStudents === 0)).toBe(true);
    expect(programs.every(({ document }) => document.storageKey.includes("/general/"))).toBe(true);
    expect(VACANT_PROGRAMS.filter(({ fileName }) => fileName.includes("для детей от 12 лет и взрослых")).every(({ paid }) => paid === 0)).toBe(true);
  });

  it("uses the six child programs approved by order No. OBR-13 on 05.08.2026", () => {
    const approvedHashes = new Map([
      ["Python-разработчик для детей программа обучения.pdf", "563988a9ef19f20a221ee904ef48ed4577ec798bc56fbd3b4137c94676493d0b"],
      ["Frontend-разработчик для детей программа обучения.pdf", "45f2e3b04fd3613461bcd7ae33a68b5ac82e8d75983c05f63284eb433bb45e48"],
      ["C++-разработчик для детей программа обучения.pdf", "1e9ef29e1b92e117c287438df57c60a359014590bc1ae6a32b4f789caa9e5be9"],
      ["Java-разработчик для детей программа обучения.pdf", "d46c9cd79b7b3c5608e9473f460330587f2221657c08dc9c43c9a87505bb4e64"],
      ["Мобильный разработчик для детей программа обучения.pdf", "e3163f0383569d83b20ec9618881948b1c8616081599a30e86d79e131608f9cb"],
      ["Разработчик игр на Unreal Engine для детей программа обучения.pdf", "4f50c58fa32463a8b67e34f76f3fca185ba7ccad51536768f80654054bf9bb18"],
    ]);
    const childPrograms = EDUCATION_PROGRAMS.filter(({ name }) => name.endsWith("для детей"));

    expect(childPrograms).toHaveLength(6);
    for (const program of childPrograms) {
      expect(program.volume).toBe("160 академических часов");
      expect(program.term).toContain("10 месяцев (40 учебных недель)");
      expect(program.students).toBe(0);
      expect(program.document.sourceSha256, program.name).toBe(approvedHashes.get(program.fileName));
    }
  });

  it("uses the nine professional program revisions approved on 02.08.2026", () => {
    const approvedHashes = new Map([
      ["C++ разработчик программа обучения.pdf", "f8875a162ff8d229de870164196523101e1e990a8db883fa31ed94426aa926fe"],
      ["Data Science программа обучения.pdf", "431a6def2c509dce7990594cbfecd06d7fb199433ffb360dabecf8b00524d68e"],
      ["Data-аналитик программа обучения.pdf", "e49dcee60330d4ce0bd5b9b2b8305f365283f61239967216d4ae76607ccb3445"],
      ["Frontend-разработчик программа обучения.pdf", "1db2f498b5b4da89d7597307daa9f65915f141827cecc1052b8a0349acae37dd"],
      ["Java-разработчик программа обучения.pdf", "68d6253281ed70427ca4ac5e778dba9edf09b3c6223b6f6fbe354fbd3a36e5eb"],
      ["ML-инженер программа обучения.pdf", "de970ab1a25c3ca0351ccb96dac00f81cc42114f264daf193f9378927ca46350"],
      ["Python-разработчик программа обучения.pdf", "628076454721465c468de459b3bbba8535ff4d7eaacab3776711d5aeb73d0402"],
      ["Unreal Engine программа обучения.pdf", "758656e03876052eec84c1f215c8e2ad43d228a725eff0766dff46413d3bf88e"],
      ["Мобильный разработчик программа обучения.pdf", "8b9ecd1ff4f22ff7c4c9c3c7b908c3eaca0230b1b326a2593ed946f4d5f64287"],
    ]);
    const professionalDocuments = SVEDEN_DOCUMENTS.filter(
      ({ category, storageKey }) => category === "program" && storageKey.includes("/professional/"),
    );

    expect(professionalDocuments).toHaveLength(9);
    for (const document of professionalDocuments) {
      expect(document.sourceSha256, document.sourceName).toBe(approvedHashes.get(document.sourceName));
    }
  });

  it("keeps public course schema durations aligned with approved DPO programs", () => {
    const courseSchemaByProgram = new Map([
      ["C++ разработчик", cppCourseJsonLd],
      ["Data Science", dataScienceCourseJsonLd],
      ["Data-аналитик", dataAnalystCourseJsonLd],
      ["Frontend-разработчик", frontendCourseJsonLd],
      ["Java-разработчик", javaCourseJsonLd],
      ["ML-инженер", mlEngineerCourseJsonLd],
      ["Python-разработчик", pythonCourseJsonLd],
      ["Unreal Engine", unrealEngineCourseJsonLd],
      ["Мобильный разработчик", mobileDeveloperCourseJsonLd],
    ]);

    for (const program of EDUCATION_PROGRAMS.filter(({ kind }) => kind === "ДПО")) {
      const schema = courseSchemaByProgram.get(program.name);
      const hours = Number.parseInt(program.volume, 10);
      const explicitWeeks = Number.parseInt(
        program.term.match(/(\d+) учебных недель/)?.[1] ?? "",
        10,
      );
      const months = Number.parseInt(program.term.match(/(\d+) месяцев/)?.[1] ?? "", 10);
      const weeks = Number.isNaN(explicitWeeks) ? months * 4 : explicitWeeks;

      expect(schema, program.name).toBeDefined();
      expect(schema?.totalTime, program.name).toBe(`PT${hours}H`);
      expect(schema?.timeRequired, program.name).toBe(`P${weeks}W`);
    }
  });

  it("publishes the Data analyst duration as exactly ten months", () => {
    const programs = EDUCATION_PROGRAMS.filter(({ name }) => name === "Data-аналитик");

    expect(programs).toHaveLength(2);
    for (const program of programs) {
      expect(program.term).toBe("10 месяцев");
    }
  });
});

import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { SvedenPage } from "./SvedenPage";
import { SVEDEN_DOCUMENTS, SVEDEN_SECTION_SLUGS } from "./data";
import itempropContract from "./itemprop-contract.json";

function getItemProps(html: string) {
  return new Set(
    [...html.matchAll(/itemProp="([^"]+)"/g)].flatMap((match) => match[1].split(/\s+/)),
  );
}

describe("educational disclosure server HTML", () => {
  const educationDeliveryText = "Образовательные программы реализуются в очной форме обучения с применением электронного обучения и дистанционных образовательных технологий. Взаимодействие обучающихся и педагогических работников осуществляется преимущественно на расстоянии с использованием электронной информационно-образовательной среды.";
  const educationalActivityPlace = "Местом осуществления образовательной деятельности является место нахождения ООО «ИННОПРОГ»: 420500, Республика Татарстан, г. Иннополис, ул. Университетская, д. 5, помещ. 115, рабочее место 15/2, независимо от места нахождения обучающихся.";

  it.each(SVEDEN_SECTION_SLUGS)("renders the %s section without client-side data loading", (section) => {
    const html = renderToStaticMarkup(<SvedenPage section={section} />);
    expect(html).toContain("Сведения об образовательной организации");
    expect(html).toContain(`href="/sveden/${section}"`);
    expect(html).toContain("itemProp=");
    expect(html).toContain("<h1 ");
    expect(html).toContain("<h2>");
    expect(html).toContain("<h3");
  });

  it.each(SVEDEN_SECTION_SLUGS)("renders the complete machine-readable contract for %s", (section) => {
    const html = renderToStaticMarkup(<SvedenPage section={section} />);
    const actual = getItemProps(html);

    for (const property of itempropContract[section]) {
      expect(actual, `${section}: missing itemprop=${property}`).toContain(property);
    }
    expect(actual).not.toContain("fmPlanDocLink");
    expect(actual).not.toContain("hosteInfo");
  });

  it("renders all 53 education programs and approved totals", () => {
    const html = renderToStaticMarkup(<SvedenPage section="education" />);
    expect(html.match(/itemProp="eduAccred eduOp"/g)).toHaveLength(53);
    expect(html.match(/scope="row" itemProp="eduName"/g)).toHaveLength(53);
    expect(html.match(/itemProp="opMain educationPlan educationRpd educationShedule eduPr methodology"/g)).toHaveLength(53);
    expect(html.match(/Скачать полную образовательную программу, включая учебный план, календарный учебный график, рабочие программы модулей, оценочные и методические материалы\./g)).toHaveLength(53);
    expect(html).not.toMatch(/>Описание программы<|>Учебный план<|>Рабочие программы и модули<|>Календарный учебный график<|>Сведения о практике<|>Методические документы</);
    expect(html.match(/itemProp="eduPred"/g)).toHaveLength(53);
    expect(html.match(/itemProp="eduPrac"/g)).toHaveLength(53);
    expect(html).toContain('itemProp="languageEl"');
    expect(html).toContain('itemProp="eduChislenEl"');
    expect(html).toContain("72 человека: 68 по дополнительным общеобразовательным программам и 4 по дополнительным профессиональным программам");
    expect(html).toContain("Дополнительная общеобразовательная общеразвивающая программа");
    expect(html).toContain("Дополнительная профессиональная программа профессиональной переподготовки");
    expect(html).toContain("Нормативный срок обучения");
    expect(html).toContain("Учебные предметы, курсы, дисциплины (модули)");
    expect(html).toContain("Код и шифр образовательной программе не присвоены");
    expect(html).not.toContain("Код и шифр образовательной программе не присваиваются");
    expect(html).toContain('aria-keyshortcuts="ArrowLeft ArrowRight PageUp PageDown Home End"');
    expect(html).toContain('aria-label="53 образовательных программ"');
    expect(html).toContain("Приказ № ОБР-13 об утверждении детских образовательных программ");
    expect(html).not.toMatch(/>ДО<|>ДПО<|Программы ДПО/);
  });

  it("marks the license registry extract with the required property", () => {
    const html = renderToStaticMarkup(<SvedenPage section="common" />);
    expect(html).toContain('itemProp="licenseDocLink"');
  });

  it("distinguishes the full-time form from distance education technologies", () => {
    const common = renderToStaticMarkup(<SvedenPage section="common" />);
    const objects = renderToStaticMarkup(<SvedenPage section="objects" />);
    const catering = renderToStaticMarkup(<SvedenPage section="catering" />);
    const combined = `${common}${objects}${catering}`;

    expect(common).toContain(educationalActivityPlace);
    for (const html of [common, objects, catering]) {
      expect(html).toContain(educationDeliveryText);
    }
    expect(combined).not.toMatch(/образовательная деятельность осуществляется дистанционно/i);
    expect(combined).not.toMatch(/обучение проводится дистанционно/i);
    expect(combined).not.toMatch(/программы реализуются исключительно с применением/i);
    expect(combined).not.toMatch(/дистанционн(?:ой|ом|ым) форм/i);
  });

  it("uses the same generated header and footer surfaces as the main site", () => {
    const html = renderToStaticMarkup(<SvedenPage section="common" />);
    expect(html).toContain("site-main-header--mobile");
    expect(html).toContain("site-main-header--desktop");
    expect(html).toContain("site-main-footer-surface__mobile-canvas");
    expect(html).toContain('href="/reviews"');
    expect(html).toContain('href="/about"');
    expect(html).toContain('href="/application"');
    expect(html).toContain('aria-expanded="false"');
    expect(html).toContain("<header");
    expect(html).toContain("<footer");
  });

  it("publishes required negative document information", () => {
    const html = renderToStaticMarkup(<SvedenPage section="document" />);
    expect(html).toContain('itemProp="localActCollec"');
    expect(html).toContain("Коллективный договор отсутствует");
    expect(html).toContain('itemProp="prescriptionDocLink"');
    expect(html).toContain('itemProp="ustavDocLink"');
    expect(html).toContain("Локальные нормативные акты по основным вопросам организации и осуществления образовательной деятельности");
    expect(html).toContain("Положение о порядке зачёта результатов ранее освоенных образовательных программ и их компонентов");
    expect(html).toContain("Приказ № ОБР-7 об утверждении Положения о порядке зачёта");
    expect(html).toContain("Приказ № ОБР-8 об утверждении новых редакций локальных нормативных актов");
    expect(html).toContain("Положение о порядке разработки и утверждения дополнительных профессиональных программ");
    expect(html).toContain("Приказ № ОБР-9 об утверждении Положения о порядке разработки и утверждения дополнительных профессиональных программ");
    expect(html).toContain("Приказ ООО «ИННОПРОГ» от 02.08.2026 № ОБР-10 «Об утверждении количества вакантных мест для приёма (перевода) обучающихся»");
    expect(html).toContain("Приказ № ОБР-11 об утверждении новых редакций дополнительных профессиональных программ");
    expect(html).toContain("Приказ № ОБР-12 об организации образовательной деятельности с применением электронного обучения и дистанционных образовательных технологий");
    expect(html).not.toContain("технологий.</a>");
    expect(html).toContain("В разделе размещены действующие редакции документов ООО «ИННОПРОГ».");
    expect(html).toContain("Локальный нормативный акт об электронном обучении и дистанционных образовательных технологиях");
    expect(html).toContain("Приказ о введении и организации обучения с применением ЭО и ДОТ");
    expect(html).not.toContain("Приказ об организации дистанционного обучения (архивная редакция)");
    const policyIndex = html.indexOf("Положение об электронном обучении и дистанционных образовательных технологиях");
    const policyItemEnd = html.indexOf("</li>", policyIndex);
    const orderIndex = html.indexOf("Приказ № ОБР-12", policyItemEnd);
    expect(orderIndex).toBeGreaterThan(policyItemEnd);
    expect(orderIndex).toBeLessThan(html.indexOf("</li>", policyItemEnd + 5));
  });

  it("links to the credit policy from the education section", () => {
    const html = renderToStaticMarkup(<SvedenPage section="education" />);
    const creditPolicy = SVEDEN_DOCUMENTS.find(({ title }) => title.startsWith("Положение о порядке зачёта"));
    expect(creditPolicy).toBeDefined();
    expect(html).toContain("Порядок зачёта результатов ранее освоенных образовательных программ и их компонентов установлен");
    expect(html).toContain(creditPolicy!.href);
  });

  it("shows the freshness date only for dynamic disclosures", () => {
    expect(renderToStaticMarkup(<SvedenPage section="education" />)).toContain("05.08.2026");
    for (const section of ["employees", "budget"] as const) {
      expect(renderToStaticMarkup(<SvedenPage section={section} />)).toContain("01.08.2026");
    }
    expect(renderToStaticMarkup(<SvedenPage section="vacant" />)).toContain("05.08.2026");
    expect(renderToStaticMarkup(<SvedenPage section="common" />)).not.toContain("Дата актуальности динамических сведений");
    expect(renderToStaticMarkup(<SvedenPage section="struct" />)).not.toContain("Дата актуальности динамических сведений");
  });

  it("publishes information about received financial and material resources", () => {
    const html = renderToStaticMarkup(<SvedenPage section="budget" />);
    expect(html).toContain('itemProp="volume"');
    expect(html).toContain('itemProp="finPost"');
    expect(html).toContain('itemProp="finRas"');
    expect(html).toContain("Безвозмездно полученные материальные средства");
    expect(html).toContain("Не поступали");
  });

  it("renders all 53 vacancy rows and funding sources", () => {
    const html = renderToStaticMarkup(<SvedenPage section="vacant" />);
    expect(html.match(/itemProp="vacant"/g)).toHaveLength(53);
    expect(html.match(/scope="row" itemProp="eduName"/g)).toHaveLength(53);
    expect(html.match(/itemProp="eduCourse"/g)).toHaveLength(53);
    expect(html.match(/itemProp="numberBFVacant"/g)).toHaveLength(53);
    expect(html.match(/itemProp="numberBRVacant"/g)).toHaveLength(53);
    expect(html.match(/itemProp="numberBMVacant"/g)).toHaveLength(53);
    expect(html.match(/itemProp="numberPVacant"/g)).toHaveLength(53);
    expect(html).not.toMatch(/itemProp="number(?:BF|BR|BM|P)Vac"/);
    expect(html).toContain("Код и шифр образовательной программе не присвоены");
    expect(html).not.toContain("Код и шифр образовательной программе не присваиваются");
    expect(html).toContain("Деление на курсы образовательной программой не предусмотрено");
    expect(html).toContain("По договорам об образовании за счёт средств физических и (или) юридических лиц");
    expect(html).toContain('aria-keyshortcuts="ArrowLeft ArrowRight PageUp PageDown Home End"');
    expect(html).toContain('aria-label="Вакантные места по образовательным программам"');
    expect(html).toContain("Количество вакантных мест по состоянию на 05.08.2026");
    expect(html).toContain("Python-разработчик");
    expect(html).toContain('itemProp="numberPVacant">25</td>');
  });

  it("uses the recommended international cooperation and catering tables", () => {
    const international = renderToStaticMarkup(<SvedenPage section="inter" />);
    expect(international).toContain('itemProp="internationalDog"');
    expect(international).toContain('itemProp="stateName"');
    expect(international).toContain('itemProp="orgName"');
    expect(international).toContain('itemProp="dogReg"');
    expect(international).toContain("Заключённые и планируемые к заключению договоры с иностранными и (или) международными организациями по вопросам образования и науки отсутствуют.");

    const catering = renderToStaticMarkup(<SvedenPage section="catering" />);
    expect(catering).toContain('itemProp="meals"');
    expect(catering).toContain('itemProp="objName"');
    expect(catering).toContain('itemProp="objAddress"');
    expect(catering).toContain('itemProp="objOvz"');
    expect(catering).toContain('itemProp="health"');
  });

  it("publishes the current pedagogical staff properties", () => {
    const html = renderToStaticMarkup(<SvedenPage section="employees" />);
    expect(html.match(/itemProp="teachingStaff"/g)).toHaveLength(2);
    expect(html.match(/scope="row"/g)).toHaveLength(2);
    for (const property of ["teachingDiscipline", "qualification", "profDevelopment", "specExperience", "teachingOp"]) {
      expect(html).toContain(`itemProp="${property}"`);
    }
    expect(html).not.toContain('itemProp="teachingDisciplin"');
    expect(html).toContain("Руководитель преподавательского состава");
    expect(html).toContain("Профессиональное образование не завершено. Обучается в Университете «Синергия» по направлению «Программная инженерия». Успешно прошёл промежуточную аттестацию не менее чем за два года обучения. Допущен к педагогической деятельности по дополнительным общеобразовательным программам в соответствии с частью 4 статьи 46 Федерального закона № 273-ФЗ.");
    expect(html).not.toContain("Руководитель педагогического состава");
    expect(html).not.toContain("Неоконченное профессиональное образование");
    expect(html).not.toContain("пройдены два профильных курса");
    expect(html).not.toContain("направлению «Разработка программного обеспечения»");
    expect(html).toContain("Приглашённые отраслевые эксперты");
    expect(html).toContain("Они не осуществляют самостоятельную реализацию учебных дисциплин (модулей), не проводят промежуточную и итоговую аттестацию и не принимают решений об освоении обучающимися образовательных программ.");
    expect(html.indexOf("Приглашённые отраслевые эксперты")).toBeGreaterThan(html.lastIndexOf('itemProp="teachingStaff"'));
    expect(html.match(/itemProp="teachingStaff"/g)).toHaveLength(2);
  });

  it("publishes the accessibility version control and paid education document property", () => {
    const common = renderToStaticMarkup(<SvedenPage section="common" />);
    expect(common).toContain('itemProp="copy"');

    const paid = renderToStaticMarkup(<SvedenPage section="paid_edu" />);
    expect(paid.match(/itemProp="paidDog"/g)).toHaveLength(1);
    expect(paid.match(/itemProp="paidSt"/g)).toHaveLength(1);
    expect(paid).toContain("Приказ № ОБР-4/1 об утверждении стоимости обучения");
    expect(paid).not.toContain(">Приказ № ОБР-4-1 об утверждении стоимости обучения<");
    expect(paid).toContain("Публичная оферта на заключение договора об оказании платных образовательных услуг (редакция от 02.08.2026)");
    expect(paid).not.toContain('itemProp="localAct"');
  });

  it("publishes material facilities and hostel details with explicit negative values", () => {
    const html = renderToStaticMarkup(<SvedenPage section="objects" />);
    for (const property of ["purposeCab", "addressCab", "nameCab", "osnCab", "ovzCab", "purposePrac", "addressPrac", "namePrac", "osnPrac", "ovzPrac", "purposeLibr", "purposeSport", "hostelNumOvz", "interNum", "interNumOvz", "hostelInterOvz", "localActObSt"]) {
      expect(html).toContain(`itemProp="${property}"`);
    }
    expect(html).toContain("При поступлении обращения специальные условия обучения определяются и организуются индивидуально с учётом потребностей обучающегося, рекомендаций ПМПК и (или) индивидуальной программы реабилитации или абилитации инвалида, а также возможностей электронной информационно-образовательной среды.");
    expect(html).toContain("Посещение обучающимися помещений организации образовательным процессом не предусмотрено. Программы реализуются в очной форме с применением электронного обучения и дистанционных образовательных технологий.");
    expect(html).not.toContain("возможность обучения определяется индивидуально");
    expect(html).not.toContain("возможность использования электронных материалов определяется индивидуально");
    expect(html).not.toContain("Здания для проведения занятий не используются");
  });
});

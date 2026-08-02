import React, { type ReactNode } from "react";
import { ResponsiveSiteFooter } from "../components/ResponsiveSiteFooter";
import { SvedenAccessibilityToggle, SvedenHeader } from "./SvedenHeader";
import { ScrollableTableRegion } from "./ScrollableTableRegion";
import {
  EDUCATION_PROGRAMS,
  EDUCATION_TOTALS,
  SVEDEN_DOCUMENTS,
  SVEDEN_SECTIONS,
  SVEDEN_SECTION_SLUGS,
  SVEDEN_UPDATED_AT,
  VACANT_PROGRAMS,
  formatDocumentSize,
  getSectionDocuments,
  type SvedenDocument,
  type SvedenSectionSlug,
} from "./data";
import styles from "./SvedenPage.module.css";

const NO_INFORMATION = "Отсутствует";
const DYNAMIC_SECTIONS = new Set<SvedenSectionSlug>([
  "education",
  "employees",
  "budget",
  "vacant",
]);

const DOCUMENT_ITEMPROPS: Record<string, string> = {
  "Устав типовой №24": "ustavDocLink",
  "Выписка из реестра лицензий от 15.07.2026": "licenseDocLink",
  "Правила внутреннего распорядка обучающихся": "localActStud",
  "Правила внутреннего трудового распорядка": "localActOrder",
  "Отчет о результатах самообследования за 2025 год": "reportEduDocLink",
  "Правила приема на обучение": "priemDocLink",
  "Положение о режиме занятий обучающихся": "modeDocLink",
  "Положение о текущем контроле и аттестации": "tekKontrolDocLink",
  "Положение о переводе отчислении и восстановлении": "perevodDocLink",
  "Положение о возникновении приостановлении и прекращении отношений": "vozDocLink",
  "Положение о специализированном структурном образовательном подразделении": "divisionClauseDocLink",
  "Положение об оказании платных образовательных услуг": "paidEdu",
  "Приказ № ОБР-4-1 об утверждении стоимости обучения": "paidSt",
  "Публичная оферта редакция 08.04.2026": "paidDog",
};

const DOCUMENT_DISPLAY_TITLES: Record<string, string> = {
  "Приказ № ОБР-4-1 об утверждении стоимости обучения": "Приказ № ОБР-4/1 об утверждении стоимости обучения",
  "Публичная оферта редакция 08.04.2026": "Публичная оферта на заключение договора об оказании платных образовательных услуг (редакция от 08.04.2026)",
};

const EDUCATION_DELIVERY_TEXT = "Образовательные программы реализуются в очной форме обучения с применением электронного обучения и дистанционных образовательных технологий. Взаимодействие обучающихся и педагогических работников осуществляется преимущественно на расстоянии с использованием электронной информационно-образовательной среды.";
const EDUCATIONAL_ACTIVITY_PLACE = "Местом осуществления образовательной деятельности является место нахождения ООО «ИННОПРОГ»: 420500, Республика Татарстан, г. Иннополис, ул. Университетская, д. 5, помещ. 115, рабочее место 15/2, независимо от места нахождения обучающихся.";

function Value({ itemProp, children }: { itemProp?: string; children: ReactNode }) {
  return <span itemProp={itemProp}>{children}</span>;
}

function DetailsTable({ rows, label }: { rows: Array<[string, ReactNode]>; label: string }) {
  return (
    <div className={styles.tableScroll} tabIndex={0} role="region" aria-label={label}>
      <table className={styles.detailsTable}>
        <tbody>
          {rows.map(([name, value]) => (
            <tr key={name}>
              <th scope="row">{name}</th>
              <td>{value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function DocumentList({ documents, purpose = "Электронная версия сведений раздела" }: { documents: SvedenDocument[]; purpose?: string }) {
  if (!documents.length) return null;
  return (
    <section className={styles.sectionBlock} aria-labelledby="documents-heading">
      <h3 id="documents-heading">Электронные документы раздела</h3>
      <ul className={styles.documentList}>
        {documents.map((document) => (
          <li key={document.id}>
            <a
              href={document.href}
              itemProp={DOCUMENT_ITEMPROPS[document.title]}
              rel="noopener noreferrer"
              target="_blank"
            >
              {DOCUMENT_DISPLAY_TITLES[document.title] ?? document.title}
            </a>
            <span>{purpose} · PDF · {formatDocumentSize(document.sizeBytes)}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

function CommonSection() {
  return (
    <>
      <h3>Об образовательной организации</h3>
      <DetailsTable label="Основные сведения об образовательной организации" rows={[
        ["Полное наименование", <Value itemProp="fullName">Общество с ограниченной ответственностью «ИННОПРОГ»</Value>],
        ["Сокращённое наименование", <Value itemProp="shortName">ООО «ИННОПРОГ»</Value>],
        ["Дата создания", <Value itemProp="regDate">22 декабря 2022 года</Value>],
        ["ИНН", "1683011286"],
        ["ОГРН", "1221600105440"],
        ["Учредитель", <span itemProp="uchredLaw"><Value itemProp="nameUchred">Венедиктов Рафаил Владимирович, доля в уставном капитале 100%</Value></span>],
        ["Юридический адрес", <Value itemProp="address">420500, Республика Татарстан, Верхнеуслонский муниципальный район, г. Иннополис, ул. Университетская, д. 5, помещ. 115, рабочее место 15/2</Value>],
        ["Форма обучения и применяемые образовательные технологии", EDUCATION_DELIVERY_TEXT],
        ["Место осуществления образовательной деятельности", EDUCATIONAL_ACTIVITY_PLACE],
        ["Режим и график работы", <Value itemProp="workTime">Понедельник-пятница: 09:00-21:00 по московскому времени; суббота и воскресенье: выходные дни</Value>],
        ["Телефон", <a href="tel:+79586067980" itemProp="telephone">+7 (958) 606-79-80</a>],
        ["Электронная почта", <a href="mailto:education@innoprog.ru" itemProp="email">education@innoprog.ru</a>],
        ["Места осуществления образовательной деятельности при использовании сетевой формы", <Value itemProp="addressPlaceSet">Сетевая форма реализации образовательных программ не используется</Value>],
        ["Места проведения практики", <Value itemProp="addressPlacePrac">{EDUCATIONAL_ACTIVITY_PLACE}</Value>],
        ["Места проведения практической подготовки", <Value itemProp="addressPlacePodg">{EDUCATIONAL_ACTIVITY_PLACE}</Value>],
        ["Места проведения государственной итоговой аттестации", <Value itemProp="addressPlaceGia">Государственная итоговая аттестация по реализуемым дополнительным образовательным программам не проводится</Value>],
        ["Места осуществления образовательной деятельности по дополнительным профессиональным программам", <Value itemProp="addressPlaceDop">{EDUCATIONAL_ACTIVITY_PLACE}</Value>],
        ["Места осуществления образовательной деятельности по основным программам профессионального обучения", <Value itemProp="addressPlaceOppo">Основные программы профессионального обучения не реализуются</Value>],
        ["Филиалы и представительства", "Отсутствуют"],
      ]} />
      <h3>Лицензия на образовательную деятельность</h3>
      <p>Регистрационный номер лицензии <strong>Л035-01272-16/01064358</strong> от 16.02.2024. Лицензия действует бессрочно.</p>
      <DocumentList documents={getSectionDocuments("common")} />
    </>
  );
}

function StructSection() {
  return (
    <>
      <h3>Органы управления и структурные подразделения</h3>
      <div itemProp="structOrgUprav">
        <DetailsTable label="Структура образовательной организации" rows={[
          ["Наименование", <Value itemProp="name">Специализированное структурное образовательное подразделение ООО «ИННОПРОГ»</Value>],
          ["Дата создания", "1 февраля 2025 года"],
          ["Руководитель", <><Value itemProp="fio">Венедиктов Рафаил Владимирович</Value>, <Value itemProp="post">генеральный директор</Value></>],
          ["Место нахождения", <Value itemProp="addressStr">420500, Республика Татарстан, г. Иннополис, ул. Университетская, д. 5, помещ. 115, рабочее место 15/2</Value>],
          ["Адрес официального сайта", <a href="https://innoprog.ru" itemProp="site">innoprog.ru</a>],
          ["Электронная почта", <a href="mailto:education@innoprog.ru" itemProp="email">education@innoprog.ru</a>],
          ["Филиалы", <Value itemProp="filInfo">Отсутствуют</Value>],
          ["Представительства", <Value itemProp="repInfo">Отсутствуют</Value>],
        ]} />
      </div>
      <DocumentList documents={getSectionDocuments("struct")} />
    </>
  );
}

function DocumentSection() {
  const charter = SVEDEN_DOCUMENTS.find((document) => document.title === "Устав типовой №24");
  if (!charter) throw new Error("The charter document is missing");

  return (
    <>
      <h3>Локальные нормативные акты и отчётность</h3>
      <p>Документы опубликованы в действующих редакциях.</p>
      <p itemProp="localActCollec">Коллективный договор отсутствует.</p>
      <p itemProp="prescriptionDocLink">Предписания органов государственного контроля в сфере образования и отчёты об их исполнении отсутствуют.</p>
      <DocumentList documents={[charter, ...getSectionDocuments("document")]} purpose="Нормативное регулирование образовательной деятельности" />
    </>
  );
}

function EducationSection() {
  const documents = getSectionDocuments("education");
  const languageDocument = documents.find((document) => document.title === "Положение о языке образования");
  const studentsDocument = documents.find((document) => document.title.startsWith("Сведения о численности обучающихся"));

  if (!languageDocument || !studentsDocument) {
    throw new Error("Required education disclosure documents are missing");
  }

  return (
    <>
      <h3>Общие сведения об образовательной деятельности</h3>
      <DetailsTable label="Сведения об образовательной деятельности" rows={[
        ["Формы обучения", "Очная форма обучения с применением электронного обучения и дистанционных образовательных технологий"],
        ["Язык образования", <>Русский язык. <a href={languageDocument.href} itemProp="languageEl" rel="noopener noreferrer" target="_blank">Электронный документ, PDF</a></>],
        ["Общее количество программ", `${EDUCATION_TOTALS.programs}: ${EDUCATION_TOTALS.generalPrograms} дополнительных общеобразовательных и ${EDUCATION_TOTALS.professionalPrograms} дополнительных профессиональных`],
        ["Общая численность обучающихся", <>72 человека: 68 по дополнительным общеобразовательным программам и 4 по дополнительным профессиональным программам; иностранных граждан — 0. <a href={studentsDocument.href} itemProp="eduChislenEl" rel="noopener noreferrer" target="_blank">Электронный документ, PDF</a></>],
        ["Государственная аккредитация", "Не предусмотрена для реализуемых дополнительных образовательных программ"],
        ["Научно-исследовательская деятельность в 2025 году", <Value itemProp="eduNir">Не осуществлялась</Value>],
        ["Трудоустройство выпускников", <Value itemProp="graduateJob">Обязательное распределение и гарантированное трудоустройство законодательством для данных программ не предусмотрены</Value>],
      ]} />
      <h3>Реализуемые образовательные программы</h3>
      <p>Утверждённый PDF каждой программы является единым документом и включает описание, учебный план, календарный учебный график, рабочие программы модулей, сведения о практике, оценочные и методические материалы.</p>
      <ScrollableTableRegion ariaLabel="47 образовательных программ" className={styles.tableScroll}>
        <table className={`${styles.dataTable} ${styles.programTable}`}>
          <thead><tr><th>Код, шифр</th><th>Наименование образовательной программы</th><th>Уровень образования</th><th>Образовательная программа</th><th>Форма обучения</th><th>Нормативный срок обучения</th><th>Объём программы</th><th>Учебные предметы, курсы, дисциплины (модули)</th><th>Практика</th><th>Язык образования</th><th>Численность обучающихся</th><th>Электронные документы</th></tr></thead>
          <tbody>
            {EDUCATION_PROGRAMS.map((program) => (
              <tr itemProp="eduAccred eduOp" key={`${program.kind}-${program.name}`}>
                <td itemProp="eduCode">{program.code}</td>
                <th scope="row" itemProp="eduName">{program.name}</th>
                <td itemProp="eduLevel">{program.educationLevel}</td>
                <td itemProp="eduProf">{program.programDescription}</td>
                <td itemProp="eduForm">{program.form}</td>
                <td itemProp="learningTerm">{program.term}</td>
                <td>{program.volume}</td>
                <td itemProp="eduPred">{program.subjects.join("; ")}</td>
                <td itemProp="eduPrac">{program.practice}</td>
                <td>{program.language}</td>
                <td>{program.students}, в том числе иностранных граждан — {program.foreignStudents}</td>
                <td className={styles.documentLinks}>
                  <a href={program.document.href} itemProp="opMain educationPlan educationRpd educationShedule eduPr methodology" rel="noopener noreferrer" target="_blank">Скачать полную образовательную программу, включая учебный план, календарный учебный график, рабочие программы модулей, оценочные и методические материалы.</a>
                  <small>PDF · {formatDocumentSize(program.document.sizeBytes)}</small>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </ScrollableTableRegion>
      <DocumentList documents={documents} />
    </>
  );
}

function ManagersSection() {
  return (
    <>
      <h3>Руководитель образовательной организации</h3>
      <div itemProp="rucovodstvo"><DetailsTable label="Сведения о руководстве" rows={[
        ["Фамилия, имя, отчество", <Value itemProp="fio">Венедиктов Рафаил Владимирович</Value>],
        ["Должность", <Value itemProp="post">Генеральный директор ООО «ИННОПРОГ», руководитель специализированного структурного образовательного подразделения</Value>],
        ["Телефон", <a href="tel:+79586067980" itemProp="telephone">+7 (958) 606-79-80</a>],
        ["Электронная почта", <a href="mailto:education@innoprog.ru" itemProp="email">education@innoprog.ru</a>],
      ]} /></div>
      <h3>Заместители, руководители филиалов и представительств</h3>
      <p itemProp="rucovodstvoZam">Заместители руководителя отсутствуют.</p>
      <p itemProp="rucovodstvoFil">Филиалы отсутствуют.</p>
      <p itemProp="rucovodstvoRep">Представительства отсутствуют.</p>
      <DocumentList documents={getSectionDocuments("managers")} />
    </>
  );
}

const EMPLOYEES = [
  {
    fio: "Венедиктов Рафаил Владимирович",
    post: "Генеральный директор, преподаватель",
    disciplines: "Дополнительные профессиональные программы: Python-разработчик, Data-аналитик, Data Science",
    education: "Высшее образование: бакалавриат по направлению «Информатика и вычислительная техника»; магистратура по направлению «Бизнес-информатика»",
    qualification: "Бакалавр; магистр",
    training: "Повышение квалификации отсутствует",
    retraining: "Профессиональная переподготовка отсутствует",
    experience: "5 лет работы в профессиональной сфере, соответствующей преподаваемым дисциплинам",
    programs: "Дополнительные профессиональные программы: Python-разработчик, Data-аналитик, Data Science",
  },
  {
    fio: "Королев Артемий Александрович",
    post: "Руководитель преподавательского состава",
    disciplines: "Дополнительные общеобразовательные программы по Python",
    education: "Профессиональное образование не завершено. Обучается в Университете «Синергия» по направлению «Программная инженерия». Успешно прошёл промежуточную аттестацию не менее чем за два года обучения. Допущен к педагогической деятельности по дополнительным общеобразовательным программам в соответствии с частью 4 статьи 46 Федерального закона № 273-ФЗ.",
    qualification: "Не присвоена",
    training: "Повышение квалификации отсутствует",
    retraining: "Профессиональная переподготовка отсутствует",
    experience: "3 года работы в профессиональной сфере, соответствующей преподаваемым дисциплинам",
    programs: "Дополнительные общеобразовательные общеразвивающие программы: «Python Начальный», «Python Продвинутый», «Turtle в Python», «Объектно-ориентированное программирование в Python», «Разработка игр на Python»",
  },
] as const;

function EmployeesSection() {
  return (
    <>
      <h3>Педагогические работники</h3>
      <div className={styles.tableScroll} tabIndex={0} role="region" aria-label="Сведения о педагогическом составе">
        <table className={styles.dataTable}>
          <thead><tr><th>ФИО и должность</th><th>Преподаваемые дисциплины</th><th>Образование и квалификация</th><th>Степень и звание</th><th>Повышение квалификации</th><th>Профессиональная переподготовка</th><th>Опыт работы</th><th>Образовательные программы</th></tr></thead>
          <tbody>
            {EMPLOYEES.map((employee) => <tr itemProp="teachingStaff" key={employee.fio}>
              <th scope="row"><strong itemProp="fio">{employee.fio}</strong><br /><span itemProp="post">{employee.post}</span></th>
              <td itemProp="teachingDiscipline">{employee.disciplines}</td>
              <td itemProp="teachingLevel">{employee.education}<br />Квалификация: {employee.qualification}</td>
              <td><span itemProp="degree">Учёная степень отсутствует</span>; <span itemProp="academStat">учёное звание отсутствует</span></td>
              <td itemProp="qualification">{employee.training}</td>
              <td itemProp="profDevelopment">{employee.retraining}</td>
              <td itemProp="specExperience">{employee.experience}</td>
              <td itemProp="teachingOp">{employee.programs}</td>
            </tr>)}
          </tbody>
        </table>
      </div>
      <DocumentList documents={getSectionDocuments("employees")} />
    </>
  );
}

function HostelTable() {
  return (
    <>
      <div className={styles.tableScroll} tabIndex={0} role="region" aria-label="Сведения об общежитии и интернате">
        <table className={`${styles.dataTable} ${styles.hostelTable}`}>
          <thead><tr><th>Показатель</th><th>Общежитие</th><th>Интернат</th></tr></thead>
          <tbody>
            <tr><th scope="row">Количество объектов</th><td itemProp="hosteInfo hostelInfo">0</td><td itemProp="interInfo">0</td></tr>
            <tr><th scope="row">Количество мест</th><td itemProp="hostelNum">0</td><td itemProp="interNum">0</td></tr>
            <tr><th scope="row">Количество жилых помещений, приспособленных для инвалидов и лиц с ОВЗ</th><td itemProp="hostelNumOvz">0</td><td itemProp="interNumOvz">0</td></tr>
          </tbody>
        </table>
      </div>
      <p itemProp="hostelInterOvz">Общежитие и интернат отсутствуют, поэтому условия для беспрепятственного доступа в них не создавались.</p>
      <p itemProp="localActObSt">Плата за проживание не установлена. Документ о порядке предоставления жилых помещений не утверждался в связи с отсутствием общежития и интерната.</p>
    </>
  );
}

function ObjectsSection() {
  return (
    <>
      <h3>Электронная информационно-образовательная среда</h3>
      <DetailsTable label="Материально-техническое обеспечение" rows={[
        ["Форма обучения и применяемые образовательные технологии", EDUCATION_DELIVERY_TEXT],
        ["Собственная электронная образовательная среда", <a href="https://app.innoprog.ru" itemProp="eoisOwn" rel="noopener noreferrer" target="_blank">app.innoprog.ru</a>],
        ["Состав платформы", <Value itemProp="purposeEios">17 модулей, 151 тема, 436 видеоматериалов, 393 урока с дополнительными материалами и 2008 заданий</Value>],
        ["Средства обучения и воспитания", <Value itemProp="purposeFacil">Электронные учебные материалы, видеолекции, практические задания, средства обратной связи и сопровождения наставником</Value>],
        ["Приспособленные средства обучения и воспитания", <Value itemProp="purposeFacilOvz">Специальные технические средства обучения на постоянной основе отсутствуют. При поступлении обращения специальные условия обучения определяются и организуются индивидуально с учётом потребностей обучающегося, рекомендаций ПМПК и (или) индивидуальной программы реабилитации или абилитации инвалида, а также возможностей электронной информационно-образовательной среды.</Value>],
        ["Доступ к информационным системам", <Value itemProp="comNet">Круглосуточный доступ через сеть Интернет по индивидуальной учётной записи</Value>],
        ["Приспособленный доступ к информационным системам", <Value itemProp="comNetOvz">Специально приспособленные информационные системы отсутствуют</Value>],
        ["Электронные образовательные ресурсы", <span itemProp="erList">Собственная образовательная платформа <a href="https://app.innoprog.ru" rel="noopener noreferrer" target="_blank">app.innoprog.ru</a>, видеоматериалы, задания и дополнительные учебные материалы</span>],
        ["Приспособленные электронные образовательные ресурсы", <Value itemProp="erListOvz">Специально приспособленные электронные образовательные ресурсы отсутствуют</Value>],
        ["Доступ в здания для инвалидов и лиц с ОВЗ", <Value itemProp="ovz">Посещение обучающимися помещений организации образовательным процессом не предусмотрено. Программы реализуются в очной форме с применением электронного обучения и дистанционных образовательных технологий.</Value>],
        ["Специальные технические средства для инвалидов и лиц с ОВЗ", <Value itemProp="techOvz">Специальные технические средства обучения на постоянной основе отсутствуют. При поступлении обращения специальные условия обучения определяются и организуются индивидуально с учётом потребностей обучающегося, рекомендаций ПМПК и (или) индивидуальной программы реабилитации или абилитации инвалида, а также возможностей электронной информационно-образовательной среды.</Value>],
      ]} />
      <h3>Оборудованные учебные кабинеты</h3>
      <div className={styles.tableScroll} tabIndex={0} role="region" aria-label="Оборудованные учебные кабинеты">
        <table className={styles.dataTable}>
          <thead><tr><th>Адрес</th><th>Наименование</th><th>Оснащённость</th><th>Приспособленность для инвалидов и лиц с ОВЗ</th></tr></thead>
          <tbody>
            <tr itemProp="purposeCab"><td itemProp="addressCab">Отдельный объект отсутствует</td><td itemProp="nameCab">Отдельный объект отсутствует</td><td itemProp="osnCab">Оснащение отдельного кабинета отсутствует; образовательные программы реализуются с использованием электронной информационно-образовательной среды</td><td itemProp="ovzCab">Специально приспособленный отдельный кабинет отсутствует</td></tr>
          </tbody>
        </table>
      </div>
      <h3>Объекты для проведения практических занятий</h3>
      <div className={styles.tableScroll} tabIndex={0} role="region" aria-label="Объекты для проведения практических занятий">
        <table className={styles.dataTable}>
          <thead><tr><th>Адрес</th><th>Наименование</th><th>Оснащённость</th><th>Приспособленность для инвалидов и лиц с ОВЗ</th></tr></thead>
          <tbody>
            <tr itemProp="purposePrac"><td itemProp="addressPrac">Отдельный объект отсутствует</td><td itemProp="namePrac">Отдельный объект отсутствует</td><td itemProp="osnPrac">Практические задания выполняются с использованием электронной информационно-образовательной среды</td><td itemProp="ovzPrac">Специально приспособленный объект отсутствует</td></tr>
          </tbody>
        </table>
      </div>
      <h3>Библиотеки и объекты спорта</h3>
      <div className={styles.tableScroll} tabIndex={0} role="region" aria-label="Библиотеки и объекты спорта">
        <table className={styles.dataTable}>
          <thead><tr><th>Вид объекта</th><th>Наименование</th><th>Адрес</th><th>Приспособленность для инвалидов и лиц с ОВЗ</th></tr></thead>
          <tbody>
            <tr itemProp="purposeLibr"><td>Библиотека</td><td itemProp="objName">Отдельная библиотека отсутствует; электронные материалы предоставляются в образовательной среде</td><td itemProp="objAddress">Отдельный объект отсутствует</td><td itemProp="objOvz">Специально приспособленная отдельная библиотека отсутствует</td></tr>
            <tr itemProp="purposeSport"><td>Объект спорта</td><td itemProp="objName">Отдельный объект отсутствует</td><td itemProp="objAddress">Отдельный объект отсутствует</td><td itemProp="objOvz">Специально приспособленный объект спорта отсутствует</td></tr>
          </tbody>
        </table>
      </div>
      <h3>Общежитие и интернат</h3>
      <HostelTable />
      <DocumentList documents={getSectionDocuments("objects")} />
    </>
  );
}

function PaidEducationSection() {
  return (
    <>
      <h3>Стоимость обучения</h3>
      <p>Тарифы применяются ко всем реализуемым образовательным программам, если отдельным распорядительным актом не утверждена иная стоимость.</p>
      <div className={styles.tableScroll} tabIndex={0} role="region" aria-label="Стоимость платных образовательных услуг">
        <table className={styles.dataTable}><thead><tr><th>Тариф</th><th>Занятий в месяц</th><th>Стоимость в месяц</th></tr></thead><tbody>
          <tr><td>Базовый</td><td>4</td><td>7 990 руб.</td></tr>
          <tr><td>Расширенный</td><td>8</td><td>14 390 руб.</td></tr>
          <tr><td>Персональный</td><td>12</td><td>18 890 руб.</td></tr>
        </tbody></table>
      </div>
      <p itemProp="paidParents">Плата за присмотр и уход за детьми не взимается, поскольку соответствующие услуги не оказываются.</p>
      <DocumentList documents={getSectionDocuments("paid_edu")} />
    </>
  );
}

function BudgetSection() {
  return (
    <>
      <h3>Финансовые показатели за 2025 год</h3>
      <div itemProp="volume"><DetailsTable label="Финансово-хозяйственная деятельность за 2025 год" rows={[
        ["Федеральный бюджет", <Value itemProp="finBFVolume">0 руб.</Value>],
        ["Бюджет субъекта Российской Федерации", <Value itemProp="finBRVolume">0 руб.</Value>],
        ["Местный бюджет", <Value itemProp="finBMVolume">0 руб.</Value>],
        ["Платные образовательные услуги", <Value itemProp="finPVolume">5 845 258,03 руб.</Value>],
        ["Общий объём поступлений", <Value itemProp="finPost">6 542 116,03 руб.</Value>],
        ["Общий объём расходов", <Value itemProp="finRas">6 386 301,75 руб.</Value>],
        ["Безвозмездно полученные материальные средства", "Не поступали"],
        ["Финансовый год", <Value itemProp="finYear">2025</Value>],
        ["Материальная помощь обучающимся", "Не предоставлялась"],
      ]} /></div>
      <p itemProp="fmPlanDocLink">План финансово-хозяйственной деятельности не формируется: ООО «ИННОПРОГ» является коммерческой организацией.</p>
      <DocumentList documents={getSectionDocuments("budget")} />
    </>
  );
}

function VacantSection() {
  return (
    <>
      <h3>Количество вакантных мест на 01.08.2026</h3>
      <ScrollableTableRegion ariaLabel="Вакантные места по образовательным программам" className={styles.tableScroll}>
        <table className={`${styles.dataTable} ${styles.vacancyTable}`}><thead><tr><th>Код, шифр</th><th>Наименование образовательной программы</th><th>Уровень образования</th><th>Образовательная программа</th><th>Курс</th><th>Форма обучения</th><th>Федеральный бюджет</th><th>Бюджет субъекта Российской Федерации</th><th>Местный бюджет</th><th>По договорам об образовании за счёт средств физических и (или) юридических лиц</th></tr></thead>
          <tbody>{VACANT_PROGRAMS.map((program) => <tr itemProp="vacant" key={`${program.kind}-${program.name}`}>
            <td itemProp="eduCode">{program.code}</td><th scope="row" itemProp="eduName">{program.name}</th><td itemProp="eduLevel">{program.educationLevel}</td><td itemProp="eduProf">{program.programDescription}</td><td itemProp="eduCourse">Деление на курсы образовательной программой не предусмотрено</td><td itemProp="eduForm">{program.form}</td><td itemProp="numberBFVacant">{program.federal}</td><td itemProp="numberBRVacant">{program.regional}</td><td itemProp="numberBMVacant">{program.municipal}</td><td itemProp="numberPVacant">{program.paid}</td>
          </tr>)}</tbody>
        </table>
      </ScrollableTableRegion>
      <DocumentList documents={getSectionDocuments("vacant")} />
    </>
  );
}

function GrantsSection() {
  return (
    <>
      <h3>Стипендии и меры социальной поддержки</h3>
      <DetailsTable label="Стипендии и меры поддержки" rows={[
        ["Стипендии", <Value itemProp="grant">Не предоставляются</Value>],
        ["Меры социальной поддержки", <Value itemProp="support">Не предоставляются</Value>],
        ["Трудоустройство выпускников", "Обязательное распределение отсутствует"],
      ]} />
      <h3>Общежитие и интернат</h3>
      <HostelTable />
      <DocumentList documents={getSectionDocuments("grants")} />
    </>
  );
}

function InternationalSection() {
  return (
    <>
      <h3>Международные договоры</h3>
      <p>Заключённые и планируемые к заключению договоры с иностранными и (или) международными организациями по вопросам образования и науки отсутствуют.</p>
      <div className={styles.tableScroll} tabIndex={0} role="region" aria-label="Сведения о международных договорах">
        <table className={`${styles.dataTable} ${styles.internationalTable}`}>
          <thead><tr><th>Государство</th><th>Наименование организации</th><th>Реквизиты договора</th></tr></thead>
          <tbody><tr itemProp="internationalDog"><td itemProp="stateName">Отсутствует</td><td itemProp="orgName">Отсутствует</td><td itemProp="dogReg">Отсутствует</td></tr></tbody>
        </table>
      </div>
      <DocumentList documents={getSectionDocuments("inter")} />
    </>
  );
}

function CateringSection() {
  return (
    <>
      <h3>Условия питания и охраны здоровья</h3>
      <p>{EDUCATION_DELIVERY_TEXT}</p>
      <p>Питание обучающихся не организуется, поскольку взаимодействие обучающихся и педагогических работников осуществляется преимущественно на расстоянии.</p>
      <div className={styles.tableScroll} tabIndex={0} role="region" aria-label="Сведения об условиях питания">
        <table className={styles.dataTable}>
          <thead><tr><th>Наименование объекта</th><th>Адрес места нахождения</th><th>Приспособленность для инвалидов и лиц с ОВЗ</th></tr></thead>
          <tbody><tr itemProp="meals"><td itemProp="objName">Объект питания отсутствует</td><td itemProp="objAddress">Отдельный объект питания отсутствует</td><td itemProp="objOvz">Специально приспособленный объект питания отсутствует</td></tr></tbody>
        </table>
      </div>
      <p itemProp="health">Охрана здоровья обеспечивается соблюдением режима занятий и перерывов, использованием безопасных цифровых технологий, информированием о требованиях к рабочему месту и возможностью обратиться к преподавателю или администрации. Медицинский кабинет отсутствует.</p>
      <DocumentList documents={getSectionDocuments("catering")} />
    </>
  );
}

function StandardsSection() {
  return (
    <>
      <h3>Применяемые стандарты и требования</h3>
      <p itemProp="eduFedDoc">Федеральные государственные образовательные стандарты к реализуемым дополнительным общеобразовательным и дополнительным профессиональным программам не применяются.</p>
      <p itemProp="eduFedTreb">Федеральные государственные требования не применяются.</p>
      <p itemProp="eduStandartDoc">Самостоятельно устанавливаемые образовательные стандарты отсутствуют.</p>
      <p itemProp="eduStandartTreb">Самостоятельно устанавливаемые требования отсутствуют.</p>
      <DocumentList documents={getSectionDocuments("eduStandarts")} />
    </>
  );
}

function SectionContent({ section }: { section: SvedenSectionSlug }) {
  switch (section) {
    case "common": return <CommonSection />;
    case "struct": return <StructSection />;
    case "document": return <DocumentSection />;
    case "education": return <EducationSection />;
    case "managers": return <ManagersSection />;
    case "employees": return <EmployeesSection />;
    case "objects": return <ObjectsSection />;
    case "paid_edu": return <PaidEducationSection />;
    case "budget": return <BudgetSection />;
    case "vacant": return <VacantSection />;
    case "grants": return <GrantsSection />;
    case "inter": return <InternationalSection />;
    case "catering": return <CateringSection />;
    case "eduStandarts": return <StandardsSection />;
    default: return <p>{NO_INFORMATION}</p>;
  }
}

export function SvedenPage({ section }: { section: SvedenSectionSlug }) {
  const current = SVEDEN_SECTIONS[section];
  return (
    <div className={styles.page} itemScope itemType="https://schema.org/EducationalOrganization">
      <SvedenHeader />
      <main className={styles.main}>
        <div className={styles.topline}>
          <nav aria-label="Хлебные крошки" className={styles.breadcrumbs}><a href="/">Главная</a><span aria-hidden="true">/</span><a href="/sveden/common">Сведения об образовательной организации</a><span aria-hidden="true">/</span><span>{current.shortTitle}</span></nav>
          <SvedenAccessibilityToggle className={styles.accessibilityToggle} />
        </div>
        <header className={styles.hero}>
          <h1 title="Сведения об образовательной организации">Сведения об образовательной организации</h1>
          {DYNAMIC_SECTIONS.has(section) ? (
            <p className={styles.updated}>Дата актуальности динамических сведений: <time dateTime="2026-08-01">{SVEDEN_UPDATED_AT}</time></p>
          ) : null}
        </header>
        <div className={styles.layout}>
          <nav aria-label="Подразделы сведений об образовательной организации" className={styles.sectionNav}>
            {SVEDEN_SECTION_SLUGS.map((slug) => <a aria-current={slug === section ? "page" : undefined} href={`/sveden/${slug}`} key={slug}>{SVEDEN_SECTIONS[slug].shortTitle}</a>)}
          </nav>
          <article className={styles.content}>
            <h2>{current.title}</h2>
            <SectionContent section={section} />
          </article>
        </div>
      </main>
      <ResponsiveSiteFooter />
    </div>
  );
}

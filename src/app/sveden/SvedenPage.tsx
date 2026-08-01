import React, { type ReactNode } from "react";
import { SiteLegalFooter } from "../components/SiteLegalFooter";
import { SvedenHeader } from "./SvedenHeader";
import {
  EDUCATION_PROGRAMS,
  EDUCATION_TOTALS,
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
  "Положение о специализированном структурном образовательном подразделении": "divisionClauseDo",
  "Положение об оказании платных образовательных услуг": "paidEdu",
  "Публичная оферта редакция 08.04.2026": "paidDog",
};

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

function DocumentList({ documents, purpose = "Публикация обязательных сведений" }: { documents: SvedenDocument[]; purpose?: string }) {
  if (!documents.length) return null;
  return (
    <section className={styles.sectionBlock} aria-labelledby="documents-heading">
      <h3 id="documents-heading">Документы раздела</h3>
      <ul className={styles.documentList}>
        {documents.map((document) => (
          <li key={document.id}>
            <a
              href={document.href}
              itemProp={DOCUMENT_ITEMPROPS[document.title] || "localAct"}
              rel="noopener noreferrer"
              target="_blank"
            >
              {document.title}
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
        ["Юридический адрес и место осуществления образовательной деятельности", <Value itemProp="address">420500, Республика Татарстан, Верхнеуслонский муниципальный район, г. Иннополис, ул. Университетская, д. 5, помещ. 115, рабочее место 15/2</Value>],
        ["Режим и график работы", <Value itemProp="workTime">Понедельник-пятница: 09:00-21:00 по московскому времени; суббота и воскресенье: выходные дни</Value>],
        ["Телефон", <a href="tel:+79586067980" itemProp="telephone">+7 (958) 606-79-80</a>],
        ["Электронная почта", <a href="mailto:education@innoprog.ru" itemProp="email">education@innoprog.ru</a>],
        ["Места осуществления практической подготовки", <Value itemProp="addressPlacePrac">Практическая подготовка реализуется дистанционно с применением электронной информационно-образовательной среды</Value>],
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
          ["Руководитель", <Value itemProp="fioPost">Венедиктов Рафаил Владимирович, генеральный директор</Value>],
          ["Место нахождения", <Value itemProp="addressStr">420500, Республика Татарстан, г. Иннополис, ул. Университетская, д. 5, помещ. 115, рабочее место 15/2</Value>],
          ["Адрес официального сайта", <a href="https://innoprog.ru" itemProp="site">innoprog.ru</a>],
          ["Электронная почта", <a href="mailto:education@innoprog.ru">education@innoprog.ru</a>],
          ["Филиалы", <Value itemProp="filInfo">Отсутствуют</Value>],
          ["Представительства", <Value itemProp="repInfo">Отсутствуют</Value>],
        ]} />
      </div>
      <DocumentList documents={getSectionDocuments("struct")} />
    </>
  );
}

function DocumentSection() {
  return (
    <>
      <h3>Локальные нормативные акты и отчётность</h3>
      <p>Документы опубликованы в действующих редакциях. Предписания органов государственного контроля в сфере образования и отчёты об их исполнении отсутствуют.</p>
      <span className={styles.visuallyHidden} itemProp="prescriptionDocLink">Предписания отсутствуют</span>
      <DocumentList documents={getSectionDocuments("document")} purpose="Нормативное регулирование образовательной деятельности" />
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
        ["Формы обучения", "Очная с применением электронного обучения и дистанционных образовательных технологий"],
        ["Язык образования", <>Русский язык. <a href={languageDocument.href} itemProp="languageEl" rel="noopener noreferrer" target="_blank">Электронный документ, PDF</a></>],
        ["Общее количество программ", `${EDUCATION_TOTALS.programs}: ${EDUCATION_TOTALS.generalPrograms} дополнительных общеобразовательных и ${EDUCATION_TOTALS.professionalPrograms} дополнительных профессиональных`],
        ["Общая численность обучающихся", <>72 человека: 68 по программам ДО и 4 по программам ДПО; иностранных граждан — 0. <a href={studentsDocument.href} itemProp="eduChislenEl" rel="noopener noreferrer" target="_blank">Электронный документ, PDF</a></>],
        ["Государственная аккредитация", <Value itemProp="eduAccred">Не предусмотрена для реализуемых дополнительных образовательных программ</Value>],
        ["Научно-исследовательская деятельность в 2025 году", <Value itemProp="eduNir">Не осуществлялась</Value>],
        ["Трудоустройство выпускников", <Value itemProp="graduateJob">Обязательное распределение и гарантированное трудоустройство законодательством для данных программ не предусмотрены</Value>],
      ]} />
      <h3>Реализуемые образовательные программы</h3>
      <p>Для каждой программы приведены вид, форма, срок, объём, модули, язык, текущая численность и утверждённый документ.</p>
      <div className={styles.tableScroll} tabIndex={0} role="region" aria-label="47 образовательных программ">
        <table className={`${styles.dataTable} ${styles.programTable}`}>
          <thead><tr><th>Код и направление</th><th>Уровень и программа</th><th>Форма, срок и объём</th><th>Модули</th><th>Язык</th><th>Численность</th><th>Электронные документы</th></tr></thead>
          <tbody>
            {EDUCATION_PROGRAMS.map((program) => (
              <tr itemProp="eduOp" key={`${program.kind}-${program.name}`}>
                <td><span itemProp="eduCode">Не применяется</span><br /><span itemProp="eduName">Дополнительное образование</span></td>
                <td><span itemProp="eduLevel">{program.kind}</span><br /><strong itemProp="eduProf">{program.name}</strong></td>
                <td><span itemProp="eduForm">{program.form}</span>; <span itemProp="learningTerm">{program.term}</span>; {program.volume}</td>
                <td>{program.modules.join("; ")}</td>
                <td>{program.language}</td>
                <td>{program.students}</td>
                <td className={styles.documentLinks}>
                  <a href={program.document.href} itemProp="opMain" rel="noopener noreferrer" target="_blank">Описание программы</a>
                  <a href={program.document.href} itemProp="educationPlan" rel="noopener noreferrer" target="_blank">Учебный план</a>
                  <a href={program.document.href} itemProp="educationRpd" rel="noopener noreferrer" target="_blank">Рабочие программы и модули</a>
                  <a href={program.document.href} itemProp="educationShedule" rel="noopener noreferrer" target="_blank">Календарный учебный график</a>
                  <small>PDF · {formatDocumentSize(program.document.sizeBytes)}</small>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
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
    disciplines: "Программы ДПО: Python-разработчик, Data-аналитик, Data Science",
    education: "Высшее образование: бакалавриат по направлению «Информатика и вычислительная техника»; магистратура по направлению «Бизнес-информатика»",
    qualification: "Бакалавр; магистр",
    training: "Повышение квалификации и профессиональная переподготовка: отсутствуют",
    experience: "Общий стаж — 5 лет; стаж работы по специальности — 5 лет",
  },
  {
    fio: "Королев Артемий Александрович",
    post: "Руководитель педагогического состава, преподаватель",
    disciplines: "Дополнительные общеобразовательные программы по Python",
    education: "Неоконченное профессиональное образование: Университет «Синергия», направление «Разработка программного обеспечения». Допущен к педагогической деятельности в соответствии с частью 4 статьи 46 Федерального закона № 273-ФЗ",
    qualification: "Проходит обучение; пройдены два профильных курса",
    training: "Повышение квалификации и профессиональная переподготовка: отсутствуют",
    experience: "Общий стаж — 3 года; стаж работы по специальности — 3 года",
  },
] as const;

function EmployeesSection() {
  return (
    <>
      <h3>Педагогические работники</h3>
      <div className={styles.tableScroll} tabIndex={0} role="region" aria-label="Сведения о педагогическом составе">
        <table className={styles.dataTable}>
          <thead><tr><th>ФИО и должность</th><th>Преподаваемые дисциплины</th><th>Образование и квалификация</th><th>Степень и звание</th><th>Повышение квалификации</th><th>Стаж</th></tr></thead>
          <tbody itemProp="teachingStaff">
            {EMPLOYEES.map((employee) => <tr key={employee.fio}>
              <td><strong itemProp="fio">{employee.fio}</strong><br /><span itemProp="post">{employee.post}</span></td>
              <td itemProp="teachingDisciplin">{employee.disciplines}</td>
              <td><span itemProp="teachingLevel">{employee.education}</span><br /><span itemProp="employeeQualific">{employee.qualification}</span></td>
              <td><span itemProp="degree">Учёная степень отсутствует</span>; <span itemProp="academStat">учёное звание отсутствует</span></td>
              <td itemProp="profDevelopment">{employee.training}</td>
              <td><span itemProp="genExperience">{employee.experience}</span></td>
            </tr>)}
          </tbody>
        </table>
      </div>
      <DocumentList documents={getSectionDocuments("employees")} />
    </>
  );
}

function ObjectsSection() {
  return (
    <>
      <h3>Электронная информационно-образовательная среда</h3>
      <DetailsTable label="Материально-техническое обеспечение" rows={[
        ["Способ реализации", "Обучение проводится дистанционно с применением электронного обучения и дистанционных образовательных технологий"],
        ["Собственная электронная образовательная среда", <a href="https://app.innoprog.ru" itemProp="eoisOwn" rel="noopener noreferrer" target="_blank">app.innoprog.ru</a>],
        ["Состав платформы", <Value itemProp="purposeEios">17 модулей, 151 тема, 436 видеоматериалов, 393 урока с дополнительными материалами и 2008 заданий</Value>],
        ["Учебные кабинеты", <Value itemProp="purposeCab">Собственные оборудованные учебные кабинеты отсутствуют; занятия проходят дистанционно</Value>],
        ["Библиотека", <Value itemProp="purposeLibr">Отдельная библиотека отсутствует; электронные материалы предоставляются в образовательной среде</Value>],
        ["Объекты спорта", <Value itemProp="purposeSport">Отсутствуют</Value>],
        ["Средства обучения и воспитания", <Value itemProp="purposeFacil">Электронные учебные материалы, видеолекции, практические задания, средства обратной связи и сопровождения наставником</Value>],
        ["Доступ к информационным системам", <Value itemProp="comNet">Круглосуточный доступ через сеть Интернет по индивидуальной учётной записи</Value>],
        ["Специальные технические средства для инвалидов и лиц с ОВЗ", <Value itemProp="techOvz">Специальные технические средства отсутствуют; возможность обучения определяется индивидуально с учётом потребностей обучающегося</Value>],
      ]} />
      <h3>Общежитие и интернат</h3>
      <p itemProp="hostelInfo">Общежитие отсутствует. Количество жилых помещений, в том числе приспособленных для инвалидов и лиц с ОВЗ, — 0.</p>
      <p itemProp="interInfo">Интернат отсутствует. Количество жилых помещений, в том числе приспособленных для инвалидов и лиц с ОВЗ, — 0.</p>
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
          <tr itemProp="paidSt"><td>Базовый</td><td>4</td><td>7 990 руб.</td></tr>
          <tr itemProp="paidSt"><td>Расширенный</td><td>8</td><td>14 390 руб.</td></tr>
          <tr itemProp="paidSt"><td>Персональный</td><td>12</td><td>18 890 руб.</td></tr>
        </tbody></table>
      </div>
      <p itemProp="paidParent">Плата за присмотр и уход за детьми не взимается, поскольку соответствующие услуги не оказываются.</p>
      <DocumentList documents={getSectionDocuments("paid_edu")} />
    </>
  );
}

function BudgetSection() {
  return (
    <>
      <h3>Финансовые показатели за 2025 год</h3>
      <DetailsTable label="Финансово-хозяйственная деятельность за 2025 год" rows={[
        ["Федеральный бюджет", <Value itemProp="finBFVolume">0 руб.</Value>],
        ["Бюджет субъекта Российской Федерации", <Value itemProp="finBRVolume">0 руб.</Value>],
        ["Местный бюджет", <Value itemProp="finBMVolume">0 руб.</Value>],
        ["Платные образовательные услуги", <Value itemProp="finPVolume">5 845 258,03 руб.</Value>],
        ["Общий объём поступлений", <Value itemProp="finPost">6 542 116,03 руб.</Value>],
        ["Общий объём расходов", <Value itemProp="finRas">6 386 301,75 руб.</Value>],
        ["Финансовый год", <Value itemProp="finYear">2025</Value>],
        ["Материальная помощь обучающимся", "Не предоставлялась"],
      ]} />
      <p itemProp="finPlanDocLink">План финансово-хозяйственной деятельности не формируется: ООО «ИННОПРОГ» является коммерческой организацией.</p>
      <DocumentList documents={getSectionDocuments("budget")} />
    </>
  );
}

function VacantSection() {
  return (
    <>
      <h3>Количество вакантных мест на 01.08.2026</h3>
      <div className={styles.tableScroll} tabIndex={0} role="region" aria-label="Вакантные места по образовательным программам">
        <table className={styles.dataTable}><thead><tr><th>Код</th><th>Направление</th><th>Уровень</th><th>Программа</th><th>Курс</th><th>Форма</th><th>Федеральный бюджет</th><th>Региональный бюджет</th><th>Местный бюджет</th><th>По договорам об образовании</th></tr></thead>
          <tbody>{VACANT_PROGRAMS.map((program) => <tr itemProp="vacant" key={`${program.kind}-${program.name}`}>
            <td itemProp="eduCode">Не применяется</td><td itemProp="eduName">Дополнительное образование</td><td itemProp="eduLevel">{program.kind}</td><td itemProp="eduProf">{program.name}</td><td itemProp="eduCourse">Не применяется</td><td itemProp="eduForm">{program.form}</td><td itemProp="numberBFVacant">{program.federal}</td><td itemProp="numberBRVacant">{program.regional}</td><td itemProp="numberBMVacant">{program.municipal}</td><td itemProp="numberPVacant">{program.paid}</td>
          </tr>)}</tbody>
        </table>
      </div>
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
        ["Общежитие", <Value itemProp="hostelInfo">Отсутствует; жилых помещений — 0, в том числе приспособленных для инвалидов и лиц с ОВЗ — 0</Value>],
        ["Интернат", <Value itemProp="interInfo">Отсутствует; жилых помещений — 0, в том числе приспособленных для инвалидов и лиц с ОВЗ — 0</Value>],
        ["Плата за проживание", "Не установлена и не взимается"],
        ["Трудоустройство выпускников", "Обязательное распределение отсутствует"],
      ]} />
      <DocumentList documents={getSectionDocuments("grants")} />
    </>
  );
}

function InternationalSection() {
  return <><h3>Международные договоры</h3><p itemProp="internationalDog">Заключённые и планируемые к заключению договоры с иностранными и международными организациями по вопросам образования и науки отсутствуют.</p><p itemProp="stateName">Международная аккредитация образовательных программ отсутствует.</p><DocumentList documents={getSectionDocuments("inter")} /></>;
}

function CateringSection() {
  return (
    <>
      <h3>Условия питания и охраны здоровья</h3>
      <p itemProp="meals">Питание обучающихся не организуется в связи с реализацией образовательных программ исключительно с применением электронного обучения и дистанционных образовательных технологий.</p>
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
        <nav aria-label="Хлебные крошки" className={styles.breadcrumbs}><a href="/">Главная</a><span aria-hidden="true">/</span><a href="/sveden/common">Сведения об образовательной организации</a><span aria-hidden="true">/</span><span>{current.shortTitle}</span></nav>
        <header className={styles.hero}>
          <h1 title="Сведения об образовательной организации">Сведения об образовательной организации</h1>
          <p className={styles.updated}>Дата актуальности динамических сведений: <time dateTime="2026-08-01">{SVEDEN_UPDATED_AT}</time></p>
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
      <SiteLegalFooter />
    </div>
  );
}

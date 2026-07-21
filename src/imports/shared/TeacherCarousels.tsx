import sergeyPopkovich from "./teachers/sergey-popkovich.webp";
import danilaDrobyshev from "./teachers/danila-drobyshev.webp";
import grigoryChepel from "./teachers/grigory-chepel.webp";
import alanAguzarov from "./teachers/alan-aguzarov.webp";
import pavelMyagchilov from "./teachers/pavel-myagchilov.webp";
import dzhambulatTadzhidinov from "./teachers/dzhambulat-tadzhidinov.webp";
import polinaKaraeva from "./teachers/polina-karaeva.webp";
import levBykov from "./teachers/lev-bykov.webp";
import annaNadymova from "./teachers/anna-nadymova.webp";
import evgenyYurchenko from "./teachers/evgeny-yurchenko.webp";
import egorPopikov from "./teachers/egor-popikov.webp";

export type TeacherRole =
  | "Python-разработчик"
  | "C++ разработчик"
  | "Data Scientist"
  | "Unreal Engine разработчик"
  | "Java-разработчик"
  | "Data-аналитик"
  | "Frontend-разработчик";

type Teacher = {
  name: string;
  nameLines: [string, string];
  role: TeacherRole;
  image: string;
};

const teachers: Teacher[] = [
  {
    name: "Сергей Попкович",
    nameLines: ["Сергей", "Попкович"],
    role: "Python-разработчик",
    image: sergeyPopkovich,
  },
  {
    name: "Данила Дробышев",
    nameLines: ["Данила", "Дробышев"],
    role: "C++ разработчик",
    image: danilaDrobyshev,
  },
  {
    name: "Григорий Чепель",
    nameLines: ["Григорий", "Чепель"],
    role: "Python-разработчик",
    image: grigoryChepel,
  },
  {
    name: "Алан Агузаров",
    nameLines: ["Алан", "Агузаров"],
    role: "Data Scientist",
    image: alanAguzarov,
  },
  {
    name: "Павел Мягчилов",
    nameLines: ["Павел", "Мягчилов"],
    role: "Python-разработчик",
    image: pavelMyagchilov,
  },
  {
    name: "Джамбулат Таджидинов",
    nameLines: ["Джамбулат", "Таджидинов"],
    role: "Unreal Engine разработчик",
    image: dzhambulatTadzhidinov,
  },
  {
    name: "Полина Караева",
    nameLines: ["Полина", "Караева"],
    role: "Python-разработчик",
    image: polinaKaraeva,
  },
  {
    name: "Лев Быков",
    nameLines: ["Лев", "Быков"],
    role: "Java-разработчик",
    image: levBykov,
  },
  {
    name: "Анна Надымова",
    nameLines: ["Анна", "Надымова"],
    role: "Data-аналитик",
    image: annaNadymova,
  },
  {
    name: "Евгений Юрченко",
    nameLines: ["Евгений", "Юрченко"],
    role: "Python-разработчик",
    image: evgenyYurchenko,
  },
  {
    name: "Егор Попиков",
    nameLines: ["Егор", "Попиков"],
    role: "Frontend-разработчик",
    image: egorPopikov,
  },
];

function TeacherImage({ teacher }: { teacher: Teacher }) {
  return (
    <div className="absolute inset-0 overflow-hidden rounded-[32px]">
      <img
        alt={`Преподаватель ${teacher.name}`}
        title={`Преподаватель ${teacher.name}`}
        className="absolute inset-0 max-w-none object-cover object-bottom rounded-[32px] size-full"
        decoding="async"
        height={324}
        loading="lazy"
        src={teacher.image}
        width={302}
      />
    </div>
  );
}

function TeacherName({ teacher }: { teacher: Teacher }) {
  return (
    <>
      <span className="block">{teacher.nameLines[0]}</span>{" "}
      <span className="block">{teacher.nameLines[1]}</span>
    </>
  );
}

function DesktopTeacherCard({ teacher }: { teacher: Teacher }) {
  return (
    <article className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0 w-[302px]" data-name={teacher.name}>
      <div className="h-[324px] relative rounded-[32px] shrink-0 w-full">
        <TeacherImage teacher={teacher} />
      </div>
      <div className="content-stretch flex flex-col gap-[16px] items-start min-h-[116px] relative shrink-0 text-center text-white w-full">
        <h3 className="font-['Raleway:Bold',sans-serif] font-bold leading-[36px] relative shrink-0 text-[40px] uppercase w-full">
          <TeacherName teacher={teacher} />
        </h3>
        <p className="font-['Manrope:Regular',sans-serif] font-normal leading-[22px] relative shrink-0 text-[20px] w-full">
          {teacher.role}
        </p>
      </div>
    </article>
  );
}

export function DesktopTeacherCarousel({
  carouselId,
  course = false,
  preferredRole,
}: {
  carouselId: string;
  course?: boolean;
  preferredRole?: TeacherRole;
}) {
  const orderedTeachers = getOrderedTeachers(preferredRole);

  return (
    <div
      className={`content-stretch flex gap-[24px] items-center relative shrink-0 w-full site-carousel site-teachers-carousel${course ? " site-course-teachers-carousel" : ""}`}
      data-carousel={carouselId}
      data-carousel-loop="true"
      tabIndex={0}
    >
      {orderedTeachers.map((teacher) => <DesktopTeacherCard key={teacher.name} teacher={teacher} />)}
    </div>
  );
}

function MobileTeacherCard({ teacher }: { teacher: Teacher }) {
  return (
    <article className="content-stretch flex flex-col gap-[24px] items-center relative shrink-0 w-[167px]" data-name={teacher.name}>
      <div className="h-[179px] relative rounded-[32px] shrink-0 w-[167px]">
        <TeacherImage teacher={teacher} />
      </div>
      <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 text-center text-white w-full">
        <h3 className="font-['Manrope:Bold',sans-serif] font-bold leading-[18px] min-h-[36px] relative shrink-0 text-[20px] w-full">
          <TeacherName teacher={teacher} />
        </h3>
        <p className="font-['Manrope:Regular',sans-serif] font-normal leading-[18px] relative shrink-0 text-[16px] tracking-[0.48px] w-full">
          {teacher.role}
        </p>
      </div>
    </article>
  );
}

function getOrderedTeachers(preferredRole?: TeacherRole) {
  if (!preferredRole) {
    return teachers;
  }

  return [
    ...teachers.filter((teacher) => teacher.role === preferredRole),
    ...teachers.filter((teacher) => teacher.role !== preferredRole),
  ];
}

export function MobileTeacherCarousel({ preferredRole }: { preferredRole?: TeacherRole }) {
  const orderedTeachers = [...getOrderedTeachers(preferredRole)];
  const egorIndex = orderedTeachers.findIndex((teacher) => teacher.name === "Егор Попиков");

  if (egorIndex >= 5) {
    const [egor] = orderedTeachers.splice(egorIndex, 1);
    orderedTeachers.splice(4, 0, egor);
  }

  const rows = [orderedTeachers.slice(0, 5), orderedTeachers.slice(5)];

  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-[350px] site-carousel site-mobile-teachers-carousel" data-carousel="mobile-teachers" data-carousel-loop="true">
      {rows.map((row, index) => (
        <div className="content-stretch flex gap-[16px] items-start relative shrink-0 w-full" key={index}>
          {row.map((teacher) => <MobileTeacherCard key={teacher.name} teacher={teacher} />)}
        </div>
      ))}
    </div>
  );
}

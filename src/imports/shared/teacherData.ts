import sergeyPopkovich from "./teachers/sergey-popkovich.webp";
import danilaDrobyshev from "./teachers/danila-drobyshev.webp";
import grigoryChepel from "./teachers/grigory-chepel.webp";
import artemEzenok from "./teachers/artem-ezenok.webp";
import alanAguzarov from "./teachers/alan-aguzarov.webp";
import pavelMyagchilov from "./teachers/pavel-myagchilov.webp";
import dzhambulatTadzhidinov from "./teachers/dzhambulat-tadzhidinov.webp";
import polinaKaraeva from "./teachers/polina-karaeva.webp";
import levBykov from "./teachers/lev-bykov.webp";
import annaNadymova from "./teachers/anna-nadymova.webp";
import pavelKrotov from "./teachers/pavel-krotov.png";
import ilyaKochenkov from "./teachers/ilya-kochenkov.png";
import artemyKorolev from "./teachers/artemy-korolev.webp";
import ivanMurzin from "./teachers/ivan-murzin.png";
import danilAfonchikov from "./teachers/danil-afonchikov.png";

export type TeacherRole =
  | "Python-разработчик"
  | "C++ разработчик"
  | "Data Scientist"
  | "Unreal Engine разработчик"
  | "Java-разработчик"
  | "Data-аналитик"
  | "Frontend-разработчик"
  | "Английский для IT";

export type Teacher = {
  name: string;
  nameLines: [string, string];
  role: TeacherRole;
  experienceYears: number;
  experienceField?: "преподавания";
  image: string;
};

export const teachers: Teacher[] = [
  {
    name: "Сергей Попкович",
    nameLines: ["Сергей", "Попкович"],
    role: "Python-разработчик",
    experienceYears: 6,
    image: sergeyPopkovich,
  },
  {
    name: "Данила Дробышев",
    nameLines: ["Данила", "Дробышев"],
    role: "C++ разработчик",
    experienceYears: 5,
    image: danilaDrobyshev,
  },
  {
    name: "Данил Афончиков",
    nameLines: ["Данил", "Афончиков"],
    role: "Data Scientist",
    experienceYears: 5,
    image: danilAfonchikov,
  },
  {
    name: "Артём Езенок",
    nameLines: ["Артём", "Езенок"],
    role: "Английский для IT",
    experienceYears: 10,
    experienceField: "преподавания",
    image: artemEzenok,
  },
  {
    name: "Алан Агузаров",
    nameLines: ["Алан", "Агузаров"],
    role: "Data Scientist",
    experienceYears: 5,
    image: alanAguzarov,
  },
  {
    name: "Павел Мягчилов",
    nameLines: ["Павел", "Мягчилов"],
    role: "Python-разработчик",
    experienceYears: 4,
    image: pavelMyagchilov,
  },
  {
    name: "Джамбулат Таджидинов",
    nameLines: ["Джамбулат", "Таджидинов"],
    role: "Unreal Engine разработчик",
    experienceYears: 5,
    image: dzhambulatTadzhidinov,
  },
  {
    name: "Полина Караева",
    nameLines: ["Полина", "Караева"],
    role: "Python-разработчик",
    experienceYears: 3,
    image: polinaKaraeva,
  },
  {
    name: "Лев Быков",
    nameLines: ["Лев", "Быков"],
    role: "Java-разработчик",
    experienceYears: 4,
    image: levBykov,
  },
  {
    name: "Анна Надымова",
    nameLines: ["Анна", "Надымова"],
    role: "Data-аналитик",
    experienceYears: 3,
    image: annaNadymova,
  },
  {
    name: "Павел Кротов",
    nameLines: ["Павел", "Кротов"],
    role: "Python-разработчик",
    experienceYears: 4,
    image: pavelKrotov,
  },
  {
    name: "Илья Коченков",
    nameLines: ["Илья", "Коченков"],
    role: "Data Scientist",
    experienceYears: 5,
    image: ilyaKochenkov,
  },
  {
    name: "Артемий Королев",
    nameLines: ["Артемий", "Королев"],
    role: "Python-разработчик",
    experienceYears: 4,
    image: artemyKorolev,
  },
  {
    name: "Иван Мурзин",
    nameLines: ["Иван", "Мурзин"],
    role: "Frontend-разработчик",
    experienceYears: 4,
    image: ivanMurzin,
  },
  {
    name: "Григорий Чепель",
    nameLines: ["Григорий", "Чепель"],
    role: "Python-разработчик",
    experienceYears: 5,
    image: grigoryChepel,
  },
];


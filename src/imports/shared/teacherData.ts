import sergeyPopkovich from "./teachers/sergey-popkovich.webp";
import danilaDrobyshev from "./teachers/danila-drobyshev.webp";
import grigoryChepel from "./teachers/grigory-chepel.webp";
import alanAguzarov from "./teachers/alan-aguzarov.webp";
import pavelMyagchilov from "./teachers/pavel-myagchilov.webp";
import dzhambulatTadzhidinov from "./teachers/dzhambulat-tadzhidinov.webp";
import polinaKaraeva from "./teachers/polina-karaeva.webp";
import levBykov from "./teachers/lev-bykov.webp";
import annaNadymova from "./teachers/anna-nadymova.webp";
import pavelKrotov from "./teachers/pavel-krotov.png";
import ilyaKochenkov from "./teachers/ilya-kochenkov.png";
import artemyKorolev from "./teachers/artemy-korolev.webp";

export type TeacherRole =
  | "Python-разработчик"
  | "C++ разработчик"
  | "Data Scientist"
  | "Unreal Engine разработчик"
  | "Java-разработчик"
  | "Data-аналитик"
  | "Frontend-разработчик";

export type Teacher = {
  name: string;
  nameLines: [string, string];
  role: TeacherRole;
  image: string;
};

export const teachers: Teacher[] = [
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
    name: "Павел Кротов",
    nameLines: ["Павел", "Кротов"],
    role: "Python-разработчик",
    image: pavelKrotov,
  },
  {
    name: "Илья Коченков",
    nameLines: ["Илья", "Коченков"],
    role: "Data Scientist",
    image: ilyaKochenkov,
  },
  {
    name: "Артемий Королев",
    nameLines: ["Артемий", "Королев"],
    role: "Python-разработчик",
    image: artemyKorolev,
  },
];


"use client";

import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import MainScreen, {
  MainScreenDesktopFooter,
  MainScreenDesktopHeader,
} from "../imports/MainScreenDesktop/MainScreenDesktop";
import heroBackgroundUrl from "../imports/MainScreenDesktop/home-background.opt.webp";
import heroPersonUrl from "../imports/MainScreenDesktop/hero-person-desktop.webp";
import MainScreenMobile, {
  MainScreenMobileFooter,
  MainScreenMobileHeader,
} from "../imports/MainScreenMobile/MainScreenMobile";
import platformLaptopUrl from "../imports/MainScreenDesktop/platform-laptop-desktop.webp";
import platformScreenUrl from "../imports/MainScreenDesktop/platform-screen-desktop.webp";
import platformPhoneScreenUrl from "../imports/MainScreenDesktop/platform-phone-screen-desktop.webp";
import platformPhoneFrameUrl from "../imports/MainScreenDesktop/platform-phone-frame-desktop.webp";
import reviewKirillUrl from "../imports/MainScreenDesktop/review-kirill.png";
import reviewAnastasiaUrl from "../imports/MainScreenDesktop/review-anastasia-high.webp";
import reviewMikhailUrl from "../imports/MainScreenDesktop/review-mikhail-high.webp";
import reviewStoryKirillHeroUrl from "../imports/MainScreenDesktop/review-story-kirill-hero.webp";
import reviewStoryCollaborationUrl from "../imports/MainScreenDesktop/review-story-collaboration.webp";
import reviewStoryMailUrl from "../imports/MainScreenDesktop/review-story-mail.svg";
import reviewStoryPhoneUrl from "../imports/MainScreenDesktop/review-story-phone.svg";
import reviewStoryWhatsappUrl from "../imports/MainScreenDesktop/review-story-whatsapp.svg";
import reviewStoryTelegramUrl from "../imports/MainScreenDesktop/review-story-telegram.svg";
import aboutHeroUrl from "../imports/MainScreenDesktop/about-hero.opt.webp";
import aboutSwirlUrl from "../imports/MainScreenDesktop/about-swirl.opt.webp";
import aboutInnopolisUrl from "../imports/MainScreenDesktop/about-innopolis.opt.webp";
import heroMobileUrl from "../imports/MainScreenMobile/hero-mobile-640.webp";
import {
  ALL_REVIEWS_DIRECTION_KEY,
  REVIEWS_DIRECTIONS,
  STUDENT_REVIEWS,
  findStudentReviewById,
  findStudentReviewByRouteSlug,
  getReviewCoursePath,
  getReviewsDirectionPath,
  getStudentReviewPath,
  normalizeReviewsDirectionKey,
  type ReviewsDirectionKey,
  type StudentReview,
} from "./studentReviewsData";
import {
  MOBILE_DESIGN_HEIGHT,
  MOBILE_DESIGN_WIDTH,
  MOBILE_SCROLL_TARGETS,
} from "./mobileLayout";
import { ADULT_COURSE_LINKS, CHILD_COURSE_LINKS } from "./courseNavigation";
import { useEffect, useLayoutEffect, useRef, useState, useSyncExternalStore } from "react";
import type { CSSProperties, FormEvent, KeyboardEvent, MouseEvent } from "react";

const PythonCourseDesktop = dynamic(() => import("../imports/PythonCourseDesktop/PythonCourseDesktop"));
const PythonCourseMobile = dynamic(() => import("../imports/PythonCourseMobile/PythonCourseMobile"));
const DataScienceCourseDesktop = dynamic(() => import("../imports/DataScienceCourseDesktop/DataScienceCourseDesktop"));
const DataScienceCourseMobile = dynamic(() => import("../imports/DataScienceCourseMobile/DataScienceCourseMobile"));
const FrontendCourseDesktop = dynamic(() => import("../imports/FrontendCourseDesktop/FrontendCourseDesktop"));
const FrontendCourseMobile = dynamic(() => import("../imports/FrontendCourseMobile/FrontendCourseMobile"));
const DataAnalystCourseDesktop = dynamic(() => import("../imports/DataAnalystCourseDesktop/DataAnalystCourseDesktop"));
const DataAnalystCourseMobile = dynamic(() => import("../imports/DataAnalystCourseMobile/DataAnalystCourseMobile"));
const CppCourseDesktop = dynamic(() => import("../imports/CppCourseDesktop/CppCourseDesktop"));
const CppCourseMobile = dynamic(() => import("../imports/CppCourseMobile/CppCourseMobile"));
const MobileDeveloperCourseDesktop = dynamic(
  () => import("../imports/MobileDeveloperCourseDesktop/MobileDeveloperCourseDesktop"),
);
const MobileDeveloperCourseMobile = dynamic(
  () => import("../imports/MobileDeveloperCourseMobile/MobileDeveloperCourseMobile"),
);
const UnrealEngineCourseDesktop = dynamic(
  () => import("../imports/UnrealEngineCourseDesktop/UnrealEngineCourseDesktop"),
);
const UnrealEngineCourseMobile = dynamic(
  () => import("../imports/UnrealEngineCourseMobile/UnrealEngineCourseMobile"),
);
const JavaCourseDesktop = dynamic(() => import("../imports/JavaCourseDesktop/JavaCourseDesktop"));
const JavaCourseMobile = dynamic(() => import("../imports/JavaCourseMobile/JavaCourseMobile"));
const MlEngineerCourseDesktop = dynamic(() => import("../imports/MlEngineerCourseDesktop/MlEngineerCourseDesktop"));
const MlEngineerCourseMobile = dynamic(() => import("../imports/MlEngineerCourseMobile/MlEngineerCourseMobile"));

const DESKTOP_DESIGN = {
  width: 1440,
  height: 14457,
};

const ABOUT_DESIGN_WIDTH = DESKTOP_DESIGN.width;

const MOBILE_DESIGN = {
  width: MOBILE_DESIGN_WIDTH,
  height: MOBILE_DESIGN_HEIGHT,
};

const MOBILE_BREAKPOINT = 768;

type CourseReviewsDirection = Exclude<ReviewsDirectionKey, typeof ALL_REVIEWS_DIRECTION_KEY>;

function getCourseReviewHref(review: StudentReview) {
  return getStudentReviewPath(review);
}

function setCourseReviewCard(card: HTMLAnchorElement, review: StudentReview) {
  const courseReviewKey = review.courseReviewKey as CourseReviewKey | undefined;

  card.classList.add("site-course-review-card--dynamic");
  card.href = getCourseReviewHref(review);
  card.draggable = false;
  card.hidden = false;
  card.removeAttribute("aria-hidden");
  card.removeAttribute("tabindex");

  if (courseReviewKey && courseReviewKey in COURSE_REVIEW_ROUTES) {
    card.dataset.courseReview = courseReviewKey;
    delete card.dataset.studentReview;
  } else {
    card.dataset.studentReview = review.id;
    delete card.dataset.courseReview;
  }

  if (card.dataset.dynamicStudentReview === review.id) {
    return;
  }

  card.querySelector(":scope > .site-course-direction-review-card")?.remove();
  card.dataset.dynamicStudentReview = review.id;

  const initial = review.name.trim().charAt(0).toUpperCase() || "И";
  const content = document.createElement("span");
  content.className = "site-course-direction-review-card";

  const head = document.createElement("span");
  head.className = "site-course-direction-review-card__head";

  const avatar = document.createElement("span");
  avatar.className = "site-course-direction-review-card__avatar";
  avatar.textContent = initial;

  const person = document.createElement("span");
  person.className = "site-course-direction-review-card__person";

  const name = document.createElement("strong");
  name.textContent = review.name;

  const meta = document.createElement("span");
  meta.textContent = review.age;

  person.append(name, meta);

  const rating = document.createElement("span");
  rating.className = "site-course-direction-review-card__rating";
  rating.textContent = `${review.rating} ★`;

  head.append(avatar, person, rating);

  const course = document.createElement("span");
  course.className = "site-course-direction-review-card__course";
  course.textContent = `Курс: ${review.course}`;

  const title = document.createElement("span");
  title.className = "site-course-direction-review-card__title";
  title.textContent = review.title;

  const body = document.createElement("span");
  body.className = "site-course-direction-review-card__body";
  body.textContent = review.body;

  const readMore = document.createElement("span");
  readMore.className = "site-course-direction-review-card__read-more";
  readMore.textContent = "читать полностью";

  content.append(head, course, title, body, readMore);
  card.append(content);
}

function restoreCourseReviewDirection(canvas: HTMLElement) {
  canvas
    .querySelectorAll<HTMLAnchorElement>("a.site-course-review-card--dynamic")
    .forEach((card) => {
      card.querySelector(":scope > .site-course-direction-review-card")?.remove();
      card.classList.remove("site-course-review-card--dynamic");
      delete card.dataset.dynamicStudentReview;
      card.hidden = false;
      card.removeAttribute("aria-hidden");
      card.removeAttribute("tabindex");
    });
}

function applyCourseReviewDirection(canvas: HTMLElement, direction: CourseReviewsDirection) {
  const reviews = STUDENT_REVIEWS
    .filter((review) => review.direction === direction)
    .slice(0, 4);

  canvas.querySelectorAll<HTMLElement>(".site-course-reviews-carousel").forEach((carousel) => {
    const cards = Array.from(
      carousel.querySelectorAll<HTMLAnchorElement>("a[data-course-review], a[data-student-review]"),
    );

    cards.forEach((card, index) => {
      const review = reviews[index];

      if (!review) {
        card.hidden = true;
        card.setAttribute("aria-hidden", "true");
        card.tabIndex = -1;
        return;
      }

      setCourseReviewCard(card, review);
    });
  });
}

function useCourseReviewDirection(
  courseCanvasRef: { current: HTMLDivElement | null },
  direction: CourseReviewsDirection,
) {
  useLayoutEffect(() => {
    const canvas = courseCanvasRef.current;

    if (!canvas) {
      return;
    }

    applyCourseReviewDirection(canvas, direction);

    const refreshIds = [
      window.setTimeout(() => applyCourseReviewDirection(canvas, direction), 100),
      window.setTimeout(() => applyCourseReviewDirection(canvas, direction), 500),
    ];

    return () => {
      refreshIds.forEach((refreshId) => window.clearTimeout(refreshId));
      restoreCourseReviewDirection(canvas);
    };
  }, [courseCanvasRef, direction]);
}

const desktopScrollTargets = {
  adults: 3436,
  children: 3436,
  directions: 3436,
  mentor: 5476,
  teachers: 7166,
  support: 8020,
  reviews: 10300,
  about: 11980,
  form: 13167,
};

const mobileScrollTargets = MOBILE_SCROLL_TARGETS;

const LOADER_MIN_MS = 300;
const LOADER_MAX_MS = 2600;
const LOADED_STORAGE_KEY = "innoprog-site-loaded";
const COOKIE_CONSENT_STORAGE_KEY = "innoprog-cookie-consent";
const RETURN_SCROLL_STORAGE_KEY = "innoprog-return-scroll";
const LOADER_EXIT_MS = 400;
const APPLICATION_REQUEST_URL = "/application/request";

type LeadPayload = {
  name: string;
  phone: string;
  email?: string;
  question?: string;
};

type LeadDraft = Partial<LeadPayload>;

export type AppInitialRoute =
  | { page: "home" }
  | { page: "about" }
  | { page: "pythonCourse" }
  | { page: "dataScienceCourse" }
  | { page: "frontendCourse" }
  | { page: "dataAnalystCourse" }
  | { page: "cppCourse" }
  | { page: "mobileDeveloperCourse" }
  | { page: "unrealEngineCourse" }
  | { page: "javaCourse" }
  | { page: "mlEngineerCourse" }
  | { page: "reviews"; direction?: string | null }
  | { page: "courseReview"; review: CourseReviewKey }
  | { page: "studentReview"; review: string }
  | { page: "tariffs" }
  | { page: "review"; story: ReviewStoryKey };

function normalizePhone(rawPhone: string) {
  const digits = rawPhone.replace(/\D/g, "");

  if (!digits) {
    return "";
  }

  if (digits.length === 11 && digits.startsWith("8")) {
    return `+7${digits.slice(1)}`;
  }

  if (digits.length === 10) {
    return `+7${digits}`;
  }

  if (digits.startsWith("7")) {
    return `+${digits}`;
  }

  if (rawPhone.trim().startsWith("+")) {
    return `+${digits}`;
  }

  return digits;
}

function findLeadFieldValue(scope: ParentNode, names: string[]) {
  for (const name of names) {
    const field = scope.querySelector<HTMLInputElement | HTMLTextAreaElement>(
      `input[name="${name}"], textarea[name="${name}"]`,
    );
    const value = field?.value.trim();

    if (value) {
      return value;
    }
  }

  return "";
}

function getLeadPayload(scope?: ParentNode | null): LeadPayload {
  const root = scope || document;
  const name = findLeadFieldValue(root, ["name", "modal-name"]);
  const phone = normalizePhone(findLeadFieldValue(root, ["phone", "modal-phone"]));
  const email = findLeadFieldValue(root, ["email", "modal-email"]);
  const question = findLeadFieldValue(root, ["question", "modal-question"]);

  return { name, phone, email, question };
}

function isLeadPayloadValid(payload: LeadPayload) {
  const isEmailValid = !payload.email || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email);

  return payload.name.length >= 2 && payload.phone.replace(/\D/g, "").length >= 10 && isEmailValid;
}

async function sendLeadApplication(
  payload: LeadPayload,
  successToken?: string,
  captchaAttempt = 0,
): Promise<void> {
  const response = await fetch(APPLICATION_REQUEST_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ...payload, success_token: successToken || "" }),
  });

  const result = await response.json().catch(() => ({ error: null }));

  if (response.ok && result.ok) {
    return;
  }

  const { checkCaptchaError, CheckCaptchaType } = await import("@vkid/captcha");
  const { captchaType, captchaWidget } = checkCaptchaError({
    responseHeaders: response.headers,
    url: response.url,
    responseError: result.error,
    withWidget: true,
  });

  if (
    captchaAttempt === 0 &&
    captchaType &&
    captchaType !== CheckCaptchaType.UNKNOWN &&
    captchaWidget
  ) {
    let captchaToken: string;

    try {
      captchaToken = await captchaWidget.show({
        container: document.body,
        view: "popup",
        scheme: "light",
        lang: "ru",
      });
    } catch (error) {
      throw new Error(error === "close" ? "captcha-closed" : "captcha-failed");
    }

    return sendLeadApplication(payload, captchaToken, captchaAttempt + 1);
  }

  throw new Error(
    captchaType === CheckCaptchaType.UNKNOWN
      ? "captcha-unsupported"
      : `lead-request-failed:${response.status}`,
  );
}

const REVIEW_STORIES = {
  кирилл: {
    avatar: reviewKirillUrl,
    hero: reviewStoryKirillHeroUrl,
    name: "Кирилл",
    storyTitleName: "Кирилла",
    course: "Python-разработчик",
    transition: "Из HR → в ИТ",
    city: "Москва",
    format: "Онлайн + разборы 1:1",
    period: "10 месяцев",
    result: "Новая работа / по специальности",
    pageTitle: "как я перешёл из HR в ИТ",
    heroQuote: "“Если встретить правильного преподавателя и пройти по протоптанной дорожке — и работа найдётся, и с отчётами всё сложится”",
    sections: [
      {
        title: "Как начался переход",
        body: [
          "Меня зовут Кирилл. До перехода в ИT я работал HR-менеджером. Со временем я понял, что прежняя профессия перестала быть для меня интересной. Хотелось развиваться в новом направлении, где больше практических задач, больше возможностей для роста и где я действительно буду чувствовать интерес к тому, чем занимаюсь",
          "До начала обучения я был в программировании практически нулем. У меня не было опыта, поэтому сначала многое казалось новым и непривычным. Но желание разобраться и перейти в новую сферу было сильнее страха перед сложностью",
          "Об ИННОПРОГ я узнал лично от своего друга, который ранее там уже обучался. Мне понравилось, что обучение было построено удобно и понятно, через платформу, с большим количеством практических заданий и понятной структурой. Было видно, что обучение не строится только на теории, а сразу направлено на практику",
        ],
      },
      {
        title: "Как проходило обучение",
        body: [
          "Обучение проходило постепенно, от базовых тем к более сложным задачам. Больше всего мне запомнились именно сложные задания, потому что через них лучше всего начинаешь понимать программирование",
          "Самые большие сложности у меня начались на темах ООП, алгоритмов и структур данных. Это был непростой этап, но именно он помог мне глубже разобраться в логике программирования и начать понимать, как разные темы связаны между собой",
          "Занятия с наставником проходили прекрасно. Материал объяснялся доходчиво, а обратная связь действительно помогала двигаться дальше. Особенно полезными были разборы задач, потому что они помогали не просто увидеть правильное решение, а понять саму логику и ход рассуждений",
          "Я старался использовать все занятия, которые входили в тариф. Примерно через четыре месяца обучения я почувствовал, что в голове начали складываться пазлы. При этом надежда, что я не зря учусь, была у меня с первого дня",
        ],
      },
      {
        title: "Какой результат получился",
        body: [
          "Главный результат для меня: я поменял профессию на ту, которая мне нравится",
          "Путь к трудоустройству получился достаточно быстрым. Примерно за один месяц. Возможно, в чём-то мне повезло, но я прошёл отбор и собеседование",
          "Сейчас я работаю программистом в компании Tages как внешний сотрудник Lemana PRO. Моя должность инженер технической поддержки. Задачи во многом похожи на DevOps",
          "Я занимаюсь инфраструктурной поддержкой low-code разработки, анализирую инциденты, смотрю логи, вношу изменения в конфигурации инфраструктуры под потребности пользователей. В работе использую Kubernetes, Helm, Argo CD, Tekton и другие инструменты",
          "Обучение в ИННОПРОГ помогло мне на старте, потому что в работе часто возникают вопросы с разработкой. Навыки программирования и понимание базы очень пригодились. Особенно в начале помогло понимание API-разработки, потому что пользователи как раз с этим и работают",
        ],
      },
      {
        title: "Мой отзыв об ИННОПРОГ",
        body: [
          "Понравился хорошо структурированный план обучения. Понятно, что именно нужно знать на каждом этапе и куда двигаться дальше. Еженедельные занятия с наставником подталкивали двигаться дальше, позволяя экономить большую кучу времени и нервов",
          "Тем, кто сейчас думает перейти в ИТ, но сомневается, я бы сказал: если хочется, то обязательно нужно пробовать. Даже если на старте кажется, что ничего не понятно, со временем знания начинают складываться в систему",
          "Главное не забрасывать и не ждать быстрых результатов",
        ],
      },
    ],
    text: "Обучение проходило постепенно, от базовых тем к более сложным задачам. Больше всего мне запомнились именно сложные задания, потому что через них лучше всего начинаешь понимать программирование. На занятиях мы не просто повторяли теорию, а разбирали, почему решение работает именно так, где могут быть ошибки и как писать код увереннее. Постепенно я начал видеть логику в задачах, перестал бояться больших тем и понял, как двигаться дальше в IT",
  },
  анастасия: {
    avatar: reviewAnastasiaUrl,
    hero: reviewAnastasiaUrl,
    name: "Анастасия",
    storyTitleName: "Анастасии",
    course: "Data Science",
    transition: "Из 1С → в Product",
    city: "Казань",
    format: "Онлайн + практика",
    period: "8 месяцев",
    result: "Новая роль в аналитике",
    pageTitle: "как я перешла из 1С в продукт",
    heroQuote: "“Если вам правда интересно копаться в данных, понимать, как всё устроено, искать ошибки, улучшать процессы и делать что-то полезное для людей или бизнеса, тогда стоит попробовать”",
    sections: [
      {
        title: "Как начался переход",
        body: [
          "Меня зовут Анастасия, мне 31 год. До обучения в ИННОПРОГ я работала старшим оператором 1С. С одной стороны, у меня уже был опыт работы с ИТ-системами и понимание, как устроены процессы внутри бизнеса. С другой стороны, я всё чаще понимала, что хочу развиваться не только в сторону поддержки и настройки, а намного глубже разбираться в данных, продуктовых решениях и аналитике",
          "Переломный момент произошёл, когда мне предложили перейти в продуктовую команду. Это была хорошая возможность для роста, но вместе с ней появилось понимание, что мне не хватает знаний по Data Science, машинному обучению и работе с данными",
          "До этого у меня не было полноценного опыта в Data Science и ML. Я понимала какие-то базовые вещи и немного работала с данными в рамках 1С, но машинное обучение, Python, модели, библиотеки и аналитический подход были для меня новой областью. Поэтому сначала всё казалось довольно сложным и даже немного пугающим",
          "Об ИННОПРОГ я узнала случайно, через знакомых и решила попробовать, подкупил формат индивидуального обучения. Для меня было важно, чтобы программу давали не по шаблону, а именно помогали разобраться с теми темами, которые нужны для моего перехода в продуктовую роль",
        ],
      },
      {
        title: "Как проходило обучение",
        body: [
          "Обучение началось с базы. Сначала мы разбирали Python, работу с данными, логику написания кода и основные инструменты, которые используются в аналитике и Data Science. Постепенно программа становилась сложнее, появлялись библиотеки для анализа данных, визуализация, основы статистики, метрики, а потом уже темы, связанные с машинным обучением",
          "Больше всего мне запомнилось, что обучение было сбалансированным. Почти каждую тему мы старались привязать к реальным задачам, по типу как анализировать данные, как искать зависимости, как оценивать результат, как не тупо построить модель, а понять, зачем она нужна и какую пользу может дать продукту",
          "Самыми сложными для меня были темы, связанные с математикой, статистикой и логикой ML-моделей. В начале было непросто понять, чем отличаются разные подходы, почему модель может ошибаться, как оценивать качество и всё в таком роде. Очень помогали занятия с наставником, в какой-то момент всё постепенно начало складываться в систему",
          "Занятия проходили спокойно и понятно. Мне нравилось, что можно было задавать любые вопросы, даже если они казались не всегда по учебной части. Особенно полезными были разборы практических заданий, потому что именно на них становилось понятно, где я действительно поняла тему, а где просто повторила пример",
          "Домашние задания тоже были очень полезными, так как были адекватными и постепенно погружали меня в контекст изучаемого. Со временем появился навык не бояться новых данных и не теряться, когда задача выглядит неопределённой, а это очень частое явление в продукте, задачи без готового ТЗ",
          "В какой-то момент я заметила, что начала по-другому смотреть на рабочие задачи. Если раньше я воспринимала данные как набор цифр и отчётов, то теперь стала задавать больше правильных вопросов: какие метрики важны, что мы хотим проверить, какие гипотезы можно построить, какие данные нужны для решения",
        ],
      },
      {
        title: "Какой результат получился",
        body: [
          "Главный результат для меня: я стала увереннее чувствовать себя в продуктовой роли и начала понимать, как данные могут помогать в развитии продукта",
          "После обучения мне стало проще общаться с аналитиками и разработчиками, понимать, о чём они говорят, задавать более точные вопросы и участвовать в обсуждении продуктовых решений",
          "Сейчас я работаю в команде фин. отдела в одном желтом банке и занимаюсь задачами, связанными с развитием внутренних цифровых решений. В работе мне важно понимать пользователей, бизнес-процессы, метрики продукта и то, как на основе данных можно принимать более точные решения",
          "Особенно пригодились навыки работы с Python, Jupyter Notebook, Power BI и Tableau, базовое понимание Scikit-learn, анализ данных, знание основных моделей машинного обучения и умение оценивать полученные результаты",
        ],
      },
      {
        title: "Мой отзыв об ИННОПРОГ",
        body: [
          "В ИННОПРОГ мне понравилось, что обучение было структурированным и при этом гибким. Программа помогала двигаться постепенно, не было резких скачков от понятного до супер непонятного. Для меня было особенно важно, что наставник объяснял материал простым языком и помогал связывать технические темы с реальными рабочими задачами. Благодаря этому обучение не ощущалось оторванным от жизни",
          "Тем, кто думает идти в ИТ, Data Science или продуктовую аналитику, но сомневается, я бы сказала так: сначала честно прислушайтесь к себе. Не стоит идти туда только из-за зарплат и красивых историй об успешном успехе. ИТ нужно много думать, разбираться, искать решения и иногда долго сидеть над задачей, которая сначала вообще непонятна",
          "Если вам правда интересно копаться в данных, понимать, как всё устроено, искать ошибки, улучшать процессы и делать что-то полезное для людей или бизнеса, тогда стоит попробовать. И не нужно ждать, что всё сразу будет легко. Но если интерес есть, постепенно многое становится понятнее",
        ],
      },
    ],
    text: "Больше всего мне запомнилось, что обучение было сбалансированным. Почти каждую тему мы старались привязать к реальным задачам, по типу как анализировать данные, как искать зависимости, как оценивать результат, как не тупо построить модель, а понять, зачем она нужна и какую пользу может дать продукту",
  },
  михаил: {
    avatar: reviewMikhailUrl,
    hero: reviewMikhailUrl,
    name: "Михаил",
    storyTitleName: "Михаила",
    course: "Python-разработчик",
    transition: "Веб-приложение для сервиса",
    city: "Иннополис",
    format: "Онлайн + наставник",
    period: "9 месяцев",
    result: "Первый проект в портфолио",
    pageTitle: "как я собрал веб-приложение для своего сервиса",
    heroQuote: "“Я пришёл не за теорией ради теории, а с конкретной идеей, и постепенно довёл её до рабочего результата”",
    sections: [
      {
        title: "Как начался переход",
        body: [
          "Всем привет, меня зовут Михаил. У меня есть небольшой сервис, связанный с обработкой клиентских заявок. Долгое время вся работа держалась на таблицах, переписках и ручных напоминаниях. Пока заявок было немного, этого хватало. Но когда поток вырос, стало понятно, что так дальше работать неудобно",
          "Я постоянно тратил время на поиск информации, проверку статусов и повторяющиеся действия. Тогда появилась идея сделать своё веб-приложение, где можно вести клиентов, заявки, комментарии и видеть всю картину в одном месте",
          "Сначала я думал использовать готовую CRM, но быстро понял, что под мой сервис не совсем подходит универсальное решение. Основная проблема была не только в ведении клиентов, а в том, чтобы нормально сохранять источники заявок и понимать, откуда реально приходят люди",
          "В обычных CRM с этим часто бывают сложности. Например, часть UTM-меток теряется, рекламные идентификаторы не всегда доходят до карточки клиента, данные из разных систем хранятся отдельно, а в итоге через пару месяцев смотришь на заявки и не понимаешь, какая реклама действительно сработала",
          "Для моего сервиса это было критично. Мне нужно было видеть не только список клиентов, но и весь путь заявки, начиная от первого перехода по рекламе до обращения, оплаты и дальнейшей работы. Поэтому я решил сделать своё веб-приложение, где можно было бы вести клиентов, заявки, статусы и сразу учитывать маркетинговые данные",
          "Сначала я думал заказать разработку, но потом понял, что хочу сам разобраться, как всё устроено. Мне было важно не зависеть полностью от подрядчиков и понимать, как создаются веб-приложения, как работает backend, база данных, авторизация и личный кабинет",
          "Поэтому я пришёл в ИННОПРОГ с конкретной задачей: разобраться в веб-разработке и собрать первую рабочую версию приложения для своего сервиса",
        ],
      },
      {
        title: "Как проходило обучение в ИННОПРОГ",
        body: [
          "На старте я не был программистом. Мог разобраться при помощи нейронки в настройках, но код писал очень мало. Поэтому обучение начали с основ",
          "Потом постепенно перешли к backend-разработке, базам данных, SQL, API, авторизации и структуре веб-приложения. Мне понравилось, что многие темы сразу разбирали на моём проекте. Например, как хранить заявки, как сделать статусы, как связать клиента с заказом, как добавить личный кабинет и как сохранять важные данные по источникам обращений",
          "Сложнее всего было привыкнуть к масштабу. В обычной таблице можно быстро что-то дописать. В приложении нужно заранее понимать, какие данные есть, как они связаны и что будет происходить при каждом действии пользователя",
          "Очень помогали разборы с наставником. Когда код ломался, мы вместе находили причину ошибки и разбирали, как её избежать в следующий раз. Постепенно я начал меньше паниковать при ошибках и адекватно искать решение",
        ],
      },
      {
        title: "Какой результат получился",
        body: [
          "В итоге я собрал рабочее веб-приложение для своего сервиса. В нём можно вести всю ту отчетность как и во многих других CRM, но с важной функцией для моего сервиса, фиксировать маркетинговые данные по каждому обращению",
          "Это не огромная CRM, но для моего бизнеса такой инструмент уже заметно упростил работу. Стало меньше хаоса, меньше ручных проверок и больше понимания, что происходит по каждому клиенту и по каждому рекламному каналу",
          "Больше всего пригодились Python, SQL, основы backend-разработки, работа с базой данных, API и понимание логики веб-приложений. Даже если в будущем я буду привлекать разработчиков, теперь мне проще ставить задачи и говорить с ними на одном языке",
        ],
      },
      {
        title: "Мой отзыв об ИННОПРОГ",
        body: [
          "В ИННОПРОГ мне понравилось, что обучение было привязано к реальной задаче. Я пришёл не за теорией ради теории, а с конкретной идеей, и постепенно довёл её до рабочего результата",
          "Для меня это был полезный опыт. Я лучше понял свой сервис, увидел, какие процессы можно упростить, и получил инструмент, который уже помогает в работе",
          "Тем, кто хочет изучать программирование для своего проекта, я бы сказал, что это того стоит. Даже если вы не планируете становиться разработчиком, базовые знания дают больше свободы и помогают быстрее превращать идеи в понятные решения",
        ],
      },
    ],
    text: "Очень помогали разборы с наставником. Когда код ломался, мы вместе находили причину ошибки и разбирали, как её избежать в следующий раз. Постепенно я начал меньше паниковать при ошибках и адекватно искать решение",
  },
} as const;

export type ReviewStoryKey = keyof typeof REVIEW_STORIES;

const REVIEW_ROUTES: Record<ReviewStoryKey, string> = {
  кирилл: "kirill",
  анастасия: "anastasia",
  михаил: "mikhail",
};

const REVIEW_KEYS_BY_ROUTE = {
  ...Object.fromEntries(Object.entries(REVIEW_ROUTES).map(([key, route]) => [route, key])),
  sergey: "михаил",
} as Record<string, ReviewStoryKey>;

const REVIEW_STORY_ORDER = ["кирилл", "анастасия", "михаил"] as const satisfies readonly ReviewStoryKey[];

const COURSE_REVIEW_ROUTES = {
  maria: "maria",
  vladimir: "vladimir",
  vildan: "vildan",
  veniamin: "veniamin",
  ilya: "ilya",
  andrey: "andrey",
} as const;

export type CourseReviewKey = keyof typeof COURSE_REVIEW_ROUTES;

const COURSE_REVIEW_KEYS_BY_ROUTE = Object.fromEntries(
  Object.entries(COURSE_REVIEW_ROUTES).map(([key, route]) => [route, key]),
) as Record<string, CourseReviewKey>;

const COURSE_REVIEW_ORDER = ["maria", "vladimir", "vildan", "veniamin", "ilya", "andrey"] as const satisfies readonly CourseReviewKey[];

const COURSE_REVIEW_STORIES: Record<CourseReviewKey, {
  name: string;
  rating: string;
  course: string;
  title: string;
  body: string;
}> = {
  maria: {
    name: "Мария",
    rating: "4.9",
    course: "Python-разработчик",
    title: "Я получила оффер в финтех-компанию",
    body:
      "Пришла на курс без уверенности, что смогу перейти в разработку. Больше всего помогли регулярные занятия, практика на платформе и разборы с наставником. Постепенно стало понятно, как устроен backend, как писать код аккуратнее и как готовиться к собеседованиям. К концу обучения у меня уже были проекты в портфолио и понятный план выхода на работу",
  },
  vladimir: {
    name: "Владимир",
    rating: "4.9",
    course: "Python-разработчик",
    title: "Собрал портфолио и стал увереннее на собеседованиях",
    body:
      "До обучения я изучал Python самостоятельно, но постоянно упирался в непонятные темы и бросал. В ИННОПРОГ мне помогла структура: теория сразу закреплялась практикой, а наставник показывал, как рассуждать при решении задач. После нескольких проектов стало проще объяснять свой код и проходить технические интервью",
  },
  vildan: {
    name: "Вильдан С.",
    rating: "4.9",
    course: "Python-разработчик",
    title: "Уже рассматриваю переход на новое место работы",
    body:
      "Всё нравится, обучаюсь с удовольствием. Спустя несколько месяцев появилось понимание того, чем именно я хотел бы заниматься дальше в разработке. Преподаватель подробно разбирает темы и объясняет сложные моменты простым языком. Администрация школы отзывчивая: если возникают вопросы, отвечают развернуто и без затягиваний. Сейчас готовлюсь к переходу на новое место работы",
  },
  veniamin: {
    name: "Вениамин",
    rating: "5.0",
    course: "Python-разработчик",
    title: "Преподаватели работают здесь не только за деньги, а за идею",
    body:
      "Изначально искал репетитора или наставника для самостоятельного изучения Python. Скептически относился к курсам, где дают только записи и материалы. Здесь всё совмещается: занятия, платформа, домашние задания и обратная связь. Прогресс пошёл заметно быстрее, потому что каждую тему можно было разобрать с преподавателем и сразу применить на практике",
  },
  ilya: {
    name: "Илья",
    rating: "4.9",
    course: "Python-разработчик",
    title: "Результатом доволен, собеседование удалось пройти",
    body:
      "Выбрал школу для подготовки к отбору на стажировку: нужно было подтянуть алгоритмы и задачи, которые обычно дают на технической секции. На занятиях много решали задач, разбирали разные подходы и учились правильно объяснять ход мыслей. Постепенно стало намного легче ориентироваться в алгоритмах. Результатом доволен: собеседование удалось пройти",
  },
  andrey: {
    name: "Андрей",
    rating: "4.8",
    course: "Python-разработчик",
    title: "Обучением полностью доволен",
    body:
      "Самостоятельное изучение Python не дало нужного результата, поэтому я решил заниматься с преподавателем и перенимать опыт напрямую. Каждый урок включал теорию, практику и домашние задания, а по вопросам была постоянная обратная связь. Спасибо команде за организацию обучения и преподавателю за интересные разборы",
  },
};

const REVIEWS_INDEX_ORDER = ["vildan", "veniamin", "andrey", "ilya", "vladimir"] as const satisfies readonly CourseReviewKey[];

const REVIEWS_INDEX_COPY: Record<(typeof REVIEWS_INDEX_ORDER)[number], {
  name: string;
  rating: string;
  title: string;
  body: string;
}> = {
  vildan: {
    name: "Вильдан С.",
    rating: "4.9",
    title: "Готовлюсь к внутренней защите дипломного проекта и подготовки к собеседованию",
    body:
      "Всё нравится, обучаюсь с удовольствием, спустя 2-3 месяца появилось понимание того, чем именно хотел бы заниматься дальше в разработке. Преподаватель Артемий всё разжевывает и объясняет. Администрация школы очень отзывчивая, если вдруг возникают вопросы отвечают развернуто и без затягиваний. На данный момент уже рассматриваю переход на новое место работы, сейчас готовлюсь к внутренней защите дипломного проекта и подготовки к собеседованию",
  },
  veniamin: {
    name: "Вениамин",
    rating: "5.0",
    title: "Нравится, что преподаватели работают здесь не только «за деньги», а за идею",
    body:
      "Изначально искал репетитора или наставника для самостоятельного изучения Python. Очень скиптически отношусь к курсам, где тебе дают доступ к урокам и пдфкам. Благо в данной школе всё совмещается, занятия и платформа, да и в целом прогресс пошел заметно быстрее. Нравится, что преподаватели работают здесь не только «за деньги», а за идею",
  },
  andrey: {
    name: "Андрей",
    rating: "4.8",
    title: "Обучением полностью доволен, каждый урок теория и практика",
    body:
      "В связи с тем, что самостоятельное изучение Python обернулось неудачей принял решение записаться на занятия, чтобы перенимать опыт из первых рук. Обучением полностью доволен, каждый урок теория и практика, и ещё ДЗ; постоянная обратная связь по любым вопросам как со стороны администрации, так и преподавателя. Спасибо администрации школы за организацию и курирование обучения, а преподавателю Сергею - за интересные и полезные занятия!",
  },
  ilya: {
    name: "Илья",
    rating: "4.9",
    title: "Результатом доволен, собес удалось пройти, сейчас стажируюсь. По необходимости буду обращаться еще)",
    body:
      "Выбрал данную школу для подготовки к отбору на стажировку в Яндекс нужно было подтянуть алгоритмы и задачи, которые обычно дают на тех. секции. На занятиях много решали задач, разбирали разные подходы к их решению и учились правильно объяснять ход мыслей как это требуется на собесе. Постепенно стало намного легче ориентироваться в алгоритмических задачах. Результатом доволен, собес удалось пройти, сейчас стажируюсь. По необходимости буду обращаться еще)",
  },
  vladimir: {
    name: "Владимир",
    rating: "4.9",
    title: "Я заметно подтянул уровень и стал увереннее в командной работе",
    body:
      "Обратился в онлайн-школу ИННОПРОГ с запросом на личного наставника по backend-разработке на Python, потому что хотел систематизировать знания и закрыть пробелы, которые мешали двигаться быстрее. Моим наставником стал Артемий, и это оказался именно тот специалист, которого я искал. Артемий выстроил понятный план обучения и помог привести в порядок базу. Начиная от архитектурного мышления и принципов построения backend-сервисов до практики написания чистого кода и уверенной работы с типовыми задачами. Особенно ценно, что он объясняет не как сделать по шаблону, а почему это делается именно так, где могут быть ошибки и мыслить как разработчик. Благодаря регулярной обратной связи, разбору моих решений и точечным рекомендациям я заметно подтянул уровень и стал увереннее в командной работе. Рекомендую Артемия всем, кто хочет реального прогресса в Python backend, структурно, по делу и с сильной поддержкой наставника на каждом этапе",
  },
};

const TARIFFS = [
  {
    name: "Базовый",
    oldPrice: "12 590 ₽/мес.",
    discount: "-36%",
    price: "7 990 ₽/мес.",
    accent: "dark",
    features: [
      { text: "4 ИНДИВИДУАЛЬНЫХ ЗАНЯТИЯ В МЕСЯЦ", included: true },
      { text: "Доступ к учебной платформе ИННОПРОГ", included: true },
      { text: "10 проектов в портфолио", included: true },
      { text: "Домашние задания и проверка кода преподавателем", included: true },
      { text: "Ежедневная поддержка куратора в чате", included: true },
      { text: "Записи ваших индивидуальных занятий с преподавателем навсегда", included: true },
      { text: "Диплом ИТ-школы ИННОПРОГ", included: true },
      { text: "Диплом о профессиональной переподготовке", included: false },
      { text: "Стажировка после обучения", included: false },
      { text: "2 тестовых технических собеседования", included: false },
      { text: "Подготовка резюме с HR-специалистом", included: false },
    ],
  },
  {
    name: "Расширенный",
    oldPrice: "23 590 ₽/мес.",
    discount: "-38%",
    price: "14 390 ₽/мес.",
    accent: "purple",
    features: [
      { text: "8 ИНДИВИДУАЛЬНЫХ ЗАНЯТИЙ В МЕСЯЦ", included: true },
      { text: "Доступ к учебной платформе ИННОПРОГ", included: true },
      { text: "15 проектов в портфолио", included: true },
      { text: "Домашние задания и проверка кода преподавателем", included: true },
      { text: "Ежедневная поддержка куратора в чате", included: true },
      { text: "Записи ваших индивидуальных занятий с преподавателем навсегда", included: true },
      { text: "Диплом ИТ-школы ИННОПРОГ", included: true },
      { text: "Диплом о профессиональной переподготовке", included: true },
      { text: "Стажировка после обучения", included: true },
      { text: "2 тестовых технических собеседования", included: false },
      { text: "Подготовка резюме с HR-специалистом", included: false },
    ],
  },
  {
    name: "Персональный",
    oldPrice: "31 950 ₽/мес.",
    discount: "-41%",
    price: "18 890 ₽/мес.",
    accent: "dark",
    features: [
      { text: "12 ИНДИВИДУАЛЬНЫХ ЗАНЯТИЙ В МЕСЯЦ", included: true },
      { text: "Доступ к учебной платформе ИННОПРОГ", included: true },
      { text: "15 проектов в портфолио", included: true },
      { text: "Домашние задания и проверка кода преподавателем", included: true },
      { text: "Ежедневная поддержка куратора в чате", included: true },
      { text: "Записи ваших индивидуальных занятий с преподавателем навсегда", included: true },
      { text: "Диплом ИТ-школы ИННОПРОГ", included: true },
      { text: "Диплом о профессиональной переподготовке", included: true },
      { text: "Стажировка после обучения", included: true },
      { text: "2 тестовых технических собеседования", included: true },
      { text: "Подготовка резюме с HR-специалистом", included: true },
    ],
  },
] as const;

const REVIEW_STORY_CARD_TITLES: Record<ReviewStoryKey, string> = {
  кирилл: "Как Кирилл перешёл из HR в ИТ",
  анастасия: "Как Анастасия перешла из 1С в продукт",
  михаил: "Как Михаил собрал веб-приложение для своего сервиса",
};

type ReviewCardData = {
  avatar: string;
  avatarClassName: string;
  name: string;
  course: string;
  courseLines: readonly string[];
  transition: string;
  quote: string;
};

const PYTHON_COURSE_LINES = ["Python-", "разработчик"] as const;

const REVIEW_CARD_DATA: Record<ReviewStoryKey, ReviewCardData> = {
  кирилл: {
    avatar: reviewStoryKirillHeroUrl,
    avatarClassName: "site-review-avatar-img--kirill",
    name: "Кирилл",
    course: "Python-разработчик",
    courseLines: PYTHON_COURSE_LINES,
    transition: "Из HR → в ИТ",
    quote: "Обучение проходило постепенно, от базовых тем к более сложным задачам. Больше всего мне запомнились именно сложные задания, потому что через них лучше всего начинаешь понимать программирование...",
  },
  анастасия: {
    avatar: reviewAnastasiaUrl,
    avatarClassName: "site-review-avatar-img--anastasia",
    name: "Анастасия",
    course: "Data Science",
    courseLines: ["Data Science"],
    transition: "Из 1С → в Product",
    quote: "Больше всего мне запомнилось, что обучение было сбалансированным. Почти каждую тему мы старались привязать к реальным задачам, по типу как анализировать данные, как искать зависимости, как оценивать результат, как не тупо построить модель, а понять, зачем она нужна и какую пользу может дать продукту",
  },
  михаил: {
    avatar: reviewMikhailUrl,
    avatarClassName: "site-review-avatar-img--mikhail",
    name: "Михаил",
    course: "Python-разработчик",
    courseLines: PYTHON_COURSE_LINES,
    transition: "Веб-приложение для сервиса",
    quote: "Очень помогали разборы с наставником. Когда код ломался, мы вместе находили причину ошибки и разбирали, как её избежать в следующий раз. Постепенно я начал меньше паниковать при ошибках и адекватно искать решение",
  },
};

function getViewportStateFromWidth(width: number) {
  const isMobile = width < MOBILE_BREAKPOINT;
  const design = isMobile ? MOBILE_DESIGN : DESKTOP_DESIGN;

  return {
    isMobile,
    scale: width / design.width,
    design,
  };
}

function subscribeViewport(callback: () => void) {
  if (typeof window === "undefined") {
    return () => {};
  }

  window.addEventListener("resize", callback);

  return () => {
    window.removeEventListener("resize", callback);
  };
}

function getViewportSnapshot() {
  return typeof window === "undefined" ? String(DESKTOP_DESIGN.width) : String(window.innerWidth);
}

function getServerViewportSnapshot() {
  // Start from the lightweight mobile tree. The loader covers hydration, and
  // wider clients switch to the desktop tree before the page is revealed.
  return String(MOBILE_DESIGN.width);
}

function getSafariSnapshot() {
  if (typeof navigator === "undefined") {
    return "false";
  }

  const userAgent = navigator.userAgent;
  const isSafari = /Safari/i.test(userAgent) &&
    /AppleWebKit/i.test(userAgent) &&
    !/(Chrome|Chromium|CriOS|FxiOS|Edg|OPR|Android)/i.test(userAgent);

  return isSafari ? "true" : "false";
}

function getServerSafariSnapshot() {
  return "false";
}

function getMetrikaSelectorSnapshot() {
  if (typeof window === "undefined") {
    return "false";
  }

  return new URLSearchParams(window.location.search).get("_ym_debug") === "1" ? "true" : "false";
}

function getServerMetrikaSelectorSnapshot() {
  return "false";
}

function useIsSafariBrowser() {
  return useSyncExternalStore(
    () => () => {},
    getSafariSnapshot,
    getServerSafariSnapshot,
  ) === "true";
}

function useIsMetrikaSelectorMode() {
  return useSyncExternalStore(
    () => () => {},
    getMetrikaSelectorSnapshot,
    getServerMetrikaSelectorSnapshot,
  ) === "true";
}

function useViewportState() {
  const viewportWidth = Number(useSyncExternalStore(
    subscribeViewport,
    getViewportSnapshot,
    getServerViewportSnapshot,
  ));

  return getViewportStateFromWidth(viewportWidth);
}

function getCriticalAssets(isMobile: boolean) {
  return isMobile
    ? ["/logo-education-360.webp", heroMobileUrl]
    : ["/logo-education-360.webp", heroPersonUrl, heroBackgroundUrl];
}

function getClickedText(target: EventTarget | null, root: HTMLElement) {
  const element = target instanceof Element
    ? target.closest<HTMLElement>('button, [role="button"], [data-name="кнопки пд"], [data-name="Text"]')
    : null;

  if (!element || !root.contains(element)) {
    return "";
  }

  return element.textContent?.replace(/\s+/g, " ").trim().toLowerCase() || "";
}

function getVisibleCarouselAnchor(carousel: HTMLElement) {
  const rect = carousel.getBoundingClientRect();
  const viewportWidth = window.innerWidth || document.documentElement.clientWidth;
  const visibleLeft = Math.max(rect.left, 0);
  const visibleRight = Math.min(rect.right, viewportWidth);

  if (visibleRight > visibleLeft) {
    return ((visibleLeft + visibleRight) / 2) - rect.left;
  }

  return carousel.clientWidth / 2;
}

function shouldLoopCarousel(carousel: HTMLElement) {
  return carousel.dataset.carouselLoop === "true";
}

function getCarouselItems(carousel: HTMLElement) {
  return Array.from(carousel.children).filter(
    (child): child is HTMLElement => child instanceof HTMLElement,
  );
}

function setCarouselActiveIndex(carousel: HTMLElement, activeIndex: number) {
  const items = getCarouselItems(carousel);
  const id = carousel.dataset.carousel;

  items.forEach((item, index) => {
    const isActive = index === activeIndex;

    item.dataset.active = String(isActive);
    item.setAttribute("aria-current", isActive ? "true" : "false");
  });

  if (!id) {
    return;
  }

  document
    .querySelectorAll<HTMLElement>(`[data-carousel-dot][data-carousel-target="${id}"]`)
    .forEach((dot, index) => {
      const isActive = index === activeIndex;

      dot.dataset.active = String(isActive);
      dot.setAttribute("aria-current", isActive ? "true" : "false");
    });
}

function normalizeCarouselScrollLeft(carousel: HTMLElement, scrollLeft: number) {
  const maxScrollLeft = carousel.scrollWidth - carousel.clientWidth;

  if (!shouldLoopCarousel(carousel) || maxScrollLeft <= 1) {
    return Math.max(0, Math.min(maxScrollLeft, scrollLeft));
  }

  if (scrollLeft < 0) {
    return maxScrollLeft - (Math.abs(scrollLeft) % maxScrollLeft);
  }

  if (scrollLeft > maxScrollLeft) {
    return scrollLeft % maxScrollLeft;
  }

  return scrollLeft;
}

function scrollCarousel(id: string, direction: number) {
  const carousel = document.querySelector<HTMLElement>(`[data-carousel="${id}"]`);

  if (!carousel) {
    return;
  }

  const items = getCarouselItems(carousel);

  if (!items.length) {
    return;
  }

  const isCenterAligned = carousel.dataset.carouselAlign === "center";
  const paddingLeft = Number.parseFloat(window.getComputedStyle(carousel).paddingLeft) || 0;
  const activeAnchor = isCenterAligned ? getVisibleCarouselAnchor(carousel) : paddingLeft;
  const reviewsActiveIndex = carousel.dataset.carousel === "reviews"
    ? items.findIndex((item) => item.dataset.active === "true")
    : -1;
  const activeIndex = reviewsActiveIndex >= 0
    ? reviewsActiveIndex
    : items.reduce((nearestIndex, item, index) => {
      const itemAnchor = isCenterAligned
        ? item.offsetLeft + (item.offsetWidth / 2) - carousel.scrollLeft
        : item.offsetLeft - carousel.scrollLeft;
      const nearestItem = items[nearestIndex];
      const nearestAnchor = isCenterAligned
        ? nearestItem.offsetLeft + (nearestItem.offsetWidth / 2) - carousel.scrollLeft
        : nearestItem.offsetLeft - carousel.scrollLeft;

      return Math.abs(itemAnchor - activeAnchor) < Math.abs(nearestAnchor - activeAnchor)
        ? index
        : nearestIndex;
    }, 0);
  const isLooping = shouldLoopCarousel(carousel);
  const maxScrollLeft = carousel.scrollWidth - carousel.clientWidth;
  const rawTargetIndex = isLooping && direction > 0 && carousel.scrollLeft >= maxScrollLeft - 1
    ? items.length
    : isLooping && direction < 0 && carousel.scrollLeft <= 1
      ? -1
      : activeIndex + direction;
  const isLoopWrap = isLooping && (rawTargetIndex < 0 || rawTargetIndex >= items.length);
  const targetIndex = isLooping
    ? (rawTargetIndex + items.length) % items.length
    : Math.max(0, Math.min(items.length - 1, rawTargetIndex));
  const item = items[targetIndex];
  const targetLeft = isCenterAligned
    ? item.offsetLeft + (item.offsetWidth / 2) - activeAnchor
    : item.offsetLeft - paddingLeft;
  const normalizedTargetLeft = Math.max(0, Math.min(maxScrollLeft, targetLeft));

  setCarouselActiveIndex(carousel, targetIndex);

  carousel.scrollTo({
    left: normalizedTargetLeft,
    behavior: isLoopWrap ? "auto" : "smooth",
  });
}

function scrollCarouselTo(id: string, index: number) {
  const carousel = document.querySelector<HTMLElement>(`[data-carousel="${id}"]`);

  if (!carousel) {
    return;
  }

  const items = getCarouselItems(carousel);
  const item = items[index];

  if (!item) {
    return;
  }

  const paddingLeft = Number.parseFloat(window.getComputedStyle(carousel).paddingLeft) || 0;
  const isCenterAligned = carousel.dataset.carouselAlign === "center";
  const maxScrollLeft = carousel.scrollWidth - carousel.clientWidth;
  const targetLeft = isCenterAligned
    ? item.offsetLeft - ((carousel.clientWidth - item.offsetWidth) / 2)
    : item.offsetLeft - paddingLeft;

  setCarouselActiveIndex(carousel, index);

  carousel.scrollTo({
    left: Math.max(0, Math.min(maxScrollLeft, targetLeft)),
    behavior: "smooth",
  });
}

function getReviewStoryFromHash(): ReviewStoryKey | null {
  if (typeof window === "undefined") {
    return null;
  }

  const route = window.location.hash.match(/^#\/reviews\/([^/?#]+)/)?.[1];

  if (!route) {
    return null;
  }

  return REVIEW_KEYS_BY_ROUTE[decodeURIComponent(route)] ?? null;
}

function getReviewStoryFromPathname(pathname: string): ReviewStoryKey | null {
  const route = pathname.match(/^\/reviews\/([^/?#]+)/)?.[1];

  if (!route) {
    return null;
  }

  return REVIEW_KEYS_BY_ROUTE[decodeURIComponent(route)] ?? null;
}

function getStudentReviewFromHash(): string | null {
  if (typeof window === "undefined") {
    return null;
  }

  const legacyRoute = window.location.hash.match(/^#\/reviews\/text\/([^/?#]+)/)?.[1];
  const legacyReview = findStudentReviewByRouteSlug(legacyRoute);

  if (legacyReview) {
    return legacyReview.id;
  }

  const route = window.location.hash.match(/^#\/([^/?#]+)\/reviews\/([^/?#]+)/);
  const coursePath = route ? `/${decodeURIComponent(route[1])}` : null;
  const review = findStudentReviewByRouteSlug(route?.[2]);

  if (!review || review.courseReviewKey || getReviewCoursePath(review.direction) !== coursePath) {
    return null;
  }

  return review.id;
}

function getStudentReviewFromPathname(pathname: string): string | null {
  const legacyRoute = pathname.match(/^\/reviews\/text\/([^/?#]+)/)?.[1];
  const legacyReview = findStudentReviewByRouteSlug(legacyRoute);

  if (legacyReview) {
    return legacyReview.id;
  }

  const route = pathname.match(/^\/([^/?#]+)\/reviews\/([^/?#]+)/);
  const coursePath = route ? `/${decodeURIComponent(route[1])}` : null;
  const review = findStudentReviewByRouteSlug(route?.[2]);

  if (!review || review.courseReviewKey || getReviewCoursePath(review.direction) !== coursePath) {
    return null;
  }

  return review.id;
}

function getStudentReviewFromSearchParams(searchParams: URLSearchParams): string | null {
  const review = findStudentReviewByRouteSlug(searchParams.get("review"));

  return review?.id ?? null;
}

function getCourseReviewFromHash(): CourseReviewKey | null {
  if (typeof window === "undefined") {
    return null;
  }

  const route = window.location.hash.match(/^#\/python-course\/reviews\/([^/?#]+)/)?.[1];

  if (!route) {
    return null;
  }

  return COURSE_REVIEW_KEYS_BY_ROUTE[decodeURIComponent(route)] ?? null;
}

function getCourseReviewFromPathname(pathname: string): CourseReviewKey | null {
  const route = pathname.match(/^\/python-course\/reviews\/([^/?#]+)/)?.[1];

  if (!route) {
    return null;
  }

  return COURSE_REVIEW_KEYS_BY_ROUTE[decodeURIComponent(route)] ?? null;
}

function getCleanPathFromHash(): string | null {
  if (typeof window === "undefined") {
    return null;
  }

  const hash = window.location.hash;

  if (hash === "#/about") {
    return "/about";
  }

  if (hash === "#/tariffs") {
    return "/tariffs";
  }

  if (hash === "#/python-course") {
    return "/python-course";
  }

  if (hash === "#/data-science-course") {
    return "/data-science-course";
  }

  if (hash === "#/frontend-developer-course") {
    return "/frontend-developer-course";
  }

  if (hash === "#/data-analyst-course") {
    return "/data-analyst-course";
  }

  if (hash === "#/cpp-developer-course") {
    return "/cpp-developer-course";
  }

  if (hash === "#/mobile-developer-course") {
    return "/mobile-developer-course";
  }

  if (hash === "#/unreal-engine-course") {
    return "/unreal-engine-course";
  }

  if (hash === "#/java-developer-course") {
    return "/java-developer-course";
  }

  if (hash === "#/ml-engineer-course") {
    return "/ml-engineer-course";
  }

  if (hash === "#/reviews") {
    return "/reviews";
  }

  const hashStudentReview = getStudentReviewFromHash();

  if (hashStudentReview) {
    return getStudentReviewPath(hashStudentReview);
  }

  const hashStory = getReviewStoryFromHash();

  if (hashStory) {
    return `/reviews/${REVIEW_ROUTES[hashStory]}`;
  }

  const hashCourseReview = getCourseReviewFromHash();

  if (hashCourseReview) {
    return getStudentReviewPath(hashCourseReview);
  }

  return null;
}

function getRouteFromLocation(): AppInitialRoute {
  if (typeof window === "undefined") {
    return { page: "home" };
  }

  const cleanHashPath = getCleanPathFromHash();
  const pathname = cleanHashPath ?? window.location.pathname;
  const searchParams = new URLSearchParams(window.location.search);

  if (cleanHashPath) {
    window.history.replaceState(null, "", cleanHashPath);
  }

  const pathStudentReview = getStudentReviewFromPathname(pathname);

  if (pathStudentReview) {
    return { page: "studentReview", review: pathStudentReview };
  }

  if (pathname === "/reviews") {
    const queryStudentReview = getStudentReviewFromSearchParams(searchParams);

    if (queryStudentReview) {
      return { page: "studentReview", review: queryStudentReview };
    }
  }

  const pathStory = getReviewStoryFromPathname(pathname);

  if (pathStory) {
    return { page: "review", story: pathStory };
  }

  const pathCourseReview = getCourseReviewFromPathname(pathname);

  if (pathCourseReview) {
    return { page: "courseReview", review: pathCourseReview };
  }

  if (pathname === "/about") {
    return { page: "about" };
  }

  if (pathname === "/tariffs") {
    return { page: "tariffs" };
  }

  if (pathname === "/python-course") {
    return { page: "pythonCourse" };
  }

  if (pathname === "/data-science-course") {
    return { page: "dataScienceCourse" };
  }

  if (pathname === "/frontend-developer-course") {
    return { page: "frontendCourse" };
  }

  if (pathname === "/data-analyst-course") {
    return { page: "dataAnalystCourse" };
  }

  if (pathname === "/cpp-developer-course") {
    return { page: "cppCourse" };
  }

  if (pathname === "/mobile-developer-course") {
    return { page: "mobileDeveloperCourse" };
  }

  if (pathname === "/unreal-engine-course") {
    return { page: "unrealEngineCourse" };
  }

  if (pathname === "/java-developer-course") {
    return { page: "javaCourse" };
  }

  if (pathname === "/ml-engineer-course") {
    return { page: "mlEngineerCourse" };
  }

  if (pathname === "/reviews") {
    return { page: "reviews" };
  }

  return { page: "home" };
}

function getReviewsDirectionFromLocation(): ReviewsDirectionKey {
  if (typeof window === "undefined") {
    return ALL_REVIEWS_DIRECTION_KEY;
  }

  return normalizeReviewsDirectionKey(new URLSearchParams(window.location.search).get("direction"));
}

function getRouteState(route: AppInitialRoute) {
  return {
    activeReviewStory: route.page === "review" ? route.story : null,
    activeCourseReview: route.page === "courseReview" ? route.review : null,
    activeStudentReview: route.page === "studentReview" ? route.review : null,
    activeReviewsDirection: route.page === "reviews"
      ? normalizeReviewsDirectionKey(route.direction)
      : ALL_REVIEWS_DIRECTION_KEY,
    isAboutRoute: route.page === "about",
    isPythonCourseRoute: route.page === "pythonCourse",
    isDataScienceCourseRoute: route.page === "dataScienceCourse",
    isFrontendCourseRoute: route.page === "frontendCourse",
    isDataAnalystCourseRoute: route.page === "dataAnalystCourse",
    isCppCourseRoute: route.page === "cppCourse",
    isMobileDeveloperCourseRoute: route.page === "mobileDeveloperCourse",
    isUnrealEngineCourseRoute: route.page === "unrealEngineCourse",
    isJavaCourseRoute: route.page === "javaCourse",
    isMlEngineerCourseRoute: route.page === "mlEngineerCourse",
    isReviewsRoute: route.page === "reviews",
    isTariffsRoute: route.page === "tariffs",
  };
}

function getStorySections(story: ReviewStoryKey) {
  const sections = REVIEW_STORIES[story].sections;

  if (sections.length > 0) {
    return sections;
  }

  return [
    {
      title: `История ${REVIEW_STORIES[story].storyTitleName}`,
      body: [REVIEW_STORIES[story].text],
    },
  ];
}

function SiteFooter({
  isMobile,
  scale,
}: {
  isMobile: boolean;
  scale: number;
}) {
  if (isMobile) {
    const outerStyle = {
      height: `${Math.ceil(912 * scale)}px`,
    };
    const innerStyle = {
      width: `${MOBILE_DESIGN.width}px`,
      height: "912px",
      transform: `scale(${scale})`,
    };

    return (
      <div className="site-main-footer-surface site-main-footer-surface--mobile" style={outerStyle}>
        <div className="site-main-footer-surface__mobile-canvas" style={innerStyle}>
          <MainScreenMobileFooter />
        </div>
      </div>
    );
  }

  const footerStyle = {
    width: `${DESKTOP_DESIGN.width}px`,
    zoom: scale,
  } as CSSProperties & { zoom?: number };

  return (
    <div className="site-main-footer-surface site-main-footer-surface--desktop" style={footerStyle}>
      <MainScreenDesktopFooter />
    </div>
  );
}

function LegacySiteFooter() {
  return (
    <footer className="site-review-page__footer">
      <img alt="ИННОПРОГ Education" title="ИННОПРОГ Education" className="site-review-page__footer-logo" src="/logo-education-360.webp" />
      <div className="site-review-page__footer-columns">
        <section>
          <h2>Контакты</h2>
          <a href="tel:+79586067980">Тел.: +7 (958) 606-79-80</a>
          <a href="mailto:education@innoprog.ru">Email: education@innoprog.ru</a>
          <a href="https://t.me/innoprog_admin" rel="noopener noreferrer" target="_blank">Telegram: @innoprog_admin</a>
        </section>
        <section>
          <h2>Адреса</h2>
          <p>г. Иннополис, ул. Университетская, д.5, пом.115, м.15/2</p>
          <p>420500 Республика Татарстан, Верхнеуслонский р-он</p>
        </section>
        <section>
          <h2>Правовая информация</h2>
          <a href="https://api.innoprog.ru/files/documents/privacy_policy.pdf" rel="noopener noreferrer" target="_blank">Политика конфиденциальности</a>
          <a href="https://api.innoprog.ru/files/documents/contract_offer.pdf" rel="noopener noreferrer" target="_blank">Публичная оферта</a>
          <a href="/documents/software-operation-manual.pdf" rel="noopener noreferrer" target="_blank">Инструкция по эксплуатации</a>
          <a href="/documents/functional-characteristics.pdf" rel="noopener noreferrer" target="_blank">Описание функциональных характеристик</a>
        </section>
      </div>
      <div className="site-review-page__socials" aria-label="Социальные сети">
        <a aria-label="Написать на почту" href="mailto:education@innoprog.ru"><img alt="" src={reviewStoryMailUrl} /></a>
        <a aria-label="Позвонить" href="tel:+79586067980"><img alt="" src={reviewStoryPhoneUrl} /></a>
        <a aria-label="WhatsApp" href="https://wa.me/79934099057?text=Добрый%20день%21%20Хочу%20приобрести%20обучение%20по%20профессии%20Python-разработчик" rel="noopener noreferrer" target="_blank"><img alt="" src={reviewStoryWhatsappUrl} /></a>
        <a aria-label="Telegram" href="https://t.me/innoprog_admin" rel="noopener noreferrer" target="_blank"><img alt="" src={reviewStoryTelegramUrl} /></a>
      </div>
      <p className="site-review-page__footer-company">
        ООО «ИННОПРОГ» · ИНН 1683011286 · ОГРН 1221600105440
        <br aria-hidden="true" />
        ОКВЭД: 62.09 (основной), 62.02 · Коды видов деятельности в области информационных технологий: 16.01 (основной), 1.01, 1.12
      </p>
    </footer>
  );
}

function SitePageHeader({
  logoSrc = "/logo-education-360.webp",
  onHome,
  scale = 1,
}: {
  logoSrc?: string;
  onHome: () => void;
  scale?: number;
}) {
  const headerStyle = {
    "--site-header-scale": scale,
  } as CSSProperties & { "--site-header-scale": number };

  return (
    <header className="site-review-page__header site-main-header" style={headerStyle}>
      <button
        className="site-review-page__logo"
        data-site-home
        onClick={(event) => {
          event.stopPropagation();
          onHome();
        }}
        type="button"
      >
        <img alt="ИННОПРОГ Education" title="ИННОПРОГ Education" src={logoSrc} />
      </button>
      <nav className="site-review-page__nav" aria-label="Навигация">
        <button data-review-nav="adults" type="button">для взрослых</button>
        <button data-review-nav="children" type="button">для детей</button>
        <button data-review-nav="reviews" type="button">отзывы</button>
        <button data-review-nav="about" type="button">о нас</button>
      </nav>
      <button className="site-review-page__header-cta" type="button">подобрать курс</button>
      <button
        aria-label="Открыть меню"
        className="site-review-page__mobile-toggle"
        data-mobile-menu-toggle
        type="button"
      >
        <span aria-hidden="true" />
      </button>
    </header>
  );
}

function MainScreenHeaderSurface({
  isMobile,
  scale,
}: {
  isMobile: boolean;
  scale: number;
}) {
  if (isMobile) {
    const outerStyle = {
      height: `${Math.ceil(112 * scale)}px`,
    };
    const innerStyle = {
      width: `${MOBILE_DESIGN.width}px`,
      height: "112px",
      transform: `scale(${scale})`,
    };

    return (
      <div className="site-main-header-surface site-main-header-surface--mobile" style={outerStyle}>
        <div className="site-main-header-surface__mobile-canvas" style={innerStyle}>
          <MainScreenMobileHeader />
        </div>
      </div>
    );
  }

  const surfaceStyle = {
    width: `${DESKTOP_DESIGN.width}px`,
    zoom: scale,
  } as CSSProperties & { zoom?: number };

  return (
    <div className="site-main-header-surface site-main-header-surface--desktop" style={surfaceStyle}>
      <MainScreenDesktopHeader />
    </div>
  );
}

function ReviewStyleCard({
  ariaLabel,
  card,
  courseReviewKey,
  storyKey,
}: {
  ariaLabel: string;
  card: ReviewCardData;
  courseReviewKey?: CourseReviewKey;
  storyKey?: ReviewStoryKey;
}) {
  const dataAttributes = {
    ...(storyKey ? { "data-review-story": storyKey } : {}),
    ...(courseReviewKey ? { "data-course-review": courseReviewKey } : {}),
  };
  const href = storyKey
    ? `/reviews/${REVIEW_ROUTES[storyKey]}`
    : courseReviewKey
      ? getStudentReviewPath(courseReviewKey)
      : undefined;

  return (
    <a
      aria-label={ariaLabel}
      className="site-related-review-card"
      data-name="отзыв"
      href={href}
      {...dataAttributes}
    >
      <span aria-hidden="true" className="site-related-review-card__border" />
      <span className="site-related-review-card__inner content-stretch flex flex-col gap-[24px] items-center px-[16px] py-[24px] relative size-full">
        <span className="site-related-review-card__profile">
          <span className="site-related-review-card__avatar">
            <img alt={`Фото ученика ${card.name}`} title={`Фото ученика ${card.name}`} className={card.avatarClassName} loading="lazy" src={card.avatar} />
          </span>
          <span className="site-related-review-card__profile-copy">
            <strong>{card.name}</strong>
            <span className="site-related-review-card__course">
              <span className="site-related-review-card__course-desktop">{`Выпускник курса: ${card.course}`}</span>
              <span className="site-related-review-card__course-mobile">
                <span className="site-related-review-card__course-prefix">Выпускник курса: </span>
                <span className="site-related-review-card__course-lines">
                  {card.courseLines.map((line) => (
                    <span key={line}>{line}</span>
                  ))}
                </span>
              </span>
            </span>
          </span>
        </span>
        <span className="site-related-review-card__body">
          <span className="site-related-review-card__transition">{card.transition}</span>
          <span className="site-related-review-card__quote site-review-quote site-mobile-review-quote">{card.quote}</span>
          <span className="site-related-review-card__read-more">ЧИТАТЬ ПОЛНОСТЬЮ</span>
        </span>
      </span>
    </a>
  );
}

function RelatedReviewCard({ storyKey }: { storyKey: ReviewStoryKey }) {
  return (
    <ReviewStyleCard
      ariaLabel={`Открыть историю: ${REVIEW_STORY_CARD_TITLES[storyKey]}`}
      card={REVIEW_CARD_DATA[storyKey]}
      storyKey={storyKey}
    />
  );
}

function CourseRating({ rating }: { rating: string }) {
  return (
    <span className="site-course-review-rating">
      <span>{rating}</span>
      <span aria-hidden="true">★</span>
    </span>
  );
}

function CourseReviewsPage({
  reviewKey,
  onBack,
  onHome,
  onPythonCourse,
  onReviewsDirection,
  headerScale,
  isMobile,
}: {
  reviewKey: CourseReviewKey;
  onBack: () => void;
  onHome: () => void;
  onPythonCourse: () => void;
  onReviewsDirection: (direction: ReviewsDirectionKey) => void;
  headerScale: number;
  isMobile: boolean;
}) {
  const [isMoreOtherReviewsVisible, setIsMoreOtherReviewsVisible] = useState(false);
  const review = COURSE_REVIEW_STORIES[reviewKey] || COURSE_REVIEW_STORIES.maria;
  const baseOtherReviews = STUDENT_REVIEWS.filter((item) => item.courseReviewKey !== reviewKey);
  const orderedCourseReviews = COURSE_REVIEW_ORDER
    .filter((key) => key !== reviewKey)
    .flatMap((key) => baseOtherReviews.filter((item) => item.courseReviewKey === key));
  const otherReviewPool = [
    ...orderedCourseReviews,
    ...baseOtherReviews.filter((item) => item.direction === "python" && !item.courseReviewKey),
    ...baseOtherReviews.filter((item) => item.direction !== "python"),
  ];
  const initialOtherReviewLimit = isMobile ? 2 : 4;
  const otherReviews = isMoreOtherReviewsVisible
    ? otherReviewPool
    : otherReviewPool.slice(0, initialOtherReviewLimit);
  const hasMoreOtherReviews = otherReviewPool.length > otherReviews.length;
  const directions = REVIEWS_DIRECTIONS.filter((direction) => direction.key !== ALL_REVIEWS_DIRECTION_KEY);

  useEffect(() => {
    setIsMoreOtherReviewsVisible(false);
  }, [reviewKey]);

  return (
    <section className="site-course-reviews-page site-student-review-page" aria-label="Отзывы учеников о курсе Python-разработчик">
      <MainScreenHeaderSurface isMobile={isMobile} scale={headerScale} />
      <div className="site-course-reviews-page__inner">
        <div className="site-course-reviews-page__top">
          <button className="site-review-page__back" onClick={onBack} type="button">
            <span aria-hidden="true">←</span>
            <span>назад</span>
          </button>
          <div className="site-review-page__crumbs site-course-reviews-page__crumbs">
            <button onClick={onHome} type="button">главная</button>
            <span aria-hidden="true">/</span>
            <strong>{`отзыв ${review.name.toLowerCase()}`}</strong>
          </div>
        </div>

        <header className="site-course-reviews-page__title">
          <h1>Отзывы учеников</h1>
          <p>о курсе Python-разработчик</p>
        </header>

        <article className="site-course-review-feature">
          <div className="site-course-review-feature__head">
            <div>
              <h2>{review.name}</h2>
              <p>{`курс: ${review.course}`}</p>
            </div>
            <CourseRating rating={review.rating} />
          </div>
          <h3>{review.title}</h3>
          <p>{review.body}</p>
        </article>

        <section className="site-course-reviews-page__other" aria-label="Еще отзывы о направлении">
          <h2>другие отзывы</h2>
          <div className="site-student-review-page__other-grid">
            {otherReviews.map((item) => (
              <ReviewsIndexCard key={item.id} review={item} />
            ))}
          </div>
          {hasMoreOtherReviews ? (
            <button
              className="site-review-page__load-more"
              onClick={() => setIsMoreOtherReviewsVisible(true)}
              type="button"
            >
              загрузить ещё
            </button>
          ) : null}
        </section>

        <section className="site-course-reviews-page__directions" aria-label="Другие направления">
          <h2>о каком направлении ещё хотите почитать?</h2>
          <div>
            {directions.map((direction) => (
              <button
                data-reviews-direction={direction.key}
                key={direction.key}
                onClick={() => onReviewsDirection(direction.key)}
                type="button"
              >
                {direction.label}
              </button>
            ))}
          </div>
        </section>
      </div>
      <SiteFooter isMobile={isMobile} scale={headerScale} />
    </section>
  );
}

function ReviewsIndexPage({
  onBack,
  onHome,
  activeDirection,
  onDirectionChange,
  headerScale,
  isMobile,
}: {
  onBack: () => void;
  onHome: () => void;
  activeDirection: ReviewsDirectionKey;
  onDirectionChange: (direction: ReviewsDirectionKey) => void;
  headerScale: number;
  isMobile: boolean;
}) {
  const currentDirection = REVIEWS_DIRECTIONS.find((direction) => direction.key === activeDirection) || REVIEWS_DIRECTIONS[0];
  const filteredReviews = activeDirection === ALL_REVIEWS_DIRECTION_KEY
    ? STUDENT_REVIEWS
    : STUDENT_REVIEWS.filter((review) => review.direction === activeDirection);
  const initialReviewLimit = isMobile ? 4 : 6;
  const reviewsLoadMoreStep = 9;
  const [visibleReviewLimit, setVisibleReviewLimit] = useState(initialReviewLimit);
  const visibleReviews = filteredReviews.slice(0, visibleReviewLimit);
  const hasMoreReviews = filteredReviews.length > visibleReviews.length;

  useEffect(() => {
    setVisibleReviewLimit(initialReviewLimit);
  }, [activeDirection, initialReviewLimit]);

  return (
    <section className="site-reviews-index-page" aria-label="Отзывы учеников">
      <MainScreenHeaderSurface isMobile={isMobile} scale={headerScale} />
      <div className="site-reviews-index-page__inner">
        <div className="site-reviews-index-page__top">
          <button className="site-review-page__back" onClick={onBack} type="button">
            <span aria-hidden="true">←</span>
            <span>назад</span>
          </button>
          <div className="site-review-page__crumbs site-reviews-index-page__crumbs">
            <button onClick={onHome} type="button">главная</button>
            <span aria-hidden="true">/</span>
            <strong>отзывы</strong>
          </div>
        </div>

        <header className="site-reviews-index-page__title">
          <h1>Отзывы учеников</h1>
          <p>{currentDirection.title}</p>
        </header>

        <section className="site-reviews-index-page__directions site-reviews-index-page__directions--top" aria-label="Фильтр отзывов по направлению">
          <div>
            {REVIEWS_DIRECTIONS.map((direction) => (
              <button
                aria-current={direction.key === activeDirection ? "true" : undefined}
                data-active={direction.key === activeDirection ? "true" : undefined}
                data-reviews-direction={direction.key}
                key={direction.key}
                onClick={() => onDirectionChange(direction.key)}
                type="button"
              >
                {direction.label}
              </button>
            ))}
          </div>
        </section>

        <section className="site-reviews-index-page__reviews" aria-label="Отзывы учеников по выбранному направлению">
          <div className="site-reviews-index-page__grid">
            {visibleReviews.map((review) => (
              <ReviewsIndexCard key={review.id} review={review} />
            ))}
          </div>
          {hasMoreReviews ? (
            <button
              className="site-reviews-index-page__load-more"
              onClick={() => setVisibleReviewLimit((currentLimit) => (
                Math.min(filteredReviews.length, currentLimit + reviewsLoadMoreStep)
              ))}
              type="button"
            >
              загрузить ещё
            </button>
          ) : null}
        </section>
      </div>
      <SiteFooter isMobile={isMobile} scale={headerScale} />
    </section>
  );
}

function ReviewsIndexCard({ review }: { review: StudentReview }) {
  const reviewAnchorId = `review-${review.courseReviewKey || review.id}`;
  const content = (
    <>
      <span className="site-reviews-index-card__head">
        <span>
          <strong>{review.name}</strong>
          <span>{`${review.age} · курс: ${review.course}`}</span>
        </span>
        <CourseRating rating={review.rating} />
      </span>
      <span className="site-reviews-index-card__copy">
        <span className="site-reviews-index-card__title">{review.title}</span>
        <span className="site-reviews-index-card__body">{review.body}</span>
      </span>
      <span className="site-reviews-index-card__read-more">читать полностью</span>
    </>
  );
  return (
    <a
      className="site-reviews-index-card"
      data-student-review={review.id}
      draggable={false}
      href={getStudentReviewPath(review)}
      id={reviewAnchorId}
    >
      {content}
    </a>
  );
}

function StudentReviewPage({
  reviewId,
  onBack,
  onHome,
  onReviewsDirection,
  headerScale,
  isMobile,
}: {
  reviewId: string;
  onBack: () => void;
  onHome: () => void;
  onReviewsDirection: (direction: ReviewsDirectionKey) => void;
  headerScale: number;
  isMobile: boolean;
}) {
  const [isMoreOtherReviewsVisible, setIsMoreOtherReviewsVisible] = useState(false);
  const review = findStudentReviewById(reviewId) || STUDENT_REVIEWS.find((item) => !item.courseReviewKey) || STUDENT_REVIEWS[0];
  const currentDirection = REVIEWS_DIRECTIONS.find((direction) => direction.key === review.direction);
  const directionReviews = STUDENT_REVIEWS.filter(
    (item) => !item.courseReviewKey && item.direction === review.direction && item.id !== review.id,
  );
  const fallbackReviews = STUDENT_REVIEWS.filter(
    (item) => !item.courseReviewKey && item.direction !== review.direction && item.id !== review.id,
  );
  const otherReviewPool = [...directionReviews, ...fallbackReviews];
  const initialOtherReviewLimit = isMobile ? 2 : 4;
  const otherReviews = isMoreOtherReviewsVisible
    ? otherReviewPool
    : otherReviewPool.slice(0, initialOtherReviewLimit);
  const hasMoreOtherReviews = otherReviewPool.length > otherReviews.length;
  const directions = REVIEWS_DIRECTIONS.filter((direction) => direction.key !== ALL_REVIEWS_DIRECTION_KEY);

  useEffect(() => {
    setIsMoreOtherReviewsVisible(false);
  }, [review.id]);

  return (
    <section className="site-course-reviews-page site-student-review-page" aria-label={`Отзыв ${review.name}`}>
      <MainScreenHeaderSurface isMobile={isMobile} scale={headerScale} />
      <div className="site-course-reviews-page__inner">
        <div className="site-course-reviews-page__top">
          <button className="site-review-page__back" onClick={onBack} type="button">
            <span aria-hidden="true">←</span>
            <span>назад</span>
          </button>
          <div className="site-review-page__crumbs site-course-reviews-page__crumbs">
            <button onClick={onHome} type="button">главная</button>
            <span aria-hidden="true">/</span>
            <strong>{`отзыв ${review.name.toLowerCase()}`}</strong>
          </div>
        </div>

        <header className="site-course-reviews-page__title">
          <h1>Отзывы учеников</h1>
          <p>{currentDirection?.title || `о направлении ${review.course}`}</p>
        </header>

        <article className="site-course-review-feature">
          <div className="site-course-review-feature__head">
            <div>
              <h2>{review.name}</h2>
              <p>{`${review.age} · курс: ${review.course}`}</p>
            </div>
            <CourseRating rating={review.rating} />
          </div>
          <h3>{review.title}</h3>
          <p>{review.body}</p>
        </article>

        {otherReviews.length > 0 ? (
          <section className="site-course-reviews-page__other" aria-label="Другие отзывы">
            <h2>другие отзывы</h2>
            <div className="site-student-review-page__other-grid">
              {otherReviews.map((item) => (
                <ReviewsIndexCard key={item.id} review={item} />
              ))}
            </div>
            {hasMoreOtherReviews ? (
              <button
                className="site-review-page__load-more"
                onClick={() => setIsMoreOtherReviewsVisible(true)}
                type="button"
              >
                загрузить ещё
              </button>
            ) : null}
          </section>
        ) : null}

        <section className="site-course-reviews-page__directions" aria-label="Другие направления">
          <h2>о каком направлении ещё хотите почитать?</h2>
          <div>
            {directions.map((direction) => (
              <button
                data-reviews-direction={direction.key}
                key={direction.key}
                onClick={() => onReviewsDirection(direction.key)}
                type="button"
              >
                {direction.label}
              </button>
            ))}
          </div>
        </section>
      </div>
      <SiteFooter isMobile={isMobile} scale={headerScale} />
    </section>
  );
}

function ReviewStoryPage({
  storyKey,
  onBack,
  onHome,
  headerScale,
  isMobile,
  isConsultPrimed,
}: {
  storyKey: ReviewStoryKey;
  onBack: () => void;
  onHome: () => void;
  headerScale: number;
  isMobile: boolean;
  isConsultPrimed: boolean;
}) {
  const story = REVIEW_STORIES[storyKey];
  const sections = getStorySections(storyKey);
  const otherStories = REVIEW_STORY_ORDER.filter((key) => key !== storyKey);

  return (
    <section className="site-review-page" aria-label={`История ${story.name}`}>
      <img alt="" className="site-review-page__bg" src={reviewStoryCollaborationUrl} />
      <MainScreenHeaderSurface isMobile={isMobile} scale={headerScale} />

      <div className="site-review-page__inner">
        <div className="site-review-page__top">
          <button className="site-review-page__back" onClick={onBack} type="button">
            <span aria-hidden="true">←</span>
            <span>назад</span>
          </button>
          <div className="site-review-page__crumbs">
            <button onClick={onHome} type="button">главная</button>
            <span aria-hidden="true">/</span>
            <strong>отзыв</strong>
          </div>
        </div>

        <div className="site-review-page__title">
          <h1>
            <span>{`История ${story.storyTitleName}:`}</span>
            <strong>{story.pageTitle}</strong>
          </h1>
        </div>

        <div className="site-review-page__hero">
          <img alt={`${story.name}, ученик ИННОПРОГ`} title={`${story.name}, ученик ИННОПРОГ`} src={story.hero} />
        </div>

        <blockquote className="site-review-page__quote">{story.heroQuote}</blockquote>

        <div className="site-review-page__content">
          <aside className="site-review-page__summary" aria-label="Кратко о результате">
            <h2>Кратко о результате</h2>
            <dl>
              <div>
                <dt>Город</dt>
                <dd>{story.city}</dd>
              </div>
              <div>
                <dt>формат</dt>
                <dd>{story.format}</dd>
              </div>
              <div>
                <dt>срок</dt>
                <dd>{story.period}</dd>
              </div>
              <div>
                <dt>результат</dt>
                <dd>{story.result}</dd>
              </div>
            </dl>
            <button type="button">хочу такой же результат</button>
          </aside>

          <article className="site-review-page__article">
            {sections.map((section) => (
              <section key={section.title}>
                <h2>{section.title}</h2>
                {section.body.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </section>
            ))}
          </article>
        </div>

        <section
          className="site-review-page__free"
          data-active={isConsultPrimed ? "true" : undefined}
          data-review-consult-block
          role={isMobile ? "button" : undefined}
          tabIndex={isMobile ? 0 : undefined}
        >
          <div>
            <h2>Попробуйте себя в новой профессии бесплатно</h2>
            <p>Получите вводный план по профессии, первый практический кейс и рекомендации по развитию навыков</p>
          </div>
        </section>
        <button
          className="site-review-page__consult"
          data-review-consult
          data-review-consult-ready={isConsultPrimed ? "true" : undefined}
          type="button"
        >
          получить консультацию
        </button>

        <section className="site-review-page__other" aria-label="Другие истории">
          <h2>Другие истории</h2>
          <div className="site-review-page__other-grid">
            {otherStories.map((item) => (
              <RelatedReviewCard key={item} storyKey={item} />
            ))}
          </div>
        </section>
      </div>

      <SiteFooter isMobile={isMobile} scale={headerScale} />
    </section>
  );
}

function AboutPage({
  onBack,
  onHome,
  contentScale,
  headerScale,
  isMobile,
}: {
  onBack: () => void;
  onHome: () => void;
  contentScale: number;
  headerScale: number;
  isMobile: boolean;
}) {
  const aboutCanvasStyle = {
    width: isMobile ? "100%" : `${ABOUT_DESIGN_WIDTH}px`,
    zoom: isMobile ? undefined : contentScale,
  } as CSSProperties & { zoom?: number };

  return (
    <>
      <MainScreenHeaderSurface isMobile={isMobile} scale={headerScale} />
      <div className="site-about-scale-shell" style={aboutCanvasStyle}>
      <section className="site-about-page" aria-label="О нас">
        <div className="site-about-page__top">
          <button className="site-review-page__back" onClick={onBack} type="button">
            <span aria-hidden="true">←</span>
            <span>назад</span>
          </button>
          <div className="site-review-page__crumbs">
            <button onClick={onHome} type="button">главная</button>
            <span aria-hidden="true">/</span>
            <strong>о нас</strong>
          </div>
        </div>

        <section className="site-about-hero">
          <img
            alt="Команда и миссия онлайн-школы программирования ИННОПРОГ" title="Команда и миссия онлайн-школы программирования ИННОПРОГ"
            decoding="async"
            fetchPriority="high"
            height={700}
            src={aboutHeroUrl}
            width={1280}
          />
          <h1>
            <span>Кто мы?</span>
            <span>наша миссия?</span>
          </h1>
        </section>

        <main className="site-about-content">
          <section className="site-about-intro">
            <p className="site-about-kicker">ИННОПРОГ</p>
            <p>
              <strong>
                {" — современная образовательная онлайн-платформа, ориентированная на подготовку будущих"}
                <br />
                {" ИТ-специалистов для отечественного рынка"}
              </strong>
            </p>
          </section>

          <section className="site-about-cards" aria-label="Подход ИННОПРОГ">
            <article className="site-about-card site-about-card--dark">
              <p>Мы сочетаем:</p>
              <ul>
                <li>системный подход</li>
                <li>опыт экспертов</li>
                <li>практическую подготовку</li>
                <li>индивидуальную работу</li>
              </ul>
              <p>с каждым учеником</p>
              <p>Помогаем осваивать востребованные ИТ-направления, получать актуальные навыки и формировать прочную базу для дальнейшего профессионального развития</p>
            </article>

            <div className="site-about-swirl" aria-hidden="true">
              <img alt="" decoding="async" height={487} loading="lazy" src={aboutSwirlUrl} width={302} />
            </div>

            <article className="site-about-card site-about-card--purple">
              <p>Мы стремимся сделать качественное ИТ-образование доступным, понятным и по-настоящему полезным для тех, кто хочет уверенно развиваться в сфере технологий</p>
              <p>В основе нашего подхода — последовательное обучение, адаптация программы под уровень и цели ученика, а также внимание к практическому применению знаний</p>
            </article>
          </section>

          <section className="site-about-mission">
            <div>
              <h2>наша миссия:</h2>
              <p>Дать ученикам не только теоретическую основу, но и реальные инструменты для дальнейшего роста: от первых шагов в программировании до более уверенного освоения прикладных навыков, необходимых для учебы, собственных проектов и будущей профессиональной реализации</p>
            </div>
            <p>Мы помогаем каждому ученику выстраивать сильную базу, постепенно углублять знания и двигаться вперед в комфортном, но системном формате</p>
          </section>

          <section className="site-about-tags" aria-label="ИННОПРОГ объединяет">
            <h2>ИННОПРОГ объединяет:</h2>
            <div>
              <span>современные направления обучения</span>
              <span>поддержку наставников</span>
              <span>ориентацию на результат</span>
            </div>
          </section>

          <section className="site-about-city">
            <h2>Мы из Иннополиса</h2>
            <div>
              <img
                alt="Иннополис" title="Иннополис"
                decoding="async"
                height={468}
                loading="lazy"
                src={aboutInnopolisUrl}
                width={791}
              />
              <div>
                <p>Наше сотрудничество с Иннополисом базируется на реализации эффективного образовательного процесса ИННОПРОГ</p>
                <p>Совместные усилия дают возможность для развития образовательной платформы и её методических материалов, а также использования современных методов обучения</p>
              </div>
            </div>
          </section>

          <section className="site-about-legal">
            <h2>правовая информация</h2>
            <div className="site-about-legal__links">
              <div>
                <a href="https://api.innoprog.ru/files/documents/contract_offer.pdf" rel="noopener noreferrer" target="_blank">Публичная оферта на заключение договора оказания платных образовательных услуг</a>
                <a href="https://api.innoprog.ru/files/documents/privacy_policy.pdf" rel="noopener noreferrer" target="_blank">Политика оператора в отношении обработки персональных данных</a>
                <a href="https://api.innoprog.ru/files/documents/consent_to_personal_data_processing.pdf" rel="noopener noreferrer" target="_blank">Согласие на обработку персональных данных</a>
              </div>
              <div>
                <a href="https://api.innoprog.ru/files/documents/license.pdf" rel="noopener noreferrer" target="_blank">Выписка из реестра лицензий на образовательную деятельность</a>
                <a href="https://api.innoprog.ru/files/documents/consent_advertising_and_information_mailings.pdf" rel="noopener noreferrer" target="_blank">Согласие на получение рекламной и информационной рассылки</a>
              </div>
            </div>
            <p>Локальные нормативные документы и иные документы, связанные с образовательной деятельностью, предоставляются для ознакомления по запросу, направленному на электронную почту: <strong>education@innoprog.ru</strong></p>
          </section>
        </main>
      </section>
      </div>
      <SiteFooter isMobile={isMobile} scale={headerScale} />
    </>
  );
}

function TariffFeature({
  included,
  text,
}: {
  included: boolean;
  text: string;
}) {
  return (
    <li className={included ? "site-tariffs-card__feature" : "site-tariffs-card__feature site-tariffs-card__feature--muted"}>
      <span aria-hidden="true" className="site-tariffs-card__feature-icon">
        {included ? "✓" : "-"}
      </span>
      <span>{text}</span>
    </li>
  );
}

function TariffsPage({
  headerScale,
  isMobile,
}: {
  headerScale: number;
  isMobile: boolean;
}) {
  const tariffCanvasRef = useRef<HTMLDivElement | null>(null);
  const [tariffCanvasHeight, setTariffCanvasHeight] = useState(0);
  const tariffDesignWidth = isMobile ? MOBILE_DESIGN.width : DESKTOP_DESIGN.width;
  const tariffContentShellStyle = isMobile
    ? { height: `${Math.ceil((tariffCanvasHeight || 3300) * headerScale)}px` }
    : undefined;
  const tariffContentCanvasStyle = isMobile
    ? {
      width: `${tariffDesignWidth}px`,
      transform: `scale(${headerScale})`,
    }
    : {
      width: `${tariffDesignWidth}px`,
      zoom: headerScale,
    } as CSSProperties & { zoom?: number };

  useEffect(() => {
    const canvas = tariffCanvasRef.current;

    if (!canvas || !isMobile) {
      return;
    }

    const updateHeight = () => {
      setTariffCanvasHeight(canvas.scrollHeight);
    };

    updateHeight();

    if (typeof ResizeObserver === "undefined") {
      window.addEventListener("resize", updateHeight);

      return () => {
        window.removeEventListener("resize", updateHeight);
      };
    }

    const observer = new ResizeObserver(updateHeight);
    observer.observe(canvas);

    return () => {
      observer.disconnect();
    };
  }, [headerScale, isMobile]);

  return (
    <section className="site-tariffs-page" aria-label="Стоимость обучения">
      <MainScreenHeaderSurface isMobile={isMobile} scale={headerScale} />
      <div className="site-tariffs-page__content-shell" style={tariffContentShellStyle}>
        <div
          className="site-tariffs-page__content-canvas"
          ref={tariffCanvasRef}
          style={tariffContentCanvasStyle}
        >
          <div className="site-tariffs-page__inner">
            <header className="site-tariffs-page__title">
              <h1>
                <span>Выгодные</span>
                <strong>условия оплаты</strong>
              </h1>
            </header>

            <section className="site-tariffs-page__conditions" aria-label="Условия оплаты">
              <article>
                <h2>Оплата<br />по факту обучения</h2>
                <p>Без кредитов, рассрочек и скрытых обязательств</p>
              </article>
              <article>
                <h2>Можно вернуть<br />до 13% от цены курса</h2>
                <p>Воспользуйтесь налоговым вычетом</p>
              </article>
            </section>

            <section className="site-tariffs-page__cards" aria-label="Список тарифов">
              {TARIFFS.map((tariff) => (
                <article
                  className={[
                    "site-tariffs-card",
                    tariff.accent === "purple" ? "site-tariffs-card--purple" : "site-tariffs-card--dark",
                  ].join(" ")}
                  key={tariff.name}
                >
                  <h2>{tariff.name}</h2>
                  <div className="site-tariffs-card__price">
                    <div>
                      <span className="site-tariffs-card__old-price">{tariff.oldPrice}</span>
                      <span className="site-tariffs-card__discount">{tariff.discount}</span>
                    </div>
                    <strong>{tariff.price}</strong>
                  </div>
                  <button className="site-tariffs-card__button" type="button">записаться</button>
                  <ul>
                    {tariff.features.map((feature) => (
                      <TariffFeature
                        included={feature.included}
                        key={`${tariff.name}-${feature.text}`}
                        text={feature.text}
                      />
                    ))}
                  </ul>
                </article>
              ))}
            </section>
          </div>
        </div>
      </div>
      <SiteFooter isMobile={isMobile} scale={headerScale} />
    </section>
  );
}

function PythonCourseHero({ isMobile }: { isMobile: boolean }) {
  return (
    <section className="site-python-course-hero" aria-label="Курс Python-разработчик">
      <div className="site-python-course-hero__copy">
        <p>профессия</p>
        <h1>Python-разработчик</h1>
        <span>
          Практическое обучение программированию с наставником, платформой и поддержкой до результата
        </span>
        <button type="button">начать обучение</button>
      </div>
      <div className="site-python-course-hero__visual" aria-hidden="true">
        <img className="site-python-course-hero__person" src={heroPersonUrl} alt="" />
        <img className="site-python-course-hero__laptop" src={platformLaptopUrl} alt="" />
        <img className="site-python-course-hero__screen" src={platformScreenUrl} alt="" />
      </div>
      <div className="site-python-course-hero__facts" aria-label="Ключевые особенности курса">
        {(isMobile
          ? ["практика на платформе", "40+ встреч с наставником", "диплом после обучения"]
          : ["практика на платформе", "40+ персональных встреч", "диплом после обучения"]
        ).map((fact) => (
          <span key={fact}>{fact}</span>
        ))}
      </div>
    </section>
  );
}

function PythonCoursePage({
  headerScale,
  isMobile,
  isMetrikaSelectorMode,
}: {
  headerScale: number;
  isMobile: boolean;
  isMetrikaSelectorMode: boolean;
}) {
  const courseCanvasRef = useRef<HTMLDivElement | null>(null);
  const [courseCanvasHeight, setCourseCanvasHeight] = useState(0);
  const courseDesignWidth = isMobile ? MOBILE_DESIGN.width : DESKTOP_DESIGN.width;
  const courseContentShellStyle = isMobile
    ? {
      height: `${Math.ceil((courseCanvasHeight || 9400) * headerScale)}px`,
      marginTop: 0,
    }
    : isMetrikaSelectorMode
      ? {
        height: `${Math.ceil((courseCanvasHeight || 9400) * headerScale)}px`,
        marginTop: 0,
      }
    : undefined;
  const courseContentCanvasStyle = isMobile
    ? {
      width: `${courseDesignWidth}px`,
      transform: `scale(${headerScale})`,
    }
    : isMetrikaSelectorMode
      ? {
        width: `${courseDesignWidth}px`,
        transform: `scale(${headerScale})`,
        transformOrigin: "top left",
      }
    : {
      width: `${courseDesignWidth}px`,
      zoom: headerScale,
    } as CSSProperties & { zoom?: number };
  useCourseReviewDirection(courseCanvasRef, "python");

  useEffect(() => {
    const canvas = courseCanvasRef.current;

    if (!canvas || (!isMobile && !isMetrikaSelectorMode)) {
      return;
    }

    const updateHeight = () => {
      setCourseCanvasHeight(canvas.scrollHeight);
    };

    updateHeight();

    if (typeof ResizeObserver === "undefined") {
      window.addEventListener("resize", updateHeight);

      return () => {
        window.removeEventListener("resize", updateHeight);
      };
    }

    const observer = new ResizeObserver(updateHeight);
    observer.observe(canvas);

    return () => {
      observer.disconnect();
    };
  }, [headerScale, isMobile, isMetrikaSelectorMode]);

  useEffect(() => {
    const canvas = courseCanvasRef.current;

    if (!canvas) {
      return;
    }

    const tuneMedia = () => {
      const preloadLine = (window.innerHeight || 900) * 1.25;

      canvas.querySelectorAll<HTMLImageElement>("img").forEach((image) => {
        image.decoding = "async";
        const imageTop = image.getBoundingClientRect().top;

        if (image.closest(".site-course-project-visual, .site-course-mobile-project-visual")) {
          if (imageTop <= preloadLine) {
            image.loading = "eager";
            image.setAttribute("fetchpriority", "high");
          } else {
            image.loading = "lazy";
            image.setAttribute("fetchpriority", "low");
          }

          return;
        }

        if (imageTop > preloadLine) {
          image.loading = "lazy";
          image.setAttribute("fetchpriority", "low");
        }
      });
    };

    tuneMedia();

    const refreshId = window.setTimeout(tuneMedia, 250);
    const videoCleanups = new Map<HTMLVideoElement, () => void>();

    const playVideo = (video: HTMLVideoElement) => {
      video.autoplay = true;
      video.muted = true;
      video.defaultMuted = true;
      video.loop = true;
      video.playsInline = true;
      video.preload = "auto";
      video.setAttribute("autoplay", "");
      video.setAttribute("loop", "");
      video.setAttribute("muted", "");
      video.setAttribute("playsinline", "");
      video.setAttribute("webkit-playsinline", "");
      void video.play().catch(() => undefined);
    };

    const schedulePlay = (video: HTMLVideoElement) => {
      playVideo(video);
      window.requestAnimationFrame(() => playVideo(video));
      window.setTimeout(() => playVideo(video), 250);
      window.setTimeout(() => playVideo(video), 1000);
    };

    const observer = typeof IntersectionObserver === "undefined" ? null : new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const video = entry.target as HTMLVideoElement;

        if (video.hasAttribute("data-course-autoplay-video")) {
          void video.play().catch(() => undefined);
          return;
        }

        if (entry.isIntersecting) {
          void video.play().catch(() => undefined);
          return;
        }

        video.pause();
      });
    }, { rootMargin: "320px 0px", threshold: 0.01 });

    const configureVideo = (video: HTMLVideoElement) => {
      if (videoCleanups.has(video)) {
        schedulePlay(video);
        return;
      }

      const retry = () => schedulePlay(video);

      video.addEventListener("loadeddata", retry);
      video.addEventListener("canplay", retry);
      video.addEventListener("canplaythrough", retry);
      observer?.observe(video);
      schedulePlay(video);

      videoCleanups.set(video, () => {
        video.removeEventListener("loadeddata", retry);
        video.removeEventListener("canplay", retry);
        video.removeEventListener("canplaythrough", retry);
        observer?.unobserve(video);
      });
    };

    const configureVideos = () => {
      canvas.querySelectorAll<HTMLVideoElement>("video").forEach(configureVideo);
    };

    configureVideos();

    const retryIds = [
      window.setTimeout(configureVideos, 500),
      window.setTimeout(configureVideos, 1500),
    ];

    const mutationObserver = typeof MutationObserver === "undefined" ? null : new MutationObserver(configureVideos);
    mutationObserver?.observe(canvas, { childList: true, subtree: true });

    const resumeVideos = () => {
      if (!document.hidden) {
        configureVideos();
      }
    };

    document.addEventListener("visibilitychange", resumeVideos);
    window.addEventListener("focus", configureVideos);

    return () => {
      window.clearTimeout(refreshId);
      retryIds.forEach((retryId) => window.clearTimeout(retryId));
      document.removeEventListener("visibilitychange", resumeVideos);
      window.removeEventListener("focus", configureVideos);
      mutationObserver?.disconnect();
      videoCleanups.forEach((cleanup) => cleanup());
      videoCleanups.clear();
      observer?.disconnect();
    };
  }, [headerScale, isMobile]);

  return (
    <section className="site-python-course-page" aria-label="Python-разработчик">
      <MainScreenHeaderSurface isMobile={isMobile} scale={headerScale} />
      <div className="site-python-course-page__content-shell" style={courseContentShellStyle}>
        <div
          className="site-python-course-page__content-canvas"
          ref={courseCanvasRef}
          style={courseContentCanvasStyle}
        >
          <div className="site-python-course-page__inner">
            {isMobile ? (
              <PythonCourseMobile />
            ) : (
              <PythonCourseDesktop />
            )}
          </div>
        </div>
      </div>
      <SiteFooter isMobile={isMobile} scale={headerScale} />
    </section>
  );
}

function DataScienceCourseHero({ isMobile }: { isMobile: boolean }) {
  return (
    <section className="site-python-course-hero" aria-label="Курс Data Science">
      <div className="site-python-course-hero__copy">
        <p>профессия</p>
        <h1>Data Science</h1>
        <span>
          Практическое обучение анализу данных, машинному обучению, Python и SQL с наставником
        </span>
        <button type="button">начать обучение</button>
      </div>
      <div className="site-python-course-hero__visual" aria-hidden="true">
        <img className="site-python-course-hero__person" src={heroPersonUrl} alt="" />
        <img className="site-python-course-hero__laptop" src={platformLaptopUrl} alt="" />
        <img className="site-python-course-hero__screen" src={platformScreenUrl} alt="" />
      </div>
      <div className="site-python-course-hero__facts" aria-label="Ключевые особенности курса">
        {(isMobile
          ? ["560 академических часов", "28 учебных недель", "13 проектных работ"]
          : ["560 академических часов", "28 учебных недель", "13 проектных работ"]
        ).map((fact) => (
          <span key={fact}>{fact}</span>
        ))}
      </div>
    </section>
  );
}

function DataScienceCoursePage({
  headerScale,
  isMobile,
}: {
  headerScale: number;
  isMobile: boolean;
}) {
  const courseCanvasRef = useRef<HTMLDivElement | null>(null);
  const [courseCanvasHeight, setCourseCanvasHeight] = useState(0);
  const courseDesignWidth = isMobile ? MOBILE_DESIGN.width : DESKTOP_DESIGN.width;
  const courseContentShellStyle = isMobile
    ? {
      height: `${Math.ceil((courseCanvasHeight || 9400) * headerScale)}px`,
      marginTop: 0,
    }
    : undefined;
  const courseContentCanvasStyle = isMobile
    ? {
      width: `${courseDesignWidth}px`,
      transform: `scale(${headerScale})`,
    }
    : {
      width: `${courseDesignWidth}px`,
      zoom: headerScale,
    } as CSSProperties & { zoom?: number };
  useCourseReviewDirection(courseCanvasRef, "data-science");

  useEffect(() => {
    const canvas = courseCanvasRef.current;

    if (!canvas || !isMobile) {
      return;
    }

    const updateHeight = () => {
      setCourseCanvasHeight(canvas.scrollHeight);
    };

    updateHeight();

    if (typeof ResizeObserver === "undefined") {
      window.addEventListener("resize", updateHeight);

      return () => {
        window.removeEventListener("resize", updateHeight);
      };
    }

    const observer = new ResizeObserver(updateHeight);
    observer.observe(canvas);

    return () => {
      observer.disconnect();
    };
  }, [headerScale, isMobile]);

  useEffect(() => {
    const canvas = courseCanvasRef.current;

    if (!canvas) {
      return;
    }

    const tuneMedia = () => {
      const preloadLine = (window.innerHeight || 900) * 1.25;

      canvas.querySelectorAll<HTMLImageElement>("img").forEach((image) => {
        image.decoding = "async";
        const imageTop = image.getBoundingClientRect().top;

        if (image.closest(".site-course-project-visual, .site-course-mobile-project-visual")) {
          if (imageTop <= preloadLine) {
            image.loading = "eager";
            image.setAttribute("fetchpriority", "high");
          } else {
            image.loading = "lazy";
            image.setAttribute("fetchpriority", "low");
          }

          return;
        }

        if (imageTop > preloadLine) {
          image.loading = "lazy";
          image.setAttribute("fetchpriority", "low");
        }
      });
    };

    tuneMedia();

    const refreshId = window.setTimeout(tuneMedia, 250);
    const videoCleanups = new Map<HTMLVideoElement, () => void>();

    const playVideo = (video: HTMLVideoElement) => {
      video.autoplay = true;
      video.muted = true;
      video.defaultMuted = true;
      video.loop = true;
      video.playsInline = true;
      video.preload = "auto";
      video.setAttribute("autoplay", "");
      video.setAttribute("loop", "");
      video.setAttribute("muted", "");
      video.setAttribute("playsinline", "");
      video.setAttribute("webkit-playsinline", "");
      void video.play().catch(() => undefined);
    };

    const schedulePlay = (video: HTMLVideoElement) => {
      playVideo(video);
      window.requestAnimationFrame(() => playVideo(video));
      window.setTimeout(() => playVideo(video), 250);
      window.setTimeout(() => playVideo(video), 1000);
    };

    const observer = typeof IntersectionObserver === "undefined" ? null : new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const video = entry.target as HTMLVideoElement;

        if (video.hasAttribute("data-course-autoplay-video")) {
          void video.play().catch(() => undefined);
          return;
        }

        if (entry.isIntersecting) {
          void video.play().catch(() => undefined);
          return;
        }

        video.pause();
      });
    }, { rootMargin: "320px 0px", threshold: 0.01 });

    const configureVideo = (video: HTMLVideoElement) => {
      if (videoCleanups.has(video)) {
        schedulePlay(video);
        return;
      }

      const retry = () => schedulePlay(video);

      video.addEventListener("loadeddata", retry);
      video.addEventListener("canplay", retry);
      video.addEventListener("canplaythrough", retry);
      observer?.observe(video);
      schedulePlay(video);

      videoCleanups.set(video, () => {
        video.removeEventListener("loadeddata", retry);
        video.removeEventListener("canplay", retry);
        video.removeEventListener("canplaythrough", retry);
        observer?.unobserve(video);
      });
    };

    const configureVideos = () => {
      canvas.querySelectorAll<HTMLVideoElement>("video").forEach(configureVideo);
    };

    configureVideos();

    const retryIds = [
      window.setTimeout(configureVideos, 500),
      window.setTimeout(configureVideos, 1500),
    ];

    const mutationObserver = typeof MutationObserver === "undefined" ? null : new MutationObserver(configureVideos);
    mutationObserver?.observe(canvas, { childList: true, subtree: true });

    const resumeVideos = () => {
      if (!document.hidden) {
        configureVideos();
      }
    };

    document.addEventListener("visibilitychange", resumeVideos);
    window.addEventListener("focus", configureVideos);

    return () => {
      window.clearTimeout(refreshId);
      retryIds.forEach((retryId) => window.clearTimeout(retryId));
      document.removeEventListener("visibilitychange", resumeVideos);
      window.removeEventListener("focus", configureVideos);
      mutationObserver?.disconnect();
      videoCleanups.forEach((cleanup) => cleanup());
      videoCleanups.clear();
      observer?.disconnect();
    };
  }, [headerScale, isMobile]);

  return (
    <section className="site-python-course-page" aria-label="Data Science">
      <MainScreenHeaderSurface isMobile={isMobile} scale={headerScale} />
      <div className="site-python-course-page__content-shell" style={courseContentShellStyle}>
        <div
          className="site-python-course-page__content-canvas"
          ref={courseCanvasRef}
          style={courseContentCanvasStyle}
        >
          <div className="site-python-course-page__inner">
            {isMobile ? (
              <DataScienceCourseMobile />
            ) : (
              <DataScienceCourseDesktop />
            )}
          </div>
        </div>
      </div>
      <SiteFooter isMobile={isMobile} scale={headerScale} />
    </section>
  );
}

function FrontendCoursePage({
  headerScale,
  isMobile,
}: {
  headerScale: number;
  isMobile: boolean;
}) {
  const courseCanvasRef = useRef<HTMLDivElement | null>(null);
  const [courseCanvasHeight, setCourseCanvasHeight] = useState(0);
  const courseDesignWidth = isMobile ? MOBILE_DESIGN.width : DESKTOP_DESIGN.width;
  const courseContentShellStyle = isMobile
    ? {
      height: `${Math.ceil((courseCanvasHeight || 9400) * headerScale)}px`,
      marginTop: 0,
    }
    : undefined;
  const courseContentCanvasStyle = isMobile
    ? {
      width: `${courseDesignWidth}px`,
      transform: `scale(${headerScale})`,
    }
    : {
      width: `${courseDesignWidth}px`,
      zoom: headerScale,
    } as CSSProperties & { zoom?: number };
  useCourseReviewDirection(courseCanvasRef, "frontend");

  useEffect(() => {
    const canvas = courseCanvasRef.current;

    if (!canvas || !isMobile) {
      return;
    }

    const updateHeight = () => {
      setCourseCanvasHeight(canvas.scrollHeight);
    };

    updateHeight();

    if (typeof ResizeObserver === "undefined") {
      window.addEventListener("resize", updateHeight);

      return () => {
        window.removeEventListener("resize", updateHeight);
      };
    }

    const observer = new ResizeObserver(updateHeight);
    observer.observe(canvas);

    return () => {
      observer.disconnect();
    };
  }, [headerScale, isMobile]);

  useEffect(() => {
    const canvas = courseCanvasRef.current;

    if (!canvas) {
      return;
    }

    const tuneMedia = () => {
      const preloadLine = (window.innerHeight || 900) * 1.25;

      canvas.querySelectorAll<HTMLImageElement>("img").forEach((image) => {
        image.decoding = "async";
        const imageTop = image.getBoundingClientRect().top;

        if (image.closest(".site-course-project-visual, .site-course-mobile-project-visual")) {
          if (imageTop <= preloadLine) {
            image.loading = "eager";
            image.setAttribute("fetchpriority", "high");
          } else {
            image.loading = "lazy";
            image.setAttribute("fetchpriority", "low");
          }

          return;
        }

        if (imageTop > preloadLine) {
          image.loading = "lazy";
          image.setAttribute("fetchpriority", "low");
        }
      });
    };

    tuneMedia();
    const refreshId = window.setTimeout(tuneMedia, 250);

    return () => {
      window.clearTimeout(refreshId);
    };
  }, [headerScale, isMobile]);

  return (
    <section className="site-python-course-page" aria-label="Frontend-разработчик">
      <MainScreenHeaderSurface isMobile={isMobile} scale={headerScale} />
      <div className="site-python-course-page__content-shell" style={courseContentShellStyle}>
        <div
          className="site-python-course-page__content-canvas"
          ref={courseCanvasRef}
          style={courseContentCanvasStyle}
        >
          <div className="site-python-course-page__inner">
            {isMobile ? (
              <FrontendCourseMobile />
            ) : (
              <FrontendCourseDesktop />
            )}
          </div>
        </div>
      </div>
      <SiteFooter isMobile={isMobile} scale={headerScale} />
    </section>
  );
}

function DataAnalystCoursePage({
  headerScale,
  isMobile,
}: {
  headerScale: number;
  isMobile: boolean;
}) {
  const courseCanvasRef = useRef<HTMLDivElement | null>(null);
  const [courseCanvasHeight, setCourseCanvasHeight] = useState(0);
  const courseDesignWidth = isMobile ? MOBILE_DESIGN.width : DESKTOP_DESIGN.width;
  const courseContentShellStyle = isMobile
    ? {
      height: `${Math.ceil((courseCanvasHeight || 9400) * headerScale)}px`,
      marginTop: 0,
    }
    : undefined;
  const courseContentCanvasStyle = isMobile
    ? {
      width: `${courseDesignWidth}px`,
      transform: `scale(${headerScale})`,
    }
    : {
      width: `${courseDesignWidth}px`,
      zoom: headerScale,
    } as CSSProperties & { zoom?: number };
  useCourseReviewDirection(courseCanvasRef, "data-science");

  useEffect(() => {
    const canvas = courseCanvasRef.current;

    if (!canvas || !isMobile) {
      return;
    }

    const updateHeight = () => {
      setCourseCanvasHeight(canvas.scrollHeight);
    };

    updateHeight();

    if (typeof ResizeObserver === "undefined") {
      window.addEventListener("resize", updateHeight);

      return () => {
        window.removeEventListener("resize", updateHeight);
      };
    }

    const observer = new ResizeObserver(updateHeight);
    observer.observe(canvas);

    return () => {
      observer.disconnect();
    };
  }, [headerScale, isMobile]);

  useEffect(() => {
    const canvas = courseCanvasRef.current;

    if (!canvas) {
      return;
    }

    const tuneMedia = () => {
      const preloadLine = (window.innerHeight || 900) * 1.25;

      canvas.querySelectorAll<HTMLImageElement>("img").forEach((image) => {
        image.decoding = "async";
        const imageTop = image.getBoundingClientRect().top;

        if (image.closest(".site-course-project-visual, .site-course-mobile-project-visual")) {
          if (imageTop <= preloadLine) {
            image.loading = "eager";
            image.setAttribute("fetchpriority", "high");
          } else {
            image.loading = "lazy";
            image.setAttribute("fetchpriority", "low");
          }

          return;
        }

        if (imageTop > preloadLine) {
          image.loading = "lazy";
          image.setAttribute("fetchpriority", "low");
        }
      });
    };

    tuneMedia();
    const refreshId = window.setTimeout(tuneMedia, 250);

    return () => {
      window.clearTimeout(refreshId);
    };
  }, [headerScale, isMobile]);

  return (
    <section className="site-python-course-page" aria-label="Data-аналитик">
      <MainScreenHeaderSurface isMobile={isMobile} scale={headerScale} />
      <div className="site-python-course-page__content-shell" style={courseContentShellStyle}>
        <div
          className="site-python-course-page__content-canvas"
          ref={courseCanvasRef}
          style={courseContentCanvasStyle}
        >
          <div className="site-python-course-page__inner">
            {isMobile ? (
              <DataAnalystCourseMobile />
            ) : (
              <DataAnalystCourseDesktop />
            )}
          </div>
        </div>
      </div>
      <SiteFooter isMobile={isMobile} scale={headerScale} />
    </section>
  );
}

function CppCoursePage({
  headerScale,
  isMobile,
}: {
  headerScale: number;
  isMobile: boolean;
}) {
  const courseCanvasRef = useRef<HTMLDivElement | null>(null);
  const [courseCanvasHeight, setCourseCanvasHeight] = useState(0);
  const courseDesignWidth = isMobile ? MOBILE_DESIGN.width : DESKTOP_DESIGN.width;
  const courseContentShellStyle = isMobile
    ? {
      height: `${Math.ceil((courseCanvasHeight || 9400) * headerScale)}px`,
      marginTop: 0,
    }
    : undefined;
  const courseContentCanvasStyle = isMobile
    ? {
      width: `${courseDesignWidth}px`,
      transform: `scale(${headerScale})`,
    }
    : {
      width: `${courseDesignWidth}px`,
      zoom: headerScale,
    } as CSSProperties & { zoom?: number };
  useCourseReviewDirection(courseCanvasRef, "cpp");

  useEffect(() => {
    const canvas = courseCanvasRef.current;

    if (!canvas || !isMobile) {
      return;
    }

    const updateHeight = () => {
      setCourseCanvasHeight(canvas.scrollHeight);
    };

    updateHeight();

    if (typeof ResizeObserver === "undefined") {
      window.addEventListener("resize", updateHeight);

      return () => {
        window.removeEventListener("resize", updateHeight);
      };
    }

    const observer = new ResizeObserver(updateHeight);
    observer.observe(canvas);

    return () => {
      observer.disconnect();
    };
  }, [headerScale, isMobile]);

  useEffect(() => {
    const canvas = courseCanvasRef.current;

    if (!canvas) {
      return;
    }

    const tuneMedia = () => {
      const preloadLine = (window.innerHeight || 900) * 1.25;

      canvas.querySelectorAll<HTMLImageElement>("img").forEach((image) => {
        image.decoding = "async";
        const imageTop = image.getBoundingClientRect().top;

        if (image.closest(".site-course-project-visual, .site-course-mobile-project-visual")) {
          if (imageTop <= preloadLine) {
            image.loading = "eager";
            image.setAttribute("fetchpriority", "high");
          } else {
            image.loading = "lazy";
            image.setAttribute("fetchpriority", "low");
          }

          return;
        }

        if (imageTop > preloadLine) {
          image.loading = "lazy";
          image.setAttribute("fetchpriority", "low");
        }
      });
    };

    tuneMedia();
    const refreshId = window.setTimeout(tuneMedia, 250);

    return () => {
      window.clearTimeout(refreshId);
    };
  }, [headerScale, isMobile]);

  return (
    <section className="site-python-course-page" aria-label="C++ разработчик">
      <MainScreenHeaderSurface isMobile={isMobile} scale={headerScale} />
      <div className="site-python-course-page__content-shell" style={courseContentShellStyle}>
        <div
          className="site-python-course-page__content-canvas"
          ref={courseCanvasRef}
          style={courseContentCanvasStyle}
        >
          <div className="site-python-course-page__inner">
            {isMobile ? (
              <CppCourseMobile />
            ) : (
              <CppCourseDesktop />
            )}
          </div>
        </div>
      </div>
      <SiteFooter isMobile={isMobile} scale={headerScale} />
    </section>
  );
}

function MobileDeveloperCoursePage({
  headerScale,
  isMobile,
}: {
  headerScale: number;
  isMobile: boolean;
}) {
  const courseCanvasRef = useRef<HTMLDivElement | null>(null);
  const [courseCanvasHeight, setCourseCanvasHeight] = useState(0);
  const courseDesignWidth = isMobile ? MOBILE_DESIGN.width : DESKTOP_DESIGN.width;
  const courseContentShellStyle = isMobile
    ? {
      height: `${Math.ceil((courseCanvasHeight || 9400) * headerScale)}px`,
      marginTop: 0,
    }
    : undefined;
  const courseContentCanvasStyle = isMobile
    ? {
      width: `${courseDesignWidth}px`,
      transform: `scale(${headerScale})`,
    }
    : {
      width: `${courseDesignWidth}px`,
      zoom: headerScale,
    } as CSSProperties & { zoom?: number };
  useCourseReviewDirection(courseCanvasRef, "mobile");

  useEffect(() => {
    const canvas = courseCanvasRef.current;

    if (!canvas || !isMobile) {
      return;
    }

    const updateHeight = () => {
      setCourseCanvasHeight(canvas.scrollHeight);
    };

    updateHeight();

    if (typeof ResizeObserver === "undefined") {
      window.addEventListener("resize", updateHeight);

      return () => {
        window.removeEventListener("resize", updateHeight);
      };
    }

    const observer = new ResizeObserver(updateHeight);
    observer.observe(canvas);

    return () => {
      observer.disconnect();
    };
  }, [headerScale, isMobile]);

  useEffect(() => {
    const canvas = courseCanvasRef.current;

    if (!canvas) {
      return;
    }

    const tuneMedia = () => {
      const preloadLine = (window.innerHeight || 900) * 1.25;

      canvas.querySelectorAll<HTMLImageElement>("img").forEach((image) => {
        image.decoding = "async";
        const imageTop = image.getBoundingClientRect().top;

        if (image.closest(".site-course-project-visual, .site-course-mobile-project-visual")) {
          if (imageTop <= preloadLine) {
            image.loading = "eager";
            image.setAttribute("fetchpriority", "high");
          } else {
            image.loading = "lazy";
            image.setAttribute("fetchpriority", "low");
          }

          return;
        }

        if (imageTop > preloadLine) {
          image.loading = "lazy";
          image.setAttribute("fetchpriority", "low");
        }
      });
    };

    tuneMedia();
    const refreshId = window.setTimeout(tuneMedia, 250);

    return () => {
      window.clearTimeout(refreshId);
    };
  }, [headerScale, isMobile]);

  return (
    <section className="site-python-course-page" aria-label="Мобильный разработчик">
      <MainScreenHeaderSurface isMobile={isMobile} scale={headerScale} />
      <div className="site-python-course-page__content-shell" style={courseContentShellStyle}>
        <div
          className="site-python-course-page__content-canvas"
          ref={courseCanvasRef}
          style={courseContentCanvasStyle}
        >
          <div className="site-python-course-page__inner">
            {isMobile ? (
              <MobileDeveloperCourseMobile />
            ) : (
              <MobileDeveloperCourseDesktop />
            )}
          </div>
        </div>
      </div>
      <SiteFooter isMobile={isMobile} scale={headerScale} />
    </section>
  );
}

function UnrealEngineCoursePage({
  headerScale,
  isMobile,
}: {
  headerScale: number;
  isMobile: boolean;
}) {
  const courseCanvasRef = useRef<HTMLDivElement | null>(null);
  const [courseCanvasHeight, setCourseCanvasHeight] = useState(0);
  const courseDesignWidth = isMobile ? MOBILE_DESIGN.width : DESKTOP_DESIGN.width;
  const courseContentShellStyle = isMobile
    ? {
      height: `${Math.ceil((courseCanvasHeight || 9400) * headerScale)}px`,
      marginTop: 0,
    }
    : undefined;
  const courseContentCanvasStyle = isMobile
    ? {
      width: `${courseDesignWidth}px`,
      transform: `scale(${headerScale})`,
    }
    : {
      width: `${courseDesignWidth}px`,
      zoom: headerScale,
    } as CSSProperties & { zoom?: number };
  useCourseReviewDirection(courseCanvasRef, "unreal");

  useEffect(() => {
    const canvas = courseCanvasRef.current;

    if (!canvas || !isMobile) {
      return;
    }

    const updateHeight = () => {
      setCourseCanvasHeight(canvas.scrollHeight);
    };

    updateHeight();

    if (typeof ResizeObserver === "undefined") {
      window.addEventListener("resize", updateHeight);

      return () => {
        window.removeEventListener("resize", updateHeight);
      };
    }

    const observer = new ResizeObserver(updateHeight);
    observer.observe(canvas);

    return () => {
      observer.disconnect();
    };
  }, [headerScale, isMobile]);

  useEffect(() => {
    const canvas = courseCanvasRef.current;

    if (!canvas) {
      return;
    }

    const tuneMedia = () => {
      const preloadLine = (window.innerHeight || 900) * 1.25;

      canvas.querySelectorAll<HTMLImageElement>("img").forEach((image) => {
        image.decoding = "async";
        const imageTop = image.getBoundingClientRect().top;

        if (image.closest(".site-course-project-visual, .site-course-mobile-project-visual")) {
          if (imageTop <= preloadLine) {
            image.loading = "eager";
            image.setAttribute("fetchpriority", "high");
          } else {
            image.loading = "lazy";
            image.setAttribute("fetchpriority", "low");
          }

          return;
        }

        if (imageTop > preloadLine) {
          image.loading = "lazy";
          image.setAttribute("fetchpriority", "low");
        }
      });
    };

    tuneMedia();
    const refreshId = window.setTimeout(tuneMedia, 250);

    return () => {
      window.clearTimeout(refreshId);
    };
  }, [headerScale, isMobile]);

  return (
    <section className="site-python-course-page" aria-label="Unreal Engine">
      <MainScreenHeaderSurface isMobile={isMobile} scale={headerScale} />
      <div className="site-python-course-page__content-shell" style={courseContentShellStyle}>
        <div
          className="site-python-course-page__content-canvas"
          ref={courseCanvasRef}
          style={courseContentCanvasStyle}
        >
          <div className="site-python-course-page__inner">
            {isMobile ? (
              <UnrealEngineCourseMobile />
            ) : (
              <UnrealEngineCourseDesktop />
            )}
          </div>
        </div>
      </div>
      <SiteFooter isMobile={isMobile} scale={headerScale} />
    </section>
  );
}

function JavaCoursePage({
  headerScale,
  isMobile,
}: {
  headerScale: number;
  isMobile: boolean;
}) {
  const courseCanvasRef = useRef<HTMLDivElement | null>(null);
  const [courseCanvasHeight, setCourseCanvasHeight] = useState(0);
  const courseDesignWidth = isMobile ? MOBILE_DESIGN.width : DESKTOP_DESIGN.width;
  const courseContentShellStyle = isMobile
    ? {
      height: `${Math.ceil((courseCanvasHeight || 9400) * headerScale)}px`,
      marginTop: 0,
    }
    : undefined;
  const courseContentCanvasStyle = isMobile
    ? {
      width: `${courseDesignWidth}px`,
      transform: `scale(${headerScale})`,
    }
    : {
      width: `${courseDesignWidth}px`,
      zoom: headerScale,
    } as CSSProperties & { zoom?: number };
  useCourseReviewDirection(courseCanvasRef, "java");

  useEffect(() => {
    const canvas = courseCanvasRef.current;

    if (!canvas || !isMobile) {
      return;
    }

    const updateHeight = () => {
      setCourseCanvasHeight(canvas.scrollHeight);
    };

    updateHeight();

    if (typeof ResizeObserver === "undefined") {
      window.addEventListener("resize", updateHeight);

      return () => {
        window.removeEventListener("resize", updateHeight);
      };
    }

    const observer = new ResizeObserver(updateHeight);
    observer.observe(canvas);

    return () => {
      observer.disconnect();
    };
  }, [headerScale, isMobile]);

  useEffect(() => {
    const canvas = courseCanvasRef.current;

    if (!canvas) {
      return;
    }

    const tuneMedia = () => {
      const preloadLine = (window.innerHeight || 900) * 1.25;

      canvas.querySelectorAll<HTMLImageElement>("img").forEach((image) => {
        const box = image.getBoundingClientRect();

        if (box.top < preloadLine) {
          image.loading = "eager";
          image.decoding = "async";
          return;
        }

        image.loading = "lazy";
        image.decoding = "async";
      });
    };

    tuneMedia();
    window.addEventListener("scroll", tuneMedia, { passive: true });
    window.addEventListener("resize", tuneMedia);

    return () => {
      window.removeEventListener("scroll", tuneMedia);
      window.removeEventListener("resize", tuneMedia);
    };
  }, [isMobile]);

  return (
    <section className="site-python-course-page" aria-label="Курс Java-разработчик">
      <MainScreenHeaderSurface isMobile={isMobile} scale={headerScale} />
      <div className="site-python-course-page__content-shell" style={courseContentShellStyle}>
        <div
          className="site-python-course-page__content-canvas"
          ref={courseCanvasRef}
          style={courseContentCanvasStyle}
        >
          <div className="site-python-course-page__inner">
            {isMobile ? (
              <JavaCourseMobile />
            ) : (
              <JavaCourseDesktop />
            )}
          </div>
        </div>
      </div>
      <SiteFooter isMobile={isMobile} scale={headerScale} />
    </section>
  );
}

function MlEngineerCoursePage({
  headerScale,
  isMobile,
}: {
  headerScale: number;
  isMobile: boolean;
}) {
  const courseCanvasRef = useRef<HTMLDivElement | null>(null);
  const [courseCanvasHeight, setCourseCanvasHeight] = useState(0);
  const courseDesignWidth = isMobile ? MOBILE_DESIGN.width : DESKTOP_DESIGN.width;
  const courseContentShellStyle = isMobile
    ? {
      height: `${Math.ceil((courseCanvasHeight || 9400) * headerScale)}px`,
      marginTop: 0,
    }
    : undefined;
  const courseContentCanvasStyle = isMobile
    ? {
      width: `${courseDesignWidth}px`,
      transform: `scale(${headerScale})`,
    }
    : {
      width: `${courseDesignWidth}px`,
      zoom: headerScale,
    } as CSSProperties & { zoom?: number };
  useCourseReviewDirection(courseCanvasRef, "ml");

  useEffect(() => {
    const canvas = courseCanvasRef.current;

    if (!canvas || !isMobile) {
      return;
    }

    const updateHeight = () => {
      setCourseCanvasHeight(canvas.scrollHeight);
    };

    updateHeight();

    if (typeof ResizeObserver === "undefined") {
      window.addEventListener("resize", updateHeight);

      return () => {
        window.removeEventListener("resize", updateHeight);
      };
    }

    const observer = new ResizeObserver(updateHeight);
    observer.observe(canvas);

    return () => {
      observer.disconnect();
    };
  }, [headerScale, isMobile]);

  useEffect(() => {
    const canvas = courseCanvasRef.current;

    if (!canvas) {
      return;
    }

    const tuneMedia = () => {
      const preloadLine = (window.innerHeight || 900) * 1.25;

      canvas.querySelectorAll<HTMLImageElement>("img").forEach((image) => {
        const box = image.getBoundingClientRect();

        if (box.top < preloadLine) {
          image.loading = "eager";
          image.decoding = "async";
          return;
        }

        image.loading = "lazy";
        image.decoding = "async";
      });
    };

    tuneMedia();
    window.addEventListener("scroll", tuneMedia, { passive: true });
    window.addEventListener("resize", tuneMedia);

    return () => {
      window.removeEventListener("scroll", tuneMedia);
      window.removeEventListener("resize", tuneMedia);
    };
  }, [isMobile]);

  return (
    <section className="site-python-course-page" aria-label="Курс ML-инженер">
      <MainScreenHeaderSurface isMobile={isMobile} scale={headerScale} />
      <div className="site-python-course-page__content-shell" style={courseContentShellStyle}>
        <div
          className="site-python-course-page__content-canvas"
          ref={courseCanvasRef}
          style={courseContentCanvasStyle}
        >
          <div className="site-python-course-page__inner">
            {isMobile ? (
              <MlEngineerCourseMobile />
            ) : (
              <MlEngineerCourseDesktop />
            )}
          </div>
        </div>
      </div>
      <SiteFooter isMobile={isMobile} scale={headerScale} />
    </section>
  );
}

function canScrollCarousel(carousel: HTMLElement, delta: number) {
  const maxScrollLeft = carousel.scrollWidth - carousel.clientWidth;

  if (maxScrollLeft <= 0) {
    return false;
  }

  if (delta > 0) {
    return carousel.scrollLeft < maxScrollLeft - 1;
  }

  if (delta < 0) {
    return carousel.scrollLeft > 1;
  }

  return false;
}

function enableCarouselPointerDrag(carousel: HTMLElement) {
  let pointerId: number | null = null;
  let startX = 0;
  let startScrollLeft = 0;
  let didDrag = false;
  let maxAbsDeltaX = 0;
  let suppressClickTimer = 0;
  const isCourseSwipeCarousel =
    carousel.classList.contains("site-course-projects-carousel") ||
    carousel.classList.contains("site-course-reviews-carousel");
  const dragThreshold = isCourseSwipeCarousel ? 4 : 18;
  const clickSuppressThreshold = isCourseSwipeCarousel ? 16 : 24;

  const clearDragState = () => {
    pointerId = null;
    carousel.classList.remove("site-carousel--dragging");
  };

  const handlePointerDown = (event: PointerEvent) => {
    if (event.button !== 0 || carousel.scrollWidth <= carousel.clientWidth) {
      return;
    }

    if (
      event.target instanceof Element &&
      event.target.closest("[data-carousel-action], [data-carousel-index]")
    ) {
      return;
    }

    pointerId = event.pointerId;
    startX = event.clientX;
    startScrollLeft = carousel.scrollLeft;
    didDrag = false;
    maxAbsDeltaX = 0;
    window.clearTimeout(suppressClickTimer);
    delete carousel.dataset.dragSuppressClick;
  };

  const handlePointerMove = (event: PointerEvent) => {
    if (pointerId !== event.pointerId) {
      return;
    }

    const deltaX = event.clientX - startX;
    maxAbsDeltaX = Math.max(maxAbsDeltaX, Math.abs(deltaX));

    if (!didDrag && Math.abs(deltaX) < dragThreshold) {
      return;
    }

    if (!didDrag) {
      didDrag = true;
      carousel.classList.add("site-carousel--dragging");
      carousel.setPointerCapture?.(event.pointerId);
    }

    carousel.scrollLeft = normalizeCarouselScrollLeft(carousel, startScrollLeft - deltaX);
    event.preventDefault();
  };

  const handlePointerEnd = (event: PointerEvent) => {
    if (pointerId !== event.pointerId) {
      return;
    }

    if (carousel.hasPointerCapture?.(event.pointerId)) {
      carousel.releasePointerCapture?.(event.pointerId);
    }

    if (didDrag && maxAbsDeltaX >= clickSuppressThreshold) {
      carousel.dataset.dragSuppressClick = "true";
      suppressClickTimer = window.setTimeout(() => {
        delete carousel.dataset.dragSuppressClick;
      }, 180);
    }

    clearDragState();
  };

  const handleClickCapture = (event: globalThis.MouseEvent) => {
    if (carousel.dataset.dragSuppressClick !== "true") {
      return;
    }

    event.preventDefault();
    event.stopPropagation();
    delete carousel.dataset.dragSuppressClick;
    window.clearTimeout(suppressClickTimer);
  };

  const handleNativeDragStart = (event: DragEvent) => {
    event.preventDefault();
  };

  carousel.addEventListener("pointerdown", handlePointerDown);
  carousel.addEventListener("pointermove", handlePointerMove);
  carousel.addEventListener("pointerup", handlePointerEnd);
  carousel.addEventListener("pointercancel", handlePointerEnd);
  carousel.addEventListener("click", handleClickCapture, true);
  carousel.addEventListener("dragstart", handleNativeDragStart);

  return () => {
    window.clearTimeout(suppressClickTimer);
    carousel.removeEventListener("pointerdown", handlePointerDown);
    carousel.removeEventListener("pointermove", handlePointerMove);
    carousel.removeEventListener("pointerup", handlePointerEnd);
    carousel.removeEventListener("pointercancel", handlePointerEnd);
    carousel.removeEventListener("click", handleClickCapture, true);
    carousel.removeEventListener("dragstart", handleNativeDragStart);
    carousel.classList.remove("site-carousel--dragging");
  };
}

function preloadImage(src: string) {
  return new Promise<void>((resolve) => {
    const image = new Image();

    image.decoding = "async";
    image.onload = () => {
      if (typeof image.decode === "function") {
        image.decode().then(() => resolve()).catch(() => resolve());
        return;
      }

      resolve();
    };
    image.onerror = () => resolve();
    image.src = src;
  });
}

function hasLoadedInSession() {
  try {
    return window.sessionStorage.getItem(LOADED_STORAGE_KEY) === "true";
  } catch {
    return false;
  }
}

function hasCookieConsent() {
  if (typeof window === "undefined") {
    return true;
  }

  try {
    return window.localStorage.getItem(COOKIE_CONSENT_STORAGE_KEY) === "accepted";
  } catch {
    return false;
  }
}

function rememberLoadedInSession() {
  try {
    window.sessionStorage.setItem(LOADED_STORAGE_KEY, "true");
  } catch {
    // Storage can be unavailable in private or restricted contexts.
  }
}

function readReturnScrollPosition(): { path: string; y: number } | null {
  try {
    const raw = window.sessionStorage.getItem(RETURN_SCROLL_STORAGE_KEY);

    if (!raw) {
      return null;
    }

    const parsed = JSON.parse(raw) as { path?: unknown; y?: unknown };

    if (typeof parsed.path !== "string" || typeof parsed.y !== "number") {
      return null;
    }

    return { path: parsed.path, y: parsed.y };
  } catch {
    return null;
  }
}

function writeReturnScrollPosition(value: { path: string; y: number }) {
  try {
    window.sessionStorage.setItem(RETURN_SCROLL_STORAGE_KEY, JSON.stringify(value));
  } catch {
    // Storage can be unavailable in private or restricted contexts.
  }
}

function clearReturnScrollPosition() {
  try {
    window.sessionStorage.removeItem(RETURN_SCROLL_STORAGE_KEY);
  } catch {
    // Storage can be unavailable in private or restricted contexts.
  }
}

function waitForCriticalAssets(isMobile: boolean) {
  const images = Array.from(document.images);
  const fonts = (document as Document & { fonts?: { ready: Promise<unknown> } }).fonts;
  const loaderLogo = images.find((image) => image.src.endsWith("/logo_education.png"));

  return Promise.all([
    ...getCriticalAssets(isMobile).map(preloadImage),
    loaderLogo && !loaderLogo.complete ? preloadImage(loaderLogo.src) : Promise.resolve(),
    fonts?.ready.catch(() => undefined) ?? Promise.resolve(),
  ]).then(() => undefined);
}

export default function App({
  initialRoute = { page: "home" },
}: {
  initialRoute?: AppInitialRoute;
}) {
  const initialRouteState = getRouteState(initialRoute);
  const router = useRouter();
  const viewport = useViewportState();
  const isSafariBrowser = useIsSafariBrowser();
  const isMetrikaSelectorMode = useIsMetrikaSelectorMode();
  const [leadModalState, setLeadModalState] = useState<"closed" | "form" | "success">("closed");
  const [activeReviewStory, setActiveReviewStory] = useState<ReviewStoryKey | null>(
    initialRouteState.activeReviewStory,
  );
  const [activeCourseReview, setActiveCourseReview] = useState<CourseReviewKey | null>(
    initialRouteState.activeCourseReview,
  );
  const [activeStudentReview, setActiveStudentReview] = useState<string | null>(
    initialRouteState.activeStudentReview,
  );
  const [isAboutRoute, setIsAboutRoute] = useState(initialRouteState.isAboutRoute);
  const [isPythonCourseRoute, setIsPythonCourseRoute] = useState(initialRouteState.isPythonCourseRoute);
  const [isDataScienceCourseRoute, setIsDataScienceCourseRoute] = useState(initialRouteState.isDataScienceCourseRoute);
  const [isFrontendCourseRoute, setIsFrontendCourseRoute] = useState(initialRouteState.isFrontendCourseRoute);
  const [isDataAnalystCourseRoute, setIsDataAnalystCourseRoute] = useState(initialRouteState.isDataAnalystCourseRoute);
  const [isCppCourseRoute, setIsCppCourseRoute] = useState(initialRouteState.isCppCourseRoute);
  const [isMobileDeveloperCourseRoute, setIsMobileDeveloperCourseRoute] = useState(initialRouteState.isMobileDeveloperCourseRoute);
  const [isUnrealEngineCourseRoute, setIsUnrealEngineCourseRoute] = useState(initialRouteState.isUnrealEngineCourseRoute);
  const [isJavaCourseRoute, setIsJavaCourseRoute] = useState(initialRouteState.isJavaCourseRoute);
  const [isMlEngineerCourseRoute, setIsMlEngineerCourseRoute] = useState(initialRouteState.isMlEngineerCourseRoute);
  const [isReviewsRoute, setIsReviewsRoute] = useState(initialRouteState.isReviewsRoute);
  const [isTariffsRoute, setIsTariffsRoute] = useState(initialRouteState.isTariffsRoute);
  const [activeReviewsDirection, setActiveReviewsDirection] = useState<ReviewsDirectionKey>(
    initialRouteState.activeReviewsDirection,
  );
  const [isReady, setIsReady] = useState(false);
  const [shouldShowLoader, setShouldShowLoader] = useState(true);
  const [isConsentChecked, setIsConsentChecked] = useState(false);
  const [isConsentError, setIsConsentError] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileMenuMounted, setIsMobileMenuMounted] = useState(false);
  const [openMobileNavGroup, setOpenMobileNavGroup] = useState<"adults" | "children" | null>(null);
  const [isReviewConsultPrimed, setIsReviewConsultPrimed] = useState(false);
  const [isReviewTransitionLoading, setIsReviewTransitionLoading] = useState(false);
  const [leadDraft, setLeadDraft] = useState<LeadDraft>({});
  const [leadFormError, setLeadFormError] = useState("");
  const [isLeadSubmitting, setIsLeadSubmitting] = useState(false);
  const [shouldShowCookieBanner, setShouldShowCookieBanner] = useState(false);
  const [homeContentDesignHeight, setHomeContentDesignHeight] = useState<number | null>(null);
  const homeCanvasRef = useRef<HTMLDivElement>(null);
  const pendingReturnScrollRef = useRef<{ path: string; y: number } | null>(null);
  const reviewTransitionTimerRef = useRef<number | null>(null);
  const initialRouteKey = (() => {
    if (initialRoute.page === "review") {
      return `${initialRoute.page}:${initialRoute.story}`;
    }

    if (initialRoute.page === "courseReview") {
      return `${initialRoute.page}:${initialRoute.review}`;
    }

    if (initialRoute.page === "studentReview") {
      return `${initialRoute.page}:${initialRoute.review}`;
    }

    if (initialRoute.page === "reviews") {
      return `${initialRoute.page}:${initialRoute.direction || ""}`;
    }

    return initialRoute.page;
  })();

  useEffect(() => {
    const routeState = getRouteState(initialRoute);

    setActiveReviewStory(routeState.activeReviewStory);
    setActiveCourseReview(routeState.activeCourseReview);
    setActiveStudentReview(routeState.activeStudentReview);
    setIsAboutRoute(routeState.isAboutRoute);
    setIsPythonCourseRoute(routeState.isPythonCourseRoute);
    setIsDataScienceCourseRoute(routeState.isDataScienceCourseRoute);
    setIsFrontendCourseRoute(routeState.isFrontendCourseRoute);
    setIsDataAnalystCourseRoute(routeState.isDataAnalystCourseRoute);
    setIsCppCourseRoute(routeState.isCppCourseRoute);
    setIsMobileDeveloperCourseRoute(routeState.isMobileDeveloperCourseRoute);
    setIsUnrealEngineCourseRoute(routeState.isUnrealEngineCourseRoute);
    setIsJavaCourseRoute(routeState.isJavaCourseRoute);
    setIsMlEngineerCourseRoute(routeState.isMlEngineerCourseRoute);
    setIsReviewsRoute(routeState.isReviewsRoute);
    setIsTariffsRoute(routeState.isTariffsRoute);
    setActiveReviewsDirection(routeState.activeReviewsDirection);
    setIsMobileMenuOpen(false);
  }, [initialRouteKey]);

  useEffect(() => {
    const previousScrollRestoration = window.history.scrollRestoration;
    window.history.scrollRestoration = "manual";

    const restorePendingReturnScroll = () => {
      const pendingReturnScroll = pendingReturnScrollRef.current || readReturnScrollPosition();

      if (!pendingReturnScroll) {
        return;
      }

      const currentPath = `${window.location.pathname}${window.location.search}`;

      if (currentPath !== pendingReturnScroll.path) {
        return;
      }

      pendingReturnScrollRef.current = null;
      clearReturnScrollPosition();
      const restore = () => window.scrollTo({ top: pendingReturnScroll.y, behavior: "instant" });
      window.requestAnimationFrame(() => {
        restore();
        window.setTimeout(restore, 0);
        window.setTimeout(restore, 120);
      });
    };

    const syncRouteFromLocation = () => {
      const cleanHashPath = getCleanPathFromHash();

      if (cleanHashPath) {
        window.location.replace(cleanHashPath);
        return;
      }

      const routeState = getRouteState(getRouteFromLocation());

      setActiveReviewStory(routeState.activeReviewStory);
      setActiveCourseReview(routeState.activeCourseReview);
      setActiveStudentReview(routeState.activeStudentReview);
      setIsAboutRoute(routeState.isAboutRoute);
      setIsPythonCourseRoute(routeState.isPythonCourseRoute);
      setIsDataScienceCourseRoute(routeState.isDataScienceCourseRoute);
      setIsFrontendCourseRoute(routeState.isFrontendCourseRoute);
      setIsDataAnalystCourseRoute(routeState.isDataAnalystCourseRoute);
      setIsCppCourseRoute(routeState.isCppCourseRoute);
      setIsMobileDeveloperCourseRoute(routeState.isMobileDeveloperCourseRoute);
      setIsUnrealEngineCourseRoute(routeState.isUnrealEngineCourseRoute);
      setIsJavaCourseRoute(routeState.isJavaCourseRoute);
    setIsMlEngineerCourseRoute(routeState.isMlEngineerCourseRoute);
      setIsReviewsRoute(routeState.isReviewsRoute);
      setIsTariffsRoute(routeState.isTariffsRoute);
      setActiveReviewsDirection(
        routeState.isReviewsRoute ? getReviewsDirectionFromLocation() : ALL_REVIEWS_DIRECTION_KEY,
      );
      setIsMobileMenuOpen(false);
      restorePendingReturnScroll();
    };

    syncRouteFromLocation();
    window.addEventListener("popstate", syncRouteFromLocation);

    return () => {
      window.removeEventListener("popstate", syncRouteFromLocation);
      window.history.scrollRestoration = previousScrollRestoration;
    };
  }, []);

  useEffect(() => {
    if (hasLoadedInSession()) {
      setIsReady(true);
      setShouldShowLoader(false);
    }

    setShouldShowCookieBanner(!hasCookieConsent());
  }, []);

  useEffect(() => {
    let rafId = 0;

    const syncScrolledState = () => {
      rafId = 0;
      document.documentElement.classList.toggle("site-has-scrolled", window.scrollY > 2);
    };

    const handleScroll = () => {
      if (rafId === 0) {
        rafId = window.requestAnimationFrame(syncScrolledState);
      }
    };

    syncScrolledState();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      if (rafId !== 0) {
        window.cancelAnimationFrame(rafId);
      }

      window.removeEventListener("scroll", handleScroll);
      document.documentElement.classList.remove("site-has-scrolled");
    };
  }, []);

  useEffect(() => {
    if (isReady) {
      rememberLoadedInSession();
      return;
    }

    let cancelled = false;
    const startedAt = performance.now();
    const maxTimer = window.setTimeout(() => {
      if (!cancelled) {
        setIsReady(true);
      }
    }, LOADER_MAX_MS);

    waitForCriticalAssets(viewport.isMobile).then(() => {
      const elapsed = performance.now() - startedAt;
      const delay = Math.max(0, LOADER_MIN_MS - elapsed);

      window.setTimeout(() => {
        if (!cancelled) {
          window.clearTimeout(maxTimer);
          window.requestAnimationFrame(() => setIsReady(true));
        }
      }, delay);
    });

    return () => {
      cancelled = true;
      window.clearTimeout(maxTimer);
    };
  }, [isReady, viewport.isMobile]);

  useEffect(() => () => {
    if (reviewTransitionTimerRef.current !== null) {
      window.clearTimeout(reviewTransitionTimerRef.current);
    }
  }, []);

  useEffect(() => {
    if (!isReady) {
      return;
    }

    rememberLoadedInSession();
    const hideTimer = window.setTimeout(() => setShouldShowLoader(false), LOADER_EXIT_MS);

    return () => {
      window.clearTimeout(hideTimer);
    };
  }, [isReady]);

  useEffect(() => {
    setIsReviewConsultPrimed(false);
  }, [activeReviewStory, viewport.isMobile]);

  useEffect(() => {
    if (!viewport.isMobile) {
      setIsMobileMenuOpen(false);
      setIsMobileMenuMounted(false);
    }
  }, [
    viewport.isMobile,
    activeReviewStory,
    activeCourseReview,
    activeStudentReview,
    isAboutRoute,
    isPythonCourseRoute,
    isDataScienceCourseRoute,
    isReviewsRoute,
    isTariffsRoute,
  ]);

  useEffect(() => {
    if (!viewport.isMobile) {
      return;
    }

    if (isMobileMenuOpen) {
      setIsMobileMenuMounted(true);
      return;
    }

    const closeTimer = window.setTimeout(() => setIsMobileMenuMounted(false), 210);

    return () => {
      window.clearTimeout(closeTimer);
    };
  }, [isMobileMenuOpen, viewport.isMobile]);

  useEffect(() => {
    if (!isMobileMenuOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    if (leadModalState === "closed") {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    const handleEscape = (event: globalThis.KeyboardEvent) => {
      if (event.key === "Escape") {
        setLeadModalState("closed");
        setIsConsentError(false);
      }
    };

    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleEscape);
    };
  }, [leadModalState]);

  useEffect(() => {
    const syncRoutes = () => {
      const route = getRouteFromLocation();
      const routeState = getRouteState(route);

      setActiveReviewStory(routeState.activeReviewStory);
      setActiveCourseReview(routeState.activeCourseReview);
      setActiveStudentReview(routeState.activeStudentReview);
      setIsAboutRoute(routeState.isAboutRoute);
      setIsPythonCourseRoute(routeState.isPythonCourseRoute);
      setIsDataScienceCourseRoute(routeState.isDataScienceCourseRoute);
      setIsFrontendCourseRoute(routeState.isFrontendCourseRoute);
      setIsDataAnalystCourseRoute(routeState.isDataAnalystCourseRoute);
      setIsCppCourseRoute(routeState.isCppCourseRoute);
      setIsMobileDeveloperCourseRoute(routeState.isMobileDeveloperCourseRoute);
      setIsUnrealEngineCourseRoute(routeState.isUnrealEngineCourseRoute);
      setIsJavaCourseRoute(routeState.isJavaCourseRoute);
      setIsMlEngineerCourseRoute(routeState.isMlEngineerCourseRoute);
      setIsReviewsRoute(routeState.isReviewsRoute);
      setIsTariffsRoute(routeState.isTariffsRoute);
    };

    syncRoutes();
    window.addEventListener("popstate", syncRoutes);
    window.addEventListener("hashchange", syncRoutes);

    return () => {
      window.removeEventListener("popstate", syncRoutes);
      window.removeEventListener("hashchange", syncRoutes);
    };
  }, []);

  useEffect(() => {
    const carousels = Array.from(
      document.querySelectorAll<HTMLElement>(
        '[data-carousel]:not([data-carousel="teachers"]):not([data-carousel="reviews"]):not([data-carousel="mobile-teachers"]):not([data-carousel="mobile-directions"]):not([data-carousel="python-projects"]):not([data-carousel="python-mobile-projects"]):not([data-carousel="python-teachers"]):not([data-carousel="python-mobile-teachers"]):not([data-carousel="python-reviews"]):not([data-carousel="python-mobile-reviews"])',
      ),
    );

    const handleWheel = (event: WheelEvent) => {
      const carousel = event.currentTarget instanceof HTMLElement ? event.currentTarget : null;

      if (!carousel || carousel.scrollWidth <= carousel.clientWidth) {
        return;
      }

      if (Math.abs(event.deltaY) <= Math.abs(event.deltaX)) {
        return;
      }

      const delta = event.deltaY;

      if (!canScrollCarousel(carousel, delta)) {
        return;
      }

      carousel.scrollLeft += delta;
      event.preventDefault();
    };

    carousels.forEach((carousel) => {
      carousel.addEventListener("wheel", handleWheel, { passive: false });
    });

    return () => {
      carousels.forEach((carousel) => {
        carousel.removeEventListener("wheel", handleWheel);
      });
    };
  }, [
    viewport.isMobile,
    activeReviewStory,
    activeCourseReview,
    activeStudentReview,
    isAboutRoute,
    isPythonCourseRoute,
    isDataScienceCourseRoute,
    isReviewsRoute,
    isTariffsRoute,
  ]);

  useEffect(() => {
    const cleanups = Array.from(
      document.querySelectorAll<HTMLElement>("[data-carousel]"),
      enableCarouselPointerDrag,
    );

    return () => {
      cleanups.forEach((cleanup) => cleanup());
    };
  }, [
    viewport.isMobile,
    activeReviewStory,
    activeCourseReview,
    activeStudentReview,
    isAboutRoute,
    isPythonCourseRoute,
    isDataScienceCourseRoute,
    isReviewsRoute,
    isTariffsRoute,
  ]);

  useEffect(() => {
    const carousels = Array.from(
      document.querySelectorAll<HTMLElement>("[data-carousel][data-carousel-sync]"),
    );

    const syncCarouselDots = (carousel: HTMLElement) => {
      const id = carousel.dataset.carousel;

      if (!id) {
        return;
      }

      const items = getCarouselItems(carousel);
      let activeIndex = 0;
      let nearestDistance = Number.POSITIVE_INFINITY;
      const paddingLeft = Number.parseFloat(window.getComputedStyle(carousel).paddingLeft) || 0;
      const isCenterAligned = carousel.dataset.carouselAlign === "center";
      const activeAnchor = isCenterAligned ? getVisibleCarouselAnchor(carousel) : 0;

      if (carousel.dataset.carouselInitialized !== "true") {
        const initialIndex = Number(carousel.dataset.carouselInitialIndex);
        const initialItem = Number.isFinite(initialIndex) ? items[initialIndex] : null;

        if (initialItem) {
          const maxScrollLeft = carousel.scrollWidth - carousel.clientWidth;
          const targetLeft = isCenterAligned
            ? initialItem.offsetLeft + (initialItem.offsetWidth / 2) - activeAnchor
            : initialItem.offsetLeft - paddingLeft;

          carousel.scrollTo({
            left: Math.max(0, Math.min(maxScrollLeft, targetLeft)),
            behavior: "auto",
          });
        }

        carousel.dataset.carouselInitialized = "true";

        if (id === "reviews" && initialItem) {
          setCarouselActiveIndex(carousel, Math.max(0, Math.min(items.length - 1, initialIndex)));
          return;
        }
      }

      items.forEach((item, index) => {
        const itemAnchor = isCenterAligned
          ? item.offsetLeft + (item.offsetWidth / 2) - carousel.scrollLeft
          : item.offsetLeft - paddingLeft - carousel.scrollLeft;
        const distance = Math.abs(itemAnchor - activeAnchor);

        if (distance < nearestDistance) {
          nearestDistance = distance;
          activeIndex = index;
        }
      });

      setCarouselActiveIndex(carousel, activeIndex);
    };

    const cleanups = carousels.map((carousel) => {
      let frame = 0;
      const handleScroll = () => {
        window.cancelAnimationFrame(frame);
        frame = window.requestAnimationFrame(() => syncCarouselDots(carousel));
      };

      syncCarouselDots(carousel);
      carousel.addEventListener("scroll", handleScroll, { passive: true });

      return () => {
        window.cancelAnimationFrame(frame);
        carousel.removeEventListener("scroll", handleScroll);
      };
    });

    return () => {
      cleanups.forEach((cleanup) => cleanup());
    };
  }, [
    viewport.isMobile,
    activeReviewStory,
    activeCourseReview,
    activeStudentReview,
    isAboutRoute,
    isPythonCourseRoute,
    isDataScienceCourseRoute,
    isReviewsRoute,
    isTariffsRoute,
  ]);

  useEffect(() => {
    document
      .querySelectorAll("[data-consent-toggle]")
      .forEach((toggle) => toggle.setAttribute("aria-checked", String(isConsentChecked)));

    document
      .querySelectorAll<HTMLElement>('[data-name="заявка"] [data-name="кнопки пд"]')
      .forEach((button) => {
        const isDisabled = !isConsentChecked || isLeadSubmitting;

        button.setAttribute("aria-disabled", String(isDisabled));
        button.setAttribute("aria-busy", String(isLeadSubmitting));

        if (button instanceof HTMLButtonElement) {
          button.disabled = isDisabled;
        }
      });
  }, [isConsentChecked, viewport.isMobile, leadModalState, isLeadSubmitting]);

  useEffect(() => {
    const handleConsentClick = (event: globalThis.MouseEvent) => {
      const target = event.target instanceof Element ? event.target : null;
      const consentToggle = target?.closest("[data-consent-toggle]");

      if (!consentToggle || target?.closest("a")) {
        return;
      }

      event.preventDefault();
      event.stopPropagation();
      setIsConsentChecked((checked) => {
        const nextChecked = !checked;

        if (nextChecked) {
          setIsConsentError(false);
        }

        return nextChecked;
      });
    };

    const handleConsentKeyDown = (event: globalThis.KeyboardEvent) => {
      const target = event.target instanceof Element ? event.target : null;

      if (
        !target?.closest("[data-consent-toggle]") ||
        (event.key !== "Enter" && event.key !== " ")
      ) {
        return;
      }

      event.preventDefault();
      event.stopPropagation();
      setIsConsentChecked((checked) => {
        const nextChecked = !checked;

        if (nextChecked) {
          setIsConsentError(false);
        }

        return nextChecked;
      });
    };

    document.addEventListener("click", handleConsentClick, true);
    document.addEventListener("keydown", handleConsentKeyDown, true);

    return () => {
      document.removeEventListener("click", handleConsentClick, true);
      document.removeEventListener("keydown", handleConsentKeyDown, true);
    };
  }, []);

  const scrollToDesignY = (y: number) => {
    window.scrollTo({
      top: Math.round(y * viewport.scale),
      behavior: "smooth",
    });
  };

  const openLeadModal = () => {
    setLeadModalState("form");
    setIsMobileMenuOpen(false);
    setIsConsentError(false);
    setLeadFormError("");
  };

  const closeLeadModal = () => {
    setLeadModalState("closed");
    setIsConsentError(false);
    setLeadFormError("");
    setLeadDraft({});
    setIsLeadSubmitting(false);
  };

  const acceptCookieConsent = () => {

    try {
      window.localStorage.setItem(COOKIE_CONSENT_STORAGE_KEY, "accepted");
    } catch {
      // Keep the banner dismissible even if localStorage is unavailable.
    }

    setShouldShowCookieBanner(false);
  };

  const pushInternalRoute = (nextPath: string) => {
    const currentPath = `${window.location.pathname}${window.location.search}`;

    if (currentPath !== nextPath || window.location.hash) {
      router.push(nextPath, { scroll: false });
    }
  };

  const saveReturnScrollPosition = () => {
    const value = {
      path: `${window.location.pathname}${window.location.search}`,
      y: window.scrollY,
    };

    pendingReturnScrollRef.current = value;
    writeReturnScrollPosition(value);
  };

  const showReviewTransitionLoader = () => {
    if (reviewTransitionTimerRef.current !== null) {
      window.clearTimeout(reviewTransitionTimerRef.current);
    }

    setIsReviewTransitionLoading(true);
    reviewTransitionTimerRef.current = window.setTimeout(() => {
      setIsReviewTransitionLoading(false);
      reviewTransitionTimerRef.current = null;
    }, 720);
  };

  const openReviewStory = (story: string | undefined) => {
    const key = story as ReviewStoryKey | undefined;

    if (!key || !(key in REVIEW_STORIES)) {
      return;
    }

    const nextPath = `/reviews/${REVIEW_ROUTES[key]}`;
    saveReturnScrollPosition();
    pushInternalRoute(nextPath);

    setActiveReviewStory(key);
    setActiveCourseReview(null);
    setActiveStudentReview(null);
    setIsAboutRoute(false);
    setIsPythonCourseRoute(false);
    setIsDataScienceCourseRoute(false);
    setIsFrontendCourseRoute(false);
    setIsDataAnalystCourseRoute(false);
    setIsCppCourseRoute(false);
    setIsMobileDeveloperCourseRoute(false);
    setIsUnrealEngineCourseRoute(false);
    setIsJavaCourseRoute(false);
    setIsMlEngineerCourseRoute(false);
    setIsReviewsRoute(false);
    setIsTariffsRoute(false);
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "instant" });
  };

  const openReviewsPage = (direction?: ReviewsDirectionKey | string) => {
    const reviewsDirection = normalizeReviewsDirectionKey(direction);
    const nextPath = getReviewsDirectionPath(reviewsDirection);
    pushInternalRoute(nextPath);

    setActiveReviewStory(null);
    setActiveCourseReview(null);
    setActiveStudentReview(null);
    setIsAboutRoute(false);
    setIsPythonCourseRoute(false);
    setIsDataScienceCourseRoute(false);
    setIsFrontendCourseRoute(false);
    setIsDataAnalystCourseRoute(false);
    setIsCppCourseRoute(false);
    setIsMobileDeveloperCourseRoute(false);
    setIsUnrealEngineCourseRoute(false);
    setIsJavaCourseRoute(false);
    setIsMlEngineerCourseRoute(false);
    setIsReviewsRoute(true);
    setIsTariffsRoute(false);
    setActiveReviewsDirection(reviewsDirection);
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "instant" });
  };

  const openCourseReviewStory = (review: string | undefined) => {
    const key = review as CourseReviewKey | undefined;

    if (!key || !(key in COURSE_REVIEW_ROUTES)) {
      return;
    }

    const studentReview = findStudentReviewByRouteSlug(key);

    if (!studentReview) {
      return;
    }

    const nextPath = getStudentReviewPath(studentReview);
    saveReturnScrollPosition();
    showReviewTransitionLoader();
    pushInternalRoute(nextPath);

    setActiveReviewStory(null);
    setActiveCourseReview(null);
    setActiveStudentReview(studentReview.id);
    setIsAboutRoute(false);
    setIsPythonCourseRoute(false);
    setIsDataScienceCourseRoute(false);
    setIsFrontendCourseRoute(false);
    setIsDataAnalystCourseRoute(false);
    setIsCppCourseRoute(false);
    setIsMobileDeveloperCourseRoute(false);
    setIsUnrealEngineCourseRoute(false);
    setIsJavaCourseRoute(false);
    setIsMlEngineerCourseRoute(false);
    setIsReviewsRoute(false);
    setIsTariffsRoute(false);
    setActiveReviewsDirection(studentReview.direction);
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "instant" });
  };

  const openStudentReview = (reviewId: string | undefined) => {
    const review = findStudentReviewById(reviewId);

    if (!review) {
      return;
    }

    const nextPath = getStudentReviewPath(review);
    saveReturnScrollPosition();
    showReviewTransitionLoader();
    pushInternalRoute(nextPath);

    setActiveReviewStory(null);
    setActiveCourseReview(null);
    setActiveStudentReview(review.id);
    setIsAboutRoute(false);
    setIsPythonCourseRoute(false);
    setIsDataScienceCourseRoute(false);
    setIsFrontendCourseRoute(false);
    setIsDataAnalystCourseRoute(false);
    setIsCppCourseRoute(false);
    setIsMobileDeveloperCourseRoute(false);
    setIsUnrealEngineCourseRoute(false);
    setIsJavaCourseRoute(false);
    setIsMlEngineerCourseRoute(false);
    setIsReviewsRoute(false);
    setIsTariffsRoute(false);
    setActiveReviewsDirection(review.direction);
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "instant" });
  };

  const goHome = () => {
    pushInternalRoute("/");

    setActiveReviewStory(null);
    setActiveCourseReview(null);
    setActiveStudentReview(null);
    setIsAboutRoute(false);
    setIsPythonCourseRoute(false);
    setIsDataScienceCourseRoute(false);
    setIsFrontendCourseRoute(false);
    setIsDataAnalystCourseRoute(false);
    setIsCppCourseRoute(false);
    setIsMobileDeveloperCourseRoute(false);
    setIsUnrealEngineCourseRoute(false);
    setIsJavaCourseRoute(false);
    setIsMlEngineerCourseRoute(false);
    setIsReviewsRoute(false);
    setIsTariffsRoute(false);
    window.scrollTo({ top: 0, behavior: "instant" });
  };

  const goBack = () => {
    setIsMobileMenuOpen(false);

    if (window.history.length > 1) {
      router.back();
      return;
    }

    goHome();
  };

  const openAboutPage = () => {
    pushInternalRoute("/about");

    setActiveReviewStory(null);
    setActiveCourseReview(null);
    setActiveStudentReview(null);
    setIsAboutRoute(true);
    setIsPythonCourseRoute(false);
    setIsDataScienceCourseRoute(false);
    setIsFrontendCourseRoute(false);
    setIsDataAnalystCourseRoute(false);
    setIsCppCourseRoute(false);
    setIsMobileDeveloperCourseRoute(false);
    setIsUnrealEngineCourseRoute(false);
    setIsJavaCourseRoute(false);
    setIsMlEngineerCourseRoute(false);
    setIsReviewsRoute(false);
    setIsTariffsRoute(false);
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "instant" });
  };

  const openPythonCoursePage = () => {
    saveReturnScrollPosition();
    pushInternalRoute("/python-course");

    setActiveReviewStory(null);
    setActiveCourseReview(null);
    setActiveStudentReview(null);
    setIsAboutRoute(false);
    setIsPythonCourseRoute(true);
    setIsDataScienceCourseRoute(false);
    setIsFrontendCourseRoute(false);
    setIsDataAnalystCourseRoute(false);
    setIsCppCourseRoute(false);
    setIsMobileDeveloperCourseRoute(false);
    setIsUnrealEngineCourseRoute(false);
    setIsJavaCourseRoute(false);
    setIsMlEngineerCourseRoute(false);
    setIsReviewsRoute(false);
    setIsTariffsRoute(false);
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "instant" });
  };

  const openDataScienceCoursePage = () => {
    saveReturnScrollPosition();
    pushInternalRoute("/data-science-course");

    setActiveReviewStory(null);
    setActiveCourseReview(null);
    setActiveStudentReview(null);
    setIsAboutRoute(false);
    setIsPythonCourseRoute(false);
    setIsDataScienceCourseRoute(true);
    setIsFrontendCourseRoute(false);
    setIsDataAnalystCourseRoute(false);
    setIsCppCourseRoute(false);
    setIsMobileDeveloperCourseRoute(false);
    setIsUnrealEngineCourseRoute(false);
    setIsJavaCourseRoute(false);
    setIsMlEngineerCourseRoute(false);
    setIsReviewsRoute(false);
    setIsTariffsRoute(false);
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "instant" });
  };

  const openFrontendCoursePage = () => {
    saveReturnScrollPosition();
    pushInternalRoute("/frontend-developer-course");

    setActiveReviewStory(null);
    setActiveCourseReview(null);
    setActiveStudentReview(null);
    setIsAboutRoute(false);
    setIsPythonCourseRoute(false);
    setIsDataScienceCourseRoute(false);
    setIsFrontendCourseRoute(true);
    setIsDataAnalystCourseRoute(false);
    setIsCppCourseRoute(false);
    setIsMobileDeveloperCourseRoute(false);
    setIsUnrealEngineCourseRoute(false);
    setIsJavaCourseRoute(false);
    setIsMlEngineerCourseRoute(false);
    setIsReviewsRoute(false);
    setIsTariffsRoute(false);
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "instant" });
  };

  const openDataAnalystCoursePage = () => {
    saveReturnScrollPosition();
    pushInternalRoute("/data-analyst-course");

    setActiveReviewStory(null);
    setActiveCourseReview(null);
    setActiveStudentReview(null);
    setIsAboutRoute(false);
    setIsPythonCourseRoute(false);
    setIsDataScienceCourseRoute(false);
    setIsFrontendCourseRoute(false);
    setIsDataAnalystCourseRoute(true);
    setIsCppCourseRoute(false);
    setIsMobileDeveloperCourseRoute(false);
    setIsUnrealEngineCourseRoute(false);
    setIsJavaCourseRoute(false);
    setIsMlEngineerCourseRoute(false);
    setIsReviewsRoute(false);
    setIsTariffsRoute(false);
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "instant" });
  };

  const openCppCoursePage = () => {
    saveReturnScrollPosition();
    pushInternalRoute("/cpp-developer-course");

    setActiveReviewStory(null);
    setActiveCourseReview(null);
    setActiveStudentReview(null);
    setIsAboutRoute(false);
    setIsPythonCourseRoute(false);
    setIsDataScienceCourseRoute(false);
    setIsFrontendCourseRoute(false);
    setIsDataAnalystCourseRoute(false);
    setIsCppCourseRoute(true);
    setIsMobileDeveloperCourseRoute(false);
    setIsUnrealEngineCourseRoute(false);
    setIsJavaCourseRoute(false);
    setIsMlEngineerCourseRoute(false);
    setIsReviewsRoute(false);
    setIsTariffsRoute(false);
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "instant" });
  };

  const openMobileDeveloperCoursePage = () => {
    saveReturnScrollPosition();
    pushInternalRoute("/mobile-developer-course");

    setActiveReviewStory(null);
    setActiveCourseReview(null);
    setActiveStudentReview(null);
    setIsAboutRoute(false);
    setIsPythonCourseRoute(false);
    setIsDataScienceCourseRoute(false);
    setIsFrontendCourseRoute(false);
    setIsDataAnalystCourseRoute(false);
    setIsCppCourseRoute(false);
    setIsMobileDeveloperCourseRoute(true);
    setIsUnrealEngineCourseRoute(false);
    setIsJavaCourseRoute(false);
    setIsMlEngineerCourseRoute(false);
    setIsReviewsRoute(false);
    setIsTariffsRoute(false);
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "instant" });
  };

  const openUnrealEngineCoursePage = () => {
    saveReturnScrollPosition();
    pushInternalRoute("/unreal-engine-course");

    setActiveReviewStory(null);
    setActiveCourseReview(null);
    setActiveStudentReview(null);
    setIsAboutRoute(false);
    setIsPythonCourseRoute(false);
    setIsDataScienceCourseRoute(false);
    setIsFrontendCourseRoute(false);
    setIsDataAnalystCourseRoute(false);
    setIsCppCourseRoute(false);
    setIsMobileDeveloperCourseRoute(false);
    setIsUnrealEngineCourseRoute(true);
    setIsJavaCourseRoute(false);
    setIsMlEngineerCourseRoute(false);
    setIsReviewsRoute(false);
    setIsTariffsRoute(false);
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "instant" });
  };

  const openJavaCoursePage = () => {
    saveReturnScrollPosition();
    pushInternalRoute("/java-developer-course");

    setActiveReviewStory(null);
    setActiveCourseReview(null);
    setActiveStudentReview(null);
    setIsAboutRoute(false);
    setIsPythonCourseRoute(false);
    setIsDataScienceCourseRoute(false);
    setIsFrontendCourseRoute(false);
    setIsDataAnalystCourseRoute(false);
    setIsCppCourseRoute(false);
    setIsMobileDeveloperCourseRoute(false);
    setIsUnrealEngineCourseRoute(false);
    setIsJavaCourseRoute(true);
    setIsMlEngineerCourseRoute(false);
    setIsReviewsRoute(false);
    setIsTariffsRoute(false);
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "instant" });
  };

  const openMlEngineerCoursePage = () => {
    saveReturnScrollPosition();
    pushInternalRoute("/ml-engineer-course");

    setActiveReviewStory(null);
    setActiveCourseReview(null);
    setActiveStudentReview(null);
    setIsAboutRoute(false);
    setIsPythonCourseRoute(false);
    setIsDataScienceCourseRoute(false);
    setIsFrontendCourseRoute(false);
    setIsDataAnalystCourseRoute(false);
    setIsCppCourseRoute(false);
    setIsMobileDeveloperCourseRoute(false);
    setIsUnrealEngineCourseRoute(false);
    setIsJavaCourseRoute(false);
    setIsMlEngineerCourseRoute(true);
    setIsReviewsRoute(false);
    setIsTariffsRoute(false);
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "instant" });
  };

  const openTariffsPage = () => {
    pushInternalRoute("/tariffs");

    setActiveReviewStory(null);
    setActiveCourseReview(null);
    setActiveStudentReview(null);
    setIsAboutRoute(false);
    setIsPythonCourseRoute(false);
    setIsDataScienceCourseRoute(false);
    setIsFrontendCourseRoute(false);
    setIsDataAnalystCourseRoute(false);
    setIsCppCourseRoute(false);
    setIsMobileDeveloperCourseRoute(false);
    setIsUnrealEngineCourseRoute(false);
    setIsJavaCourseRoute(false);
    setIsMlEngineerCourseRoute(false);
    setIsReviewsRoute(false);
    setIsTariffsRoute(true);
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "instant" });
  };

  const openChildrenPage = () => {
    window.location.href = "https://pages.innoprog.ru/children/school";
  };

  const closeCurrentPageAndScroll = (key: keyof typeof desktopScrollTargets) => {
    if (key === "about") {
      openAboutPage();
      return;
    }

    goHome();
    window.setTimeout(() => {
      const targets = viewport.isMobile ? mobileScrollTargets : desktopScrollTargets;
      scrollToDesignY(targets[key]);
    }, 0);
  };

  const submitLeadApplication = async (source?: ParentNode | null) => {
    if (isLeadSubmitting) {
      return;
    }

    if (!isConsentChecked) {
      setIsConsentError(true);
      return;
    }

    const payload = getLeadPayload(source);

    setLeadDraft(payload);

    if (!isLeadPayloadValid(payload)) {
      const hasEmailField = Boolean(
        (source || document).querySelector('input[name="email"], input[name="modal-email"]'),
      );

      setLeadFormError(
        hasEmailField
          ? "Заполните имя, корректный номер телефона и проверьте почту"
          : "Заполните имя и корректный номер телефона",
      );

      if (leadModalState === "closed") {
        setLeadModalState("form");
      }

      return;
    }

    setIsLeadSubmitting(true);
    setLeadFormError("");

    try {
      await sendLeadApplication(payload);
      setLeadModalState("success");
      setLeadDraft({});
    } catch (error) {
      setLeadFormError(
        error instanceof Error && error.message === "captcha-closed"
          ? "Проверка не завершена. Пройдите капчу и отправьте заявку ещё раз"
          : "Не удалось отправить заявку. Проверьте данные и попробуйте еще раз",
      );
    } finally {
      setIsLeadSubmitting(false);
    }

    setIsConsentError(false);
  };

  const handleLeadFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    void submitLeadApplication(event.currentTarget);
  };

  const toggleConsent = () => {
    setIsConsentChecked((checked) => {
      const nextChecked = !checked;

      if (nextChecked) {
        setIsConsentError(false);
      }

      return nextChecked;
    });
  };

  const handleSiteClick = (event: MouseEvent<HTMLElement>) => {
    const target = event.target instanceof Element ? event.target : null;

    const activeScrollTargets = viewport.isMobile ? mobileScrollTargets : desktopScrollTargets;
    const mobileMenuToggle = target?.closest<HTMLElement>("[data-mobile-menu-toggle]");

    if (mobileMenuToggle) {
      event.preventDefault();
      if (isMobileMenuOpen) {
        setOpenMobileNavGroup(null);
      }
      setIsMobileMenuOpen((open) => !open);
      return;
    }

    const mobileMenuExpand = target?.closest<HTMLElement>("[data-mobile-menu-expand]");

    if (mobileMenuExpand?.dataset.mobileMenuExpand) {
      event.preventDefault();
      const group = mobileMenuExpand.dataset.mobileMenuExpand as "adults" | "children";
      setOpenMobileNavGroup((currentGroup) => currentGroup === group ? null : group);
      return;
    }

    const mobileMenuLink = target?.closest<HTMLElement>("[data-mobile-menu-link]");

    if (mobileMenuLink?.dataset.scrollTarget) {
      event.preventDefault();
      const key = mobileMenuLink.dataset.scrollTarget;

      if (key === "adults") {
        goHome();
        setIsMobileMenuOpen(false);
        return;
      }

      if (key === "form") {
        openLeadModal();
        return;
      }

      if (key === "about") {
        openAboutPage();
        return;
      }

      if (key === "tariffs") {
        openTariffsPage();
        return;
      }

      if (key === "children") {
        openChildrenPage();
        return;
      }

      if (key === "reviews") {
        openReviewsPage();
        return;
      }

      closeCurrentPageAndScroll(key as keyof typeof desktopScrollTargets);
      setIsMobileMenuOpen(false);
      return;
    }

    const carouselIndexControl = target?.closest<HTMLElement>(
      "[data-carousel-index][data-carousel-target]",
    );

    if (carouselIndexControl) {
      event.preventDefault();
      const index = Number(carouselIndexControl.dataset.carouselIndex);

      if (Number.isFinite(index)) {
        scrollCarouselTo(carouselIndexControl.dataset.carouselTarget || "", index);
      }

      return;
    }

    const carouselActionControl = target?.closest<HTMLElement>(
      "[data-carousel-action][data-carousel-target]",
    );

    if (carouselActionControl) {
      event.preventDefault();
      scrollCarousel(
        carouselActionControl.dataset.carouselTarget || "",
        carouselActionControl.dataset.carouselAction === "prev" ? -1 : 1,
      );
      return;
    }

    const mobileDirectionsCarousel = target?.closest<HTMLElement>(
      '[data-carousel="mobile-directions"]',
    );
    const mobileDirectionsArrow = target?.closest<HTMLElement>('[class*="size-[39px]"]');

    if (
      mobileDirectionsCarousel &&
      mobileDirectionsArrow &&
      mobileDirectionsCarousel.contains(mobileDirectionsArrow)
    ) {
      event.preventDefault();
      scrollCarousel("mobile-directions", 1);
      return;
    }

    const consentToggle = target?.closest<HTMLElement>("[data-consent-toggle]");

    if (consentToggle && !target?.closest("a")) {
      event.preventDefault();
      toggleConsent();
      return;
    }

    const courseLeadSubmit = target?.closest<HTMLElement>('[data-name="заявка"] .site-course-lead-submit');

    if (courseLeadSubmit) {
      event.preventDefault();

      const leadSection = courseLeadSubmit.closest<HTMLElement>('[data-name="заявка"]');

      void submitLeadApplication(leadSection || event.currentTarget);
      return;
    }

    const reviewConsultTrigger = target?.closest<HTMLElement>("[data-review-consult]");
    const reviewConsultBlock = target?.closest<HTMLElement>("[data-review-consult-block]");

    if (viewport.isMobile && isReviewRoute && (reviewConsultTrigger || reviewConsultBlock)) {
      event.preventDefault();

      if (!isReviewConsultPrimed) {
        setIsReviewConsultPrimed(true);
        const consultBlock = reviewConsultBlock || document.querySelector<HTMLElement>("[data-review-consult-block]");

        consultBlock?.scrollIntoView({ behavior: "smooth", block: "center" });
        return;
      }

      openLeadModal();
      return;
    }

    const reviewStoryTrigger = target?.closest<HTMLElement>("[data-review-story]");

    if (reviewStoryTrigger) {
      if (
        reviewStoryTrigger.closest<HTMLAnchorElement>("a[href]") &&
        (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey)
      ) {
        return;
      }

      event.preventDefault();
      openReviewStory(reviewStoryTrigger.dataset.reviewStory);
      return;
    }

    const courseReviewTrigger = target?.closest<HTMLElement>("[data-course-review]");

    if (courseReviewTrigger) {
      if (
        courseReviewTrigger.closest<HTMLAnchorElement>("a[href]") &&
        (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey)
      ) {
        return;
      }

      event.preventDefault();
      openCourseReviewStory(courseReviewTrigger.dataset.courseReview);
      return;
    }

    const studentReviewTrigger = target?.closest<HTMLElement>("[data-student-review]");

    if (studentReviewTrigger) {
      if (
        studentReviewTrigger.closest<HTMLAnchorElement>("a[href]") &&
        (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey)
      ) {
        return;
      }

      event.preventDefault();
      openStudentReview(studentReviewTrigger.dataset.studentReview);
      return;
    }

    const reviewsAllTrigger = target?.closest<HTMLElement>("[data-reviews-all]");

    if (reviewsAllTrigger) {
      event.preventDefault();
      openReviewsPage(reviewsAllTrigger.dataset.reviewsAll || undefined);
      return;
    }

    const applicationTrigger = target?.closest<HTMLElement>("[data-application-open]");

    if (applicationTrigger) {
      event.preventDefault();
      openLeadModal();
      return;
    }

    const pythonCourseLink = target?.closest<HTMLAnchorElement>('a[href="/python-course"]');

    if (pythonCourseLink) {
      event.preventDefault();
      openPythonCoursePage();
      return;
    }

    const dataScienceCourseLink = target?.closest<HTMLAnchorElement>('a[href="/data-science-course"]');

    if (dataScienceCourseLink) {
      event.preventDefault();
      openDataScienceCoursePage();
      return;
    }

    const frontendCourseLink = target?.closest<HTMLAnchorElement>('a[href="/frontend-developer-course"]');

    if (frontendCourseLink) {
      event.preventDefault();
      openFrontendCoursePage();
      return;
    }

    const dataAnalystCourseLink = target?.closest<HTMLAnchorElement>('a[href="/data-analyst-course"]');

    if (dataAnalystCourseLink) {
      event.preventDefault();
      openDataAnalystCoursePage();
      return;
    }

    const cppCourseLink = target?.closest<HTMLAnchorElement>('a[href="/cpp-developer-course"]');

    if (cppCourseLink) {
      event.preventDefault();
      openCppCoursePage();
      return;
    }

    const mobileDeveloperCourseLink = target?.closest<HTMLAnchorElement>('a[href="/mobile-developer-course"]');

    if (mobileDeveloperCourseLink) {
      event.preventDefault();
      openMobileDeveloperCoursePage();
      return;
    }

    const unrealEngineCourseLink = target?.closest<HTMLAnchorElement>('a[href="/unreal-engine-course"]');

    if (unrealEngineCourseLink) {
      event.preventDefault();
      openUnrealEngineCoursePage();
      return;
    }

    const javaCourseLink = target?.closest<HTMLAnchorElement>('a[href="/java-developer-course"]');

    if (javaCourseLink) {
      event.preventDefault();
      openJavaCoursePage();
      return;
    }

    const mlEngineerCourseLink = target?.closest<HTMLAnchorElement>('a[href="/ml-engineer-course"]');

    if (mlEngineerCourseLink) {
      event.preventDefault();
      openMlEngineerCoursePage();
      return;
    }

    const reviewHome = target?.closest<HTMLElement>("[data-review-home], [data-site-home]");

    if (reviewHome) {
      event.preventDefault();
      goHome();
      return;
    }

    const mainNav = target?.closest<HTMLElement>("[data-main-nav]");

    if (mainNav?.dataset.mainNav) {
      event.preventDefault();
      const navKey = mainNav.dataset.mainNav;

      if (navKey === "adults") {
        goHome();
        return;
      }

      if (navKey === "children") {
        openChildrenPage();
        return;
      }

      if (navKey === "reviews") {
        openReviewsPage();
        return;
      }

      if (navKey === "about") {
        openAboutPage();
        return;
      }

      if (navKey === "tariffs") {
        openTariffsPage();
        return;
      }
    }

    const reviewNav = target?.closest<HTMLElement>("[data-review-nav]");

    if (reviewNav?.dataset.reviewNav) {
      event.preventDefault();
      const navKey = reviewNav.dataset.reviewNav;

      if (navKey === "adults") {
        goHome();
        return;
      }

      if (navKey === "children") {
        openChildrenPage();
        return;
      }

      if (navKey === "reviews") {
        openReviewsPage();
        return;
      }

      if (navKey === "about") {
        openAboutPage();
        return;
      }

      if (navKey === "tariffs") {
        openTariffsPage();
        return;
      }

      return;
    }

    const text = getClickedText(event.target, event.currentTarget);

    if (!text) {
      return;
    }

    if (
      target?.closest<HTMLElement>('[data-name="заявка"] [data-name="кнопки пд"][aria-disabled="true"]')
    ) {
      event.preventDefault();
      return;
    }

    if (text.includes("для взрослых")) {
      goHome();
      return;
    }

    if (text.includes("для детей")) {
      openChildrenPage();
      return;
    }

    if (text.includes("смотреть все отзывы")) {
      openReviewsPage(
        isDataScienceCourseRoute
          ? "data-science"
          : isPythonCourseRoute || isCourseReviewRoute
            ? "python"
            : undefined,
      );
      return;
    }

    if (text === "отзывы" || text.includes("больше отзывов")) {
      openReviewsPage();
      return;
    }

    if (text === "о нас") {
      openAboutPage();
      return;
    }

    if (text.includes("во всех тарифах") || text === "тарифы" || text === "стоимость обучения") {
      openTariffsPage();
      return;
    }

    if (
      text.includes("подобрать направление") ||
      text.includes("подобрать курс") ||
      text.includes("хочу такой же результат") ||
      text.includes("записаться")
    ) {
      openLeadModal();
      return;
    }

    if (text.includes("получить консультацию")) {
      openLeadModal();
      return;
    }

    if (
      text.includes("начать обучение") ||
      text.includes("начать бесплатно") ||
      text.includes("открыт набор на обучение")
    ) {
      openLeadModal();
      return;
    }

    if (text.includes("отправить заявку")) {
      event.preventDefault();

      const leadSection = target?.closest<HTMLElement>('[data-name="заявка"]');

      void submitLeadApplication(leadSection || event.currentTarget);
    }
  };

  const handleSiteKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    const target = event.target instanceof Element ? event.target : null;
    const carousel = target?.closest<HTMLElement>("[data-carousel]");

    if (
      carousel?.dataset.carousel &&
      (event.key === "ArrowLeft" || event.key === "ArrowRight")
    ) {
      event.preventDefault();
      scrollCarousel(carousel.dataset.carousel, event.key === "ArrowLeft" ? -1 : 1);
      return;
    }

    if (
      target?.closest("[data-carousel-action]") &&
      (event.key === "Enter" || event.key === " ")
    ) {
      const carouselControl = target.closest<HTMLElement>("[data-carousel-action]");

      event.preventDefault();
      scrollCarousel(
        carouselControl?.dataset.carouselTarget || "reviews",
        carouselControl?.dataset.carouselAction === "prev" ? -1 : 1,
      );
      return;
    }

    if (
      target?.closest("[data-application-open]") &&
      (event.key === "Enter" || event.key === " ")
    ) {
      event.preventDefault();
      openLeadModal();
      return;
    }

    if (
      viewport.isMobile &&
      isReviewRoute &&
      target?.closest("[data-review-consult], [data-review-consult-block]") &&
      (event.key === "Enter" || event.key === " ")
    ) {
      event.preventDefault();

      if (!isReviewConsultPrimed) {
        setIsReviewConsultPrimed(true);
        document
          .querySelector<HTMLElement>("[data-review-consult-block]")
          ?.scrollIntoView({ behavior: "smooth", block: "center" });
        return;
      }

      openLeadModal();
      return;
    }

    if (
      target?.closest("[data-review-story]") &&
      (event.key === "Enter" || event.key === " ")
    ) {
      event.preventDefault();
      openReviewStory(target.closest<HTMLElement>("[data-review-story]")?.dataset.reviewStory);
      return;
    }

    if (
      target?.closest("[data-course-review]") &&
      (event.key === "Enter" || event.key === " ")
    ) {
      event.preventDefault();
      openCourseReviewStory(
        target.closest<HTMLElement>("[data-course-review]")?.dataset.courseReview,
      );
      return;
    }

    if (
      target?.closest("[data-student-review]") &&
      (event.key === "Enter" || event.key === " ")
    ) {
      event.preventDefault();
      openStudentReview(target.closest<HTMLElement>("[data-student-review]")?.dataset.studentReview);
      return;
    }

    if (
      target?.closest("[data-reviews-all]") &&
      (event.key === "Enter" || event.key === " ")
    ) {
      event.preventDefault();
      openReviewsPage(target.closest<HTMLElement>("[data-reviews-all]")?.dataset.reviewsAll);
      return;
    }

    if (
      target?.closest("[data-consent-toggle]") &&
      (event.key === "Enter" || event.key === " ")
    ) {
      event.preventDefault();
      toggleConsent();
      return;
    }

    if (
      target?.closest('[data-name="кнопки пд"][role="button"]') &&
      (event.key === "Enter" || event.key === " ")
    ) {
      event.preventDefault();
      target.closest<HTMLElement>('[data-name="кнопки пд"][role="button"]')?.click();
    }
  };

  const activeDesign = viewport.design;
  const isReviewRoute = Boolean(activeReviewStory);
  const isCourseReviewRoute = Boolean(activeCourseReview);
  const isStudentReviewRoute = Boolean(activeStudentReview);
  const isStandaloneRoute = isReviewRoute || isCourseReviewRoute || isStudentReviewRoute || isReviewsRoute || isAboutRoute || isPythonCourseRoute || isDataScienceCourseRoute || isFrontendCourseRoute || isDataAnalystCourseRoute || isCppCourseRoute || isMobileDeveloperCourseRoute || isUnrealEngineCourseRoute || isJavaCourseRoute || isMlEngineerCourseRoute || isTariffsRoute;
  const viewportWidth = activeDesign.width * viewport.scale;
  const aboutScale = viewportWidth / ABOUT_DESIGN_WIDTH;
  // Metrika's visual selector calculates incorrect hit areas for a canvas
  // scaled with Safari's non-standard CSS zoom. Its debug mode uses the same
  // transform-based scaling as other browsers so button outlines stay aligned.
  const shouldUseSafariCanvasZoom = !viewport.isMobile && isSafariBrowser && !isMetrikaSelectorMode;
  const canvasStyle = shouldUseSafariCanvasZoom
    ? {
        width: `${activeDesign.width}px`,
        height: `${activeDesign.height}px`,
        transform: "none",
        zoom: viewport.scale,
      } as CSSProperties & { zoom?: number }
    : {
        width: `${activeDesign.width}px`,
        height: `${activeDesign.height}px`,
        transform: `scale(${viewport.scale})`,
      } as CSSProperties;

  useLayoutEffect(() => {
    if (isStandaloneRoute) {
      setHomeContentDesignHeight(null);
      return;
    }

    const canvas = homeCanvasRef.current;

    if (!canvas) {
      return;
    }

    let animationFrame = 0;
    let settleTimer = 0;

    const measureContent = () => {
      window.cancelAnimationFrame(animationFrame);
      animationFrame = window.requestAnimationFrame(() => {
        const content = canvas.firstElementChild as HTMLElement | null;
        const measuredHeight = Math.ceil(Math.max(
          activeDesign.height,
          canvas.scrollHeight,
          content?.scrollHeight || 0,
          content?.offsetHeight || 0,
        ));

        setHomeContentDesignHeight((currentHeight) => (
          currentHeight === measuredHeight ? currentHeight : measuredHeight
        ));
      });
    };

    const resizeObserver = new ResizeObserver(measureContent);
    resizeObserver.observe(canvas);

    if (canvas.firstElementChild) {
      resizeObserver.observe(canvas.firstElementChild);
    }

    measureContent();
    window.addEventListener("resize", measureContent, { passive: true });
    window.addEventListener("load", measureContent, { once: true });
    settleTimer = window.setTimeout(measureContent, 500);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      window.clearTimeout(settleTimer);
      window.removeEventListener("resize", measureContent);
      window.removeEventListener("load", measureContent);
      resizeObserver.disconnect();
    };
  }, [activeDesign.height, isStandaloneRoute, viewport.isMobile]);

  return (
    <main
      aria-busy={!isReady}
      className={[
        "site-shell",
        isReady ? "site-shell--ready" : "",
        isReviewTransitionLoading ? "site-shell--review-transition-loading" : "",
        viewport.isMobile ? "site-shell--mobile" : "",
        shouldUseSafariCanvasZoom ? "site-shell--safari-canvas-zoom" : "",
        isReviewRoute ? "site-shell--review-route" : "",
        isCourseReviewRoute ? "site-shell--course-review-route" : "",
        isStudentReviewRoute ? "site-shell--student-review-route" : "",
        isReviewsRoute ? "site-shell--reviews-index-route" : "",
        isAboutRoute ? "site-shell--about-route" : "",
        isPythonCourseRoute ? "site-shell--python-course-route" : "",
        isDataScienceCourseRoute ? "site-shell--python-course-route site-shell--data-science-course-route" : "",
        isFrontendCourseRoute ? "site-shell--python-course-route site-shell--frontend-course-route" : "",
        isDataAnalystCourseRoute ? "site-shell--python-course-route site-shell--data-analyst-course-route" : "",
        isCppCourseRoute ? "site-shell--python-course-route site-shell--cpp-course-route" : "",
        isMobileDeveloperCourseRoute ? "site-shell--python-course-route site-shell--mobile-developer-course-route" : "",
        isUnrealEngineCourseRoute ? "site-shell--python-course-route site-shell--unreal-engine-course-route" : "",
        isJavaCourseRoute ? "site-shell--python-course-route site-shell--java-course-route" : "",
        isMlEngineerCourseRoute ? "site-shell--python-course-route site-shell--ml-engineer-course-route" : "",
        isTariffsRoute ? "site-shell--tariffs-route" : "",
        !isStandaloneRoute ? "site-shell--home-route" : "",
        isConsentChecked ? "site-shell--consent-checked" : "",
        isConsentError ? "site-shell--consent-error" : "",
      ].filter(Boolean).join(" ")}
      onClick={handleSiteClick}
      onKeyDown={handleSiteKeyDown}
      style={isStandaloneRoute ? undefined : {
        minHeight: `${Math.ceil((homeContentDesignHeight || activeDesign.height) * viewport.scale)}px`,
      }}
    >
      {isReviewRoute ? (
        <ReviewStoryPage
          storyKey={activeReviewStory as ReviewStoryKey}
          onBack={goBack}
          onHome={goHome}
          headerScale={viewport.scale}
          isMobile={viewport.isMobile}
          isConsultPrimed={isReviewConsultPrimed}
        />
      ) : isCourseReviewRoute ? (
        <CourseReviewsPage
          reviewKey={activeCourseReview as CourseReviewKey}
          onBack={goBack}
          onHome={goHome}
          onPythonCourse={openPythonCoursePage}
          onReviewsDirection={openReviewsPage}
          headerScale={viewport.scale}
          isMobile={viewport.isMobile}
        />
      ) : isStudentReviewRoute ? (
        <StudentReviewPage
          reviewId={activeStudentReview as string}
          onBack={goBack}
          onHome={goHome}
          onReviewsDirection={openReviewsPage}
          headerScale={viewport.scale}
          isMobile={viewport.isMobile}
        />
      ) : isReviewsRoute ? (
        <ReviewsIndexPage
          onBack={goBack}
          onHome={goHome}
          activeDirection={activeReviewsDirection}
          onDirectionChange={openReviewsPage}
          headerScale={viewport.scale}
          isMobile={viewport.isMobile}
        />
      ) : isAboutRoute ? (
        <AboutPage
          onBack={goBack}
          onHome={goHome}
          contentScale={aboutScale}
          headerScale={viewport.scale}
          isMobile={viewport.isMobile}
        />
      ) : isPythonCourseRoute ? (
        <PythonCoursePage
          headerScale={viewport.scale}
          isMobile={viewport.isMobile}
          isMetrikaSelectorMode={isMetrikaSelectorMode}
        />
      ) : isDataScienceCourseRoute ? (
        <DataScienceCoursePage
          headerScale={viewport.scale}
          isMobile={viewport.isMobile}
        />
      ) : isFrontendCourseRoute ? (
        <FrontendCoursePage
          headerScale={viewport.scale}
          isMobile={viewport.isMobile}
        />
      ) : isDataAnalystCourseRoute ? (
        <DataAnalystCoursePage
          headerScale={viewport.scale}
          isMobile={viewport.isMobile}
        />
      ) : isCppCourseRoute ? (
        <CppCoursePage
          headerScale={viewport.scale}
          isMobile={viewport.isMobile}
        />
      ) : isMobileDeveloperCourseRoute ? (
        <MobileDeveloperCoursePage
          headerScale={viewport.scale}
          isMobile={viewport.isMobile}
        />
      ) : isUnrealEngineCourseRoute ? (
        <UnrealEngineCoursePage
          headerScale={viewport.scale}
          isMobile={viewport.isMobile}
        />
      ) : isJavaCourseRoute ? (
        <JavaCoursePage
          headerScale={viewport.scale}
          isMobile={viewport.isMobile}
        />
      ) : isMlEngineerCourseRoute ? (
        <MlEngineerCoursePage
          headerScale={viewport.scale}
          isMobile={viewport.isMobile}
        />
      ) : isTariffsRoute ? (
        <TariffsPage
          headerScale={viewport.scale}
          isMobile={viewport.isMobile}
        />
      ) : (
        <div
          ref={homeCanvasRef}
          className={["site-canvas", viewport.isMobile ? "site-canvas--mobile" : ""]
            .filter(Boolean)
            .join(" ")}
          style={canvasStyle}
        >
          {viewport.isMobile ? <MainScreenMobile /> : <MainScreen />}
        </div>
      )}
      {viewport.isMobile && isMobileMenuMounted ? (
        <nav
          aria-hidden={!isMobileMenuOpen}
          aria-label="Мобильное меню"
          className={[
            "site-mobile-menu",
            isMobileMenuOpen ? "site-mobile-menu--open" : "site-mobile-menu--closing",
          ].join(" ")}
        >
          <div className="site-mobile-menu__top">
            <button aria-label="На главную" className="site-mobile-menu__logo" data-site-home type="button">
              <img alt="ИННОПРОГ Education" title="ИННОПРОГ Education" src="/logo-education-360.webp" />
            </button>
            <button aria-label="Закрыть меню" className="site-mobile-menu__close" data-mobile-menu-toggle type="button">
              <span aria-hidden="true" />
            </button>
          </div>
          <div className="site-mobile-menu__links">
            <div className="site-mobile-menu__nav-group">
              <div className="site-mobile-menu__nav-row">
                <button
                  aria-current={!isStandaloneRoute ? "page" : undefined}
                  data-active={!isStandaloneRoute ? "true" : undefined}
                  data-mobile-menu-link
                  data-scroll-target="adults"
                  type="button"
                >
                  для взрослых
                </button>
                <button
                  aria-controls="mobile-adult-courses"
                  aria-expanded={openMobileNavGroup === "adults"}
                  aria-label="Показать направления для взрослых"
                  className="site-mobile-menu__expand"
                  data-mobile-menu-expand="adults"
                  type="button"
                >
                  <span aria-hidden="true" />
                </button>
              </div>
              <div
                aria-hidden={openMobileNavGroup !== "adults"}
                className="site-mobile-menu__submenu"
                data-open={openMobileNavGroup === "adults"}
                id="mobile-adult-courses"
              >
                {ADULT_COURSE_LINKS.map(({ label, href }) => (
                  <a href={href} key={href}>{label}</a>
                ))}
              </div>
            </div>
            <div className="site-mobile-menu__nav-group">
              <div className="site-mobile-menu__nav-row">
                <button data-mobile-menu-link data-scroll-target="children" type="button">для детей</button>
                <button
                  aria-controls="mobile-child-courses"
                  aria-expanded={openMobileNavGroup === "children"}
                  aria-label="Показать направления для детей"
                  className="site-mobile-menu__expand"
                  data-mobile-menu-expand="children"
                  type="button"
                >
                  <span aria-hidden="true" />
                </button>
              </div>
              <div
                aria-hidden={openMobileNavGroup !== "children"}
                className="site-mobile-menu__submenu"
                data-open={openMobileNavGroup === "children"}
                id="mobile-child-courses"
              >
                {CHILD_COURSE_LINKS.map(({ label, href }) => (
                  <a href={href} key={label}>{label}</a>
                ))}
              </div>
            </div>
            <button
              aria-current={isReviewRoute || isStudentReviewRoute || isReviewsRoute ? "page" : undefined}
              data-active={isReviewRoute || isStudentReviewRoute || isReviewsRoute ? "true" : undefined}
              data-mobile-menu-link
              data-scroll-target="reviews"
              type="button"
            >
              отзывы
            </button>
            <button
              aria-current={isAboutRoute ? "page" : undefined}
              data-active={isAboutRoute ? "true" : undefined}
              data-mobile-menu-link
              data-scroll-target="about"
              type="button"
            >
              о нас
            </button>
          </div>
          <button className="site-mobile-menu__cta" data-mobile-menu-link data-scroll-target="form" type="button">
            подобрать направление
          </button>
        </nav>
      ) : null}
      {!isMetrikaSelectorMode && (shouldShowLoader || isReviewTransitionLoading) ? (
        <div className="site-loader" aria-hidden={isReady && !isReviewTransitionLoading}>
          <img
            alt="ИННОПРОГ Education" title="ИННОПРОГ Education"
            className="site-loader__logo"
            decoding="async"
            fetchPriority="high"
            src="/logo_education.png"
          />
          <div className="site-loader__bar">
            <div className="site-loader__bar-fill" />
          </div>
        </div>
      ) : null}
      {
        <div
          aria-hidden={leadModalState === "closed"}
          className={[
            "site-lead-modal",
            leadModalState === "closed" ? "site-lead-modal--closed" : "",
          ].filter(Boolean).join(" ")}
          onClick={(event) => {
            if (event.target === event.currentTarget) {
              closeLeadModal();
            }
          }}
          role="presentation"
        >
          <section
            aria-label={leadModalState === "form" ? "Заявка на обучение" : "Заявка успешно отправлена"}
            aria-modal="true"
            className={[
              "site-lead-modal__card",
              leadModalState === "success" ? "site-lead-modal__card--success" : "",
            ].filter(Boolean).join(" ")}
            onClick={(event) => event.stopPropagation()}
            role="dialog"
          >
            <div className="site-lead-modal__top">
              <button className="site-lead-modal__back" onClick={closeLeadModal} type="button">
                <span aria-hidden="true">←</span>
                <span>назад</span>
              </button>
              <div className="site-lead-modal__crumbs">
                <button
                  onClick={() => {
                    closeLeadModal();
                    goHome();
                  }}
                  type="button"
                >
                  главная
                </button>
                <span aria-hidden="true">/</span>
                <strong>заявка</strong>
              </div>
            </div>

            <img alt="ИННОПРОГ Education" title="ИННОПРОГ Education" className="site-lead-modal__logo" src="/logo_white_and_black.svg" />

            {leadModalState !== "success" ? (
              <form key={leadModalState} className="site-lead-modal__form" onSubmit={handleLeadFormSubmit}>
                <h2 className="site-lead-modal__title">Записаться на обучение</h2>
                <p className="site-lead-modal__subtitle">
                  Оставьте заявку, и мы свяжемся
                  <br />
                  с Вами в ближайшее время
                </p>
                <div className="site-lead-modal__fields">
                  <input
                    aria-label="Ваше имя"
                    autoComplete="name"
                    className="site-lead-modal__input"
                    defaultValue={leadDraft.name || ""}
                    name="modal-name"
                    placeholder="Ваше имя"
                    type="text"
                  />
                  <input
                    aria-label="Номер телефона"
                    autoComplete="tel"
                    className="site-lead-modal__input"
                    defaultValue={leadDraft.phone || ""}
                    inputMode="tel"
                    name="modal-phone"
                    placeholder="+7(000)-000-00-00"
                    type="tel"
                  />
                  <input
                    aria-label="Почта"
                    autoComplete="email"
                    className="site-lead-modal__input"
                    defaultValue={leadDraft.email || ""}
                    inputMode="email"
                    name="modal-email"
                    placeholder="Почта"
                    type="email"
                  />
                  <textarea
                    aria-label="Ваш вопрос"
                    className="site-lead-modal__input site-lead-modal__textarea"
                    defaultValue={leadDraft.question || ""}
                    name="modal-question"
                    placeholder="Ваш вопрос"
                  />
                </div>
                <div
                  className="site-lead-modal__consent site-consent"
                  data-consent-toggle
                  role="checkbox"
                  tabIndex={0}
                >
                  <span className="site-lead-modal__checkbox site-consent__box">
                    <span className="site-lead-modal__checkbox-border site-consent__border" />
                    <svg className="site-consent__check" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M5 12.5 10 17l9-10" fill="none" />
                    </svg>
                  </span>
                  <span>
                    Нажимая на кнопку, вы даете&nbsp;
                    <a
                      className="site-consent__link"
                      href="https://api.innoprog.ru/files/documents/consent_to_personal_data_processing.pdf"
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      согласие на обработку персональных данных
                    </a>
                    &nbsp;и соглашаетесь с&nbsp;
                    <a
                      className="site-consent__link"
                      href="https://api.innoprog.ru/files/documents/privacy_policy.pdf"
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      политикой конфиденциальности
                    </a>
                  </span>
                </div>
                {leadFormError ? (
                  <p className="site-lead-modal__error" role="alert">
                    {leadFormError}
                  </p>
                ) : null}
                <button
                  className="site-lead-modal__submit"
                  disabled={!isConsentChecked || isLeadSubmitting}
                  type="submit"
                >
                  {isLeadSubmitting ? "отправляем..." : "отправить заявку"}
                </button>
              </form>
            ) : (
              <div className="site-lead-modal__success" role="status">
                <h2>ЗАЯВКА УСПЕШНО ОТПРАВЛЕНА!</h2>
                <p>Спасибо, что доверяте нам!</p>
                <p>
                  Администратор ИННОПРОГ свяжется с вами в ближайшее время, уточнит детали и поможет подобрать
                  подходящий формат обучения. Пожалуйста, ожидайте 🙏
                </p>
                <button className="site-lead-modal__submit" onClick={closeLeadModal} type="button">
                  закрыть
                </button>
              </div>
            )}
          </section>
        </div>
      }
      {shouldShowCookieBanner ? (
        <aside className="site-cookie-banner" aria-label="Уведомление о cookie">
          <p>
            INNOPROG использует cookie и похожие технологии для корректной работы сайта, сохранения настроек,
            аналитики и показа более подходящего контента. Продолжая пользоваться сайтом, вы соглашаетесь с их
            использованием по{" "}
            <a
              href="https://api.innoprog.ru/files/documents/privacy_policy.pdf"
              rel="noopener noreferrer"
              target="_blank"
            >
              Политике обработки персональных данных
            </a>
            .
          </p>
          <button type="button" onClick={acceptCookieConsent}>
            понятно
          </button>
        </aside>
      ) : null}
    </main>
  );
}

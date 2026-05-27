"use client";

import MainScreen, {
  MainScreenDesktopFooter,
  MainScreenDesktopHeader,
} from "../imports/MainScreenDesktop/MainScreenDesktop";
import heroBackgroundUrl from "../imports/MainScreenDesktop/559076f97b29b552f98b8ef64abca31d3d16d281.opt.webp";
import heroPersonUrl from "../imports/MainScreenDesktop/a9544174871795971e5fb7802195e10ce3fa4432.opt.webp";
import MainScreenMobile, {
  MainScreenMobileFooter,
  MainScreenMobileHeader,
} from "../imports/MainScreenMobile/MainScreenMobile";
import platformLaptopUrl from "../imports/MainScreenDesktop/apple-mockup-pro-drive-air.opt.webp";
import platformScreenUrl from "../imports/MainScreenDesktop/8203cbb984ade08a409e3cb123b62173d36af946.opt.webp";
import platformPhoneScreenUrl from "../imports/MainScreenDesktop/7e04d2ff334c194bc04be7de134120846fa4b54a.opt.webp";
import platformPhoneFrameUrl from "../imports/MainScreenDesktop/6397a5e6c95741194ffcda7e9dcc26be72b64572.opt.webp";
import reviewKirillUrl from "../imports/MainScreenDesktop/review-kirill.png";
import reviewAnastasiaUrl from "../imports/MainScreenDesktop/review-anastasia-high.webp";
import reviewMikhailUrl from "../imports/MainScreenDesktop/review-mikhail-high.webp";
import reviewStoryKirillHeroUrl from "../imports/MainScreenDesktop/review-story-kirill-hero.webp";
import reviewStoryCollaborationUrl from "../imports/MainScreenDesktop/review-story-collaboration.webp";
import reviewStoryMailUrl from "../imports/MainScreenDesktop/review-story-mail.svg";
import reviewStoryPhoneUrl from "../imports/MainScreenDesktop/review-story-phone.svg";
import reviewStoryWhatsappUrl from "../imports/MainScreenDesktop/review-story-whatsapp.svg";
import reviewStoryTelegramUrl from "../imports/MainScreenDesktop/review-story-telegram.svg";
import aboutHeroUrl from "../imports/MainScreenDesktop/about-hero.png";
import aboutSwirlUrl from "../imports/MainScreenDesktop/about-swirl.png";
import aboutInnopolisUrl from "../imports/MainScreenDesktop/about-innopolis.png";
import heroMobileUrl from "../imports/MainScreenMobile/hero-mobile.webp";
import {
  MOBILE_DESIGN_HEIGHT,
  MOBILE_DESIGN_WIDTH,
  MOBILE_SCROLL_TARGETS,
} from "./mobileLayout";
import { useEffect, useRef, useState } from "react";
import type { CSSProperties, FormEvent, KeyboardEvent, MouseEvent } from "react";

const DESKTOP_DESIGN = {
  width: 1440,
  height: 14373,
};

const ABOUT_DESIGN_WIDTH = DESKTOP_DESIGN.width;

const MOBILE_DESIGN = {
  width: MOBILE_DESIGN_WIDTH,
  height: MOBILE_DESIGN_HEIGHT,
};

const MOBILE_BREAKPOINT = 768;

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

const LOADER_MIN_MS = 650;
const LOADER_MAX_MS = 2600;
const LOADED_STORAGE_KEY = "innoprog-site-loaded";
const COOKIE_CONSENT_STORAGE_KEY = "innoprog-cookie-consent";
const LOADER_EXIT_MS = 700;
const APPLICATION_REQUEST_URL = "/api/application/request";
const TURNSTILE_TEST_KEY_PREFIX = "1x000";
const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || "";
const IS_TURNSTILE_TEMPORARILY_HIDDEN = true;
const IS_TURNSTILE_ENABLED =
  !IS_TURNSTILE_TEMPORARILY_HIDDEN &&
  Boolean(TURNSTILE_SITE_KEY) && !TURNSTILE_SITE_KEY.startsWith(TURNSTILE_TEST_KEY_PREFIX);

type LeadPayload = {
  name: string;
  phone: string;
};

type LeadDraft = Partial<LeadPayload>;

type TurnstileStatus = "idle" | "loading" | "ready" | "verified" | "error";

export type AppInitialRoute =
  | { page: "home" }
  | { page: "about" }
  | { page: "tariffs" }
  | { page: "review"; story: ReviewStoryKey };

type TurnstileApi = {
  render: (
    container: HTMLElement,
    options: {
      sitekey: string;
      theme?: "light" | "dark" | "auto";
      size?: "normal" | "compact" | "flexible";
      callback?: (token: string) => void;
      "expired-callback"?: () => void;
      "error-callback"?: () => void;
    },
  ) => string;
  remove?: (widgetId: string) => void;
};

declare global {
  interface Window {
    turnstile?: TurnstileApi;
  }
}

let turnstileScriptPromise: Promise<void> | null = null;

function loadTurnstileScript() {
  if (typeof window === "undefined") {
    return Promise.resolve();
  }

  if (window.turnstile) {
    return Promise.resolve();
  }

  if (turnstileScriptPromise) {
    return turnstileScriptPromise;
  }

  turnstileScriptPromise = new Promise((resolve, reject) => {
    const existingScript = document.querySelector<HTMLScriptElement>(
      'script[src^="https://challenges.cloudflare.com/turnstile/v0/api.js"]',
    );

    if (existingScript) {
      existingScript.addEventListener("load", () => resolve(), { once: true });
      existingScript.addEventListener("error", () => reject(new Error("turnstile-load-error")), {
        once: true,
      });
      return;
    }

    const script = document.createElement("script");

    script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
    script.async = true;
    script.defer = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("turnstile-load-error"));
    document.head.appendChild(script);
  });

  return turnstileScriptPromise;
}

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

function findLeadInputValue(scope: ParentNode, names: string[]) {
  for (const name of names) {
    const input = scope.querySelector<HTMLInputElement>(`input[name="${name}"]`);
    const value = input?.value.trim();

    if (value) {
      return value;
    }
  }

  return "";
}

function getLeadPayload(scope?: ParentNode | null): LeadPayload {
  const root = scope || document;
  const name = findLeadInputValue(root, ["name", "modal-name"]);
  const phone = normalizePhone(findLeadInputValue(root, ["phone", "modal-phone"]));

  return { name, phone };
}

function isLeadPayloadValid(payload: LeadPayload) {
  return payload.name.length >= 2 && payload.phone.replace(/\D/g, "").length >= 10;
}

async function sendLeadApplication(payload: LeadPayload, captchaToken?: string) {
  const response = await fetch(APPLICATION_REQUEST_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ...payload, captchaToken: captchaToken || "" }),
  });

  if (!response.ok) {
    throw new Error(`lead-request-failed:${response.status}`);
  }
}

const REVIEW_STORIES = {
  кирилл: {
    avatar: reviewKirillUrl,
    hero: reviewStoryKirillHeroUrl,
    name: "Кирилл",
    course: "Python-разработчик",
    transition: "Из HR → в ИТ",
    city: "Москва",
    format: "Онлайн + разборы 1:1",
    period: "10 месяцев",
    result: "Новая работа / по специальности",
    pageTitle: "как я перешёл из HR в ИТ",
    heroQuote: "“Если встретить правильного преподавателя и пройти по протоптанной дорожке — и работа найдётся, и с отчётами всё сложится”.",
    sections: [
      {
        title: "Как начался переход",
        body: [
          "Меня зовут Кирилл. До перехода в ИT я работал HR-менеджером. Со временем я понял, что прежняя профессия перестала быть для меня интересной. Хотелось развиваться в новом направлении, где больше практических задач, больше возможностей для роста и где я действительно буду чувствовать интерес к тому, чем занимаюсь.",
          "До начала обучения я был в программировании практически нулем. У меня не было опыта, поэтому сначала многое казалось новым и непривычным. Но желание разобраться и перейти в новую сферу было сильнее страха перед сложностью.",
          "Об ИННОПРОГ я узнал лично от своего друга, который ранее там уже обучался. Мне понравилось, что обучение было построено удобно и понятно, через платформу, с большим количеством практических заданий и понятной структурой. Было видно, что обучение не строится только на теории, а сразу направлено на практику.",
        ],
      },
      {
        title: "Как проходило обучение",
        body: [
          "Обучение проходило постепенно, от базовых тем к более сложным задачам. Больше всего мне запомнились именно сложные задания, потому что через них лучше всего начинаешь понимать программирование.",
          "Самые большие сложности у меня начались на темах ООП, алгоритмов и структур данных. Это был непростой этап, но именно он помог мне глубже разобраться в логике программирования и начать понимать, как разные темы связаны между собой.",
          "Занятия с наставником проходили прекрасно. Материал объяснялся доходчиво, а обратная связь действительно помогала двигаться дальше. Особенно полезными были разборы задач, потому что они помогали не просто увидеть правильное решение, а понять саму логику и ход рассуждений.",
          "Я старался использовать все занятия, которые входили в тариф. Примерно через четыре месяца обучения я почувствовал, что в голове начали складываться пазлы. При этом надежда, что я не зря учусь, была у меня с первого дня.",
        ],
      },
      {
        title: "Какой результат получился",
        body: [
          "Главный результат для меня: я поменял профессию на ту, которая мне нравится.",
          "Путь к трудоустройству получился достаточно быстрым. Примерно за один месяц. Возможно, в чём-то мне повезло, но я прошёл отбор и собеседование.",
          "Сейчас я работаю программистом в компании Tages как внешний сотрудник Lemana PRO. Моя должность инженер технической поддержки. Задачи во многом похожи на DevOps.",
          "Я занимаюсь инфраструктурной поддержкой low-code разработки, анализирую инциденты, смотрю логи, вношу изменения в конфигурации инфраструктуры под потребности пользователей. В работе использую Kubernetes, Helm, Argo CD, Tekton и другие инструменты.",
          "Обучение в ИННОПРОГ помогло мне на старте, потому что в работе часто возникают вопросы с разработкой. Навыки программирования и понимание базы очень пригодились. Особенно в начале помогло понимание API-разработки, потому что пользователи как раз с этим и работают.",
        ],
      },
      {
        title: "МОЙ ОТЗЫВ ОБ ИННОПРОГ",
        body: [
          "Понравился хорошо структурированный план обучения. Понятно, что именно нужно знать на каждом этапе и куда двигаться дальше. Еженедельные занятия с наставником подталкивали двигаться дальше, позволяя экономить большую кучу времени и нервов.",
          "Тем, кто сейчас думает перейти в ИТ, но сомневается, я бы сказал: если хочется, то обязательно нужно пробовать. Даже если на старте кажется, что ничего не понятно, со временем знания начинают складываться в систему.",
          "Главное не забрасывать и не ждать быстрых результатов.",
        ],
      },
    ],
    text: "Обучение проходило постепенно, от базовых тем к более сложным задачам. Больше всего мне запомнились именно сложные задания, потому что через них лучше всего начинаешь понимать программирование. На занятиях мы не просто повторяли теорию, а разбирали, почему решение работает именно так, где могут быть ошибки и как писать код увереннее. Постепенно я начал видеть логику в задачах, перестал бояться больших тем и понял, как двигаться дальше в IT.",
  },
  анастасия: {
    avatar: reviewAnastasiaUrl,
    hero: reviewAnastasiaUrl,
    name: "Анастасия",
    course: "Data Science",
    transition: "Из 1С → в Product",
    city: "Казань",
    format: "Онлайн + практика",
    period: "8 месяцев",
    result: "Новая роль в аналитике",
    pageTitle: "как я перешла из 1С в продукт",
    heroQuote: "“Если вам правда интересно копаться в данных, понимать, как всё устроено, искать ошибки, улучшать процессы и делать что-то полезное для людей или бизнеса, тогда стоит попробовать”.",
    sections: [
      {
        title: "Как начался переход",
        body: [
          "Меня зовут Анастасия, мне 31 год. До обучения в ИННОПРОГ я работала старшим оператором 1С. С одной стороны, у меня уже был опыт работы с ИТ-системами и понимание, как устроены процессы внутри бизнеса. С другой стороны, я всё чаще понимала, что хочу развиваться не только в сторону поддержки и настройки, а намного глубже разбираться в данных, продуктовых решениях и аналитике.",
          "Переломный момент произошёл, когда мне предложили перейти в продуктовую команду. Это была хорошая возможность для роста, но вместе с ней появилось понимание, что мне не хватает знаний по Data Science, машинному обучению и работе с данными.",
          "До этого у меня не было полноценного опыта в Data Science и ML. Я понимала какие-то базовые вещи и немного работала с данными в рамках 1С, но машинное обучение, Python, модели, библиотеки и аналитический подход были для меня новой областью. Поэтому сначала всё казалось довольно сложным и даже немного пугающим.",
          "Об ИННОПРОГ я узнала случайно, через знакомых и решила попробовать, подкупил формат индивидуального обучения. Для меня было важно, чтобы программу давали не по шаблону, а именно помогали разобраться с теми темами, которые нужны для моего перехода в продуктовую роль.",
        ],
      },
      {
        title: "Как проходило обучение",
        body: [
          "Обучение началось с базы. Сначала мы разбирали Python, работу с данными, логику написания кода и основные инструменты, которые используются в аналитике и Data Science. Постепенно программа становилась сложнее, появлялись библиотеки для анализа данных, визуализация, основы статистики, метрики, а потом уже темы, связанные с машинным обучением.",
          "Больше всего мне запомнилось, что обучение было сбалансированным. Почти каждую тему мы старались привязать к реальным задачам, по типу как анализировать данные, как искать зависимости, как оценивать результат, как не тупо построить модель, а понять, зачем она нужна и какую пользу может дать продукту.",
          "Самыми сложными для меня были темы, связанные с математикой, статистикой и логикой ML-моделей. В начале было непросто понять, чем отличаются разные подходы, почему модель может ошибаться, как оценивать качество и всё в таком роде. Очень помогали занятия с наставником, в какой-то момент всё постепенно начало складываться в систему.",
          "Занятия проходили спокойно и понятно. Мне нравилось, что можно было задавать любые вопросы, даже если они казались не всегда по учебной части. Особенно полезными были разборы практических заданий, потому что именно на них становилось понятно, где я действительно поняла тему, а где просто повторила пример.",
          "Домашние задания тоже были очень полезными, так как были адекватными и постепенно погружали меня в контекст изучаемого. Со временем появился навык не бояться новых данных и не теряться, когда задача выглядит неопределённой, а это очень частое явление в продукте, задачи без готового ТЗ.",
          "В какой-то момент я заметила, что начала по-другому смотреть на рабочие задачи. Если раньше я воспринимала данные как набор цифр и отчётов, то теперь стала задавать больше правильных вопросов: какие метрики важны, что мы хотим проверить, какие гипотезы можно построить, какие данные нужны для решения.",
        ],
      },
      {
        title: "Какой результат получился",
        body: [
          "Главный результат для меня: я стала увереннее чувствовать себя в продуктовой роли и начала понимать, как данные могут помогать в развитии продукта.",
          "После обучения мне стало проще общаться с аналитиками и разработчиками, понимать, о чём они говорят, задавать более точные вопросы и участвовать в обсуждении продуктовых решений.",
          "Сейчас я работаю в команде фин. отдела в одном желтом банке и занимаюсь задачами, связанными с развитием внутренних цифровых решений. В работе мне важно понимать пользователей, бизнес-процессы, метрики продукта и то, как на основе данных можно принимать более точные решения.",
          "Особенно пригодились навыки работы с Python, Jupyter Notebook, Power BI и Tableau, базовое понимание Scikit-learn, анализ данных, знание основных моделей машинного обучения и умение оценивать полученные результаты.",
        ],
      },
      {
        title: "Мой отзыв об INNOPROG",
        body: [
          "В ИННОПРОГ мне понравилось, что обучение было структурированным и при этом гибким. Программа помогала двигаться постепенно, не было резких скачков от понятного до супер непонятного. Для меня было особенно важно, что наставник объяснял материал простым языком и помогал связывать технические темы с реальными рабочими задачами. Благодаря этому обучение не ощущалось оторванным от жизни.",
          "Тем, кто думает идти в ИТ, Data Science или продуктовую аналитику, но сомневается, я бы сказала так: сначала честно прислушайтесь к себе. Не стоит идти туда только из-за зарплат и красивых историй об успешном успехе. ИТ нужно много думать, разбираться, искать решения и иногда долго сидеть над задачей, которая сначала вообще непонятна.",
          "Если вам правда интересно копаться в данных, понимать, как всё устроено, искать ошибки, улучшать процессы и делать что-то полезное для людей или бизнеса, тогда стоит попробовать. И не нужно ждать, что всё сразу будет легко. Но если интерес есть, постепенно многое становится понятнее.",
        ],
      },
    ],
    text: "Больше всего мне запомнилось, что обучение было сбалансированным. Почти каждую тему мы старались привязать к реальным задачам, по типу как анализировать данные, как искать зависимости, как оценивать результат, как не тупо построить модель, а понять, зачем она нужна и какую пользу может дать продукту.",
  },
  михаил: {
    avatar: reviewMikhailUrl,
    hero: reviewMikhailUrl,
    name: "Михаил",
    course: "Python-разработчик",
    transition: "Веб-приложение для сервиса",
    city: "Иннополис",
    format: "Онлайн + наставник",
    period: "9 месяцев",
    result: "Первый проект в портфолио",
    pageTitle: "как я собрал веб-приложение для своего сервиса",
    heroQuote: "“Я пришёл не за теорией ради теории, а с конкретной идеей, и постепенно довёл её до рабочего результата”.",
    sections: [
      {
        title: "Как начался переход",
        body: [
          "Всем привет, меня зовут Михаил. У меня есть небольшой сервис, связанный с обработкой клиентских заявок. Долгое время вся работа держалась на таблицах, переписках и ручных напоминаниях. Пока заявок было немного, этого хватало. Но когда поток вырос, стало понятно, что так дальше работать неудобно.",
          "Я постоянно тратил время на поиск информации, проверку статусов и повторяющиеся действия. Тогда появилась идея сделать своё веб-приложение, где можно вести клиентов, заявки, комментарии и видеть всю картину в одном месте.",
          "Сначала я думал использовать готовую CRM, но быстро понял, что под мой сервис не совсем подходит универсальное решение. Основная проблема была не только в ведении клиентов, а в том, чтобы нормально сохранять источники заявок и понимать, откуда реально приходят люди.",
          "В обычных CRM с этим часто бывают сложности. Например, часть UTM-меток теряется, рекламные идентификаторы не всегда доходят до карточки клиента, данные из разных систем хранятся отдельно, а в итоге через пару месяцев смотришь на заявки и не понимаешь, какая реклама действительно сработала.",
          "Для моего сервиса это было критично. Мне нужно было видеть не только список клиентов, но и весь путь заявки, начиная от первого перехода по рекламе до обращения, оплаты и дальнейшей работы. Поэтому я решил сделать своё веб-приложение, где можно было бы вести клиентов, заявки, статусы и сразу учитывать маркетинговые данные.",
          "Сначала я думал заказать разработку, но потом понял, что хочу сам разобраться, как всё устроено. Мне было важно не зависеть полностью от подрядчиков и понимать, как создаются веб-приложения, как работает backend, база данных, авторизация и личный кабинет.",
          "Поэтому я пришёл в ИННОПРОГ с конкретной задачей: разобраться в веб-разработке и собрать первую рабочую версию приложения для своего сервиса.",
        ],
      },
      {
        title: "Как проходило обучение в INNOPROG",
        body: [
          "На старте я не был программистом. Мог разобраться при помощи нейронки в настройках, но код писал очень мало. Поэтому обучение начали с основ.",
          "Потом постепенно перешли к backend-разработке, базам данных, SQL, API, авторизации и структуре веб-приложения. Мне понравилось, что многие темы сразу разбирали на моём проекте. Например, как хранить заявки, как сделать статусы, как связать клиента с заказом, как добавить личный кабинет и как сохранять важные данные по источникам обращений.",
          "Сложнее всего было привыкнуть к масштабу. В обычной таблице можно быстро что-то дописать. В приложении нужно заранее понимать, какие данные есть, как они связаны и что будет происходить при каждом действии пользователя.",
          "Очень помогали разборы с наставником. Когда код ломался, мы вместе находили причину ошибки и разбирали, как её избежать в следующий раз. Постепенно я начал меньше паниковать при ошибках и адекватно искать решение.",
        ],
      },
      {
        title: "Какой результат получился",
        body: [
          "В итоге я собрал рабочее веб-приложение для своего сервиса. В нём можно вести всю ту отчетность как и во многих других CRM, но с важной функцией для моего сервиса, фиксировать маркетинговые данные по каждому обращению.",
          "Это не огромная CRM, но для моего бизнеса такой инструмент уже заметно упростил работу. Стало меньше хаоса, меньше ручных проверок и больше понимания, что происходит по каждому клиенту и по каждому рекламному каналу.",
          "Больше всего пригодились Python, SQL, основы backend-разработки, работа с базой данных, API и понимание логики веб-приложений. Даже если в будущем я буду привлекать разработчиков, теперь мне проще ставить задачи и говорить с ними на одном языке.",
        ],
      },
      {
        title: "Мой отзыв об ИННОПРОГ",
        body: [
          "В ИННОПРОГ мне понравилось, что обучение было привязано к реальной задаче. Я пришёл не за теорией ради теории, а с конкретной идеей, и постепенно довёл её до рабочего результата.",
          "Для меня это был полезный опыт. Я лучше понял свой сервис, увидел, какие процессы можно упростить, и получил инструмент, который уже помогает в работе.",
          "Тем, кто хочет изучать программирование для своего проекта, я бы сказал, что это того стоит. Даже если вы не планируете становиться разработчиком, базовые знания дают больше свободы и помогают быстрее превращать идеи в понятные решения.",
        ],
      },
    ],
    text: "Очень помогали разборы с наставником. Когда код ломался, мы вместе находили причину ошибки и разбирали, как её избежать в следующий раз. Постепенно я начал меньше паниковать при ошибках и адекватно искать решение.",
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
      { text: "8 ИНДИВИДУАЛЬНЫХ ЗАНЯТИЙ В МЕСЯЦ", included: true },
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

const REVIEW_CARD_DATA: Record<
  ReviewStoryKey,
  {
    avatar: string;
    avatarClassName: string;
    name: string;
    course: string;
    transition: string;
    quote: string;
  }
> = {
  кирилл: {
    avatar: reviewStoryKirillHeroUrl,
    avatarClassName: "site-review-avatar-img--kirill",
    name: "Кирилл",
    course: "Python-разработчик",
    transition: "Из HR → в ИТ",
    quote: "Обучение проходило постепенно, от базовых тем к более сложным задачам. Больше всего мне запомнились именно сложные задания, потому что через них лучше всего начинаешь понимать программирование...",
  },
  анастасия: {
    avatar: reviewAnastasiaUrl,
    avatarClassName: "site-review-avatar-img--anastasia",
    name: "Анастасия",
    course: "Data Science",
    transition: "Из 1С → в Product",
    quote: "Больше всего мне запомнилось, что обучение было сбалансированным. Почти каждую тему мы старались привязать к реальным задачам, по типу как анализировать данные, как искать зависимости, как оценивать результат, как не тупо построить модель, а понять, зачем она нужна и какую пользу может дать продукту.",
  },
  михаил: {
    avatar: reviewMikhailUrl,
    avatarClassName: "site-review-avatar-img--mikhail",
    name: "Михаил",
    course: "Python-разработчик",
    transition: "Веб-приложение для сервиса",
    quote: "Очень помогали разборы с наставником. Когда код ломался, мы вместе находили причину ошибки и разбирали, как её избежать в следующий раз. Постепенно я начал меньше паниковать при ошибках и адекватно искать решение.",
  },
};

function getViewportState() {
  if (typeof window === "undefined") {
    return {
      isMobile: false,
      scale: 1,
      design: DESKTOP_DESIGN,
    };
  }

  const isMobile = window.innerWidth < MOBILE_BREAKPOINT;
  const design = isMobile ? MOBILE_DESIGN : DESKTOP_DESIGN;

  return {
    isMobile,
    scale: window.innerWidth / design.width,
    design,
  };
}

function getCriticalAssets(isMobile: boolean) {
  return isMobile
    ? ["/logo_education.png", heroMobileUrl, platformLaptopUrl, platformScreenUrl, platformPhoneScreenUrl, platformPhoneFrameUrl]
    : ["/logo_education.png", heroPersonUrl, heroBackgroundUrl];
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

function scrollCarousel(id: string, direction: number) {
  const carousel = document.querySelector<HTMLElement>(`[data-carousel="${id}"]`);

  if (!carousel) {
    return;
  }

  const items = Array.from(carousel.children).filter(
    (child): child is HTMLElement => child instanceof HTMLElement,
  );

  if (!items.length) {
    return;
  }

  const isCenterAligned = carousel.dataset.carouselAlign === "center";
  const paddingLeft = Number.parseFloat(window.getComputedStyle(carousel).paddingLeft) || 0;
  const activeAnchor = isCenterAligned ? carousel.clientWidth / 2 : paddingLeft;
  const activeIndex = items.reduce((nearestIndex, item, index) => {
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
  const targetIndex = Math.max(0, Math.min(items.length - 1, activeIndex + direction));
  const item = items[targetIndex];
  const maxScrollLeft = carousel.scrollWidth - carousel.clientWidth;
  const targetLeft = isCenterAligned
    ? item.offsetLeft - ((carousel.clientWidth - item.offsetWidth) / 2)
    : item.offsetLeft - paddingLeft;

  carousel.scrollTo({
    left: Math.max(0, Math.min(maxScrollLeft, targetLeft)),
    behavior: "smooth",
  });
}

function scrollCarouselTo(id: string, index: number) {
  const carousel = document.querySelector<HTMLElement>(`[data-carousel="${id}"]`);

  if (!carousel) {
    return;
  }

  const items = Array.from(carousel.children).filter(
    (child): child is HTMLElement => child instanceof HTMLElement,
  );
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

function getRouteFromLocation(): AppInitialRoute {
  if (typeof window === "undefined") {
    return { page: "home" };
  }

  const hash = window.location.hash;

  if (hash === "#/about") {
    window.history.replaceState(null, "", "/about");
    return { page: "about" };
  }

  if (hash === "#/tariffs") {
    window.history.replaceState(null, "", "/tariffs");
    return { page: "tariffs" };
  }

  const hashStory = getReviewStoryFromHash();

  if (hashStory) {
    window.history.replaceState(null, "", `/reviews/${REVIEW_ROUTES[hashStory]}`);
    return { page: "review", story: hashStory };
  }

  const pathStory = getReviewStoryFromPathname(window.location.pathname);

  if (pathStory) {
    return { page: "review", story: pathStory };
  }

  if (window.location.pathname === "/about") {
    return { page: "about" };
  }

  if (window.location.pathname === "/tariffs") {
    return { page: "tariffs" };
  }

  return { page: "home" };
}

function getRouteState(route: AppInitialRoute) {
  return {
    activeReviewStory: route.page === "review" ? route.story : null,
    isAboutRoute: route.page === "about",
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
      title: `История ${REVIEW_STORIES[story].name}`,
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
      <img alt="" className="site-review-page__footer-logo" src="/logo_education.png" />
      <div className="site-review-page__footer-columns">
        <section>
          <h2>Контакты</h2>
          <a href="tel:+79586067980">Тел.: +7 (958) 606-79-80</a>
          <a href="mailto:educatio@innoprog.ru">Email: educatio@innoprog.ru</a>
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
        <a aria-label="Написать на почту" href="mailto:educatio@innoprog.ru"><img alt="" src={reviewStoryMailUrl} /></a>
        <a aria-label="Позвонить" href="tel:+79586067980"><img alt="" src={reviewStoryPhoneUrl} /></a>
        <a aria-label="WhatsApp" href="https://wa.me/79934099057?text=Добрый%20день%21%20Хочу%20приобрести%20обучение%20по%20профессии%20Python-разработчик" rel="noopener noreferrer" target="_blank"><img alt="" src={reviewStoryWhatsappUrl} /></a>
        <a aria-label="Telegram" href="https://t.me/innoprog_admin" rel="noopener noreferrer" target="_blank"><img alt="" src={reviewStoryTelegramUrl} /></a>
      </div>
      <p className="site-review-page__footer-company">
        {`Общество с ограниченной ответственностью "ИННОПРОГ"`}
        <br aria-hidden="true" />
        ИНН 1683011286 ОГРН 1221600105440
        <br aria-hidden="true" />
        ОКВЭД: 62.09 (основной), 62.02
        <br aria-hidden="true" />
        Коды видов деятельности в области ИТ: 16.01 (основной), 1.01, 1.12
      </p>
    </footer>
  );
}

function SitePageHeader({
  logoSrc = "/logo_education.png",
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
      <button className="site-review-page__logo" data-site-home onClick={onHome} type="button">
        <img alt="ИННОПРОГ Education" src={logoSrc} />
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

function RelatedReviewCard({ storyKey }: { storyKey: ReviewStoryKey }) {
  const review = REVIEW_CARD_DATA[storyKey];

  return (
    <button
      aria-label={`Открыть историю: ${REVIEW_STORY_CARD_TITLES[storyKey]}`}
      className="site-related-review-card"
      data-name="отзыв"
      data-review-story={storyKey}
      type="button"
    >
      <span aria-hidden="true" className="site-related-review-card__border" />
      <span className="site-related-review-card__profile">
        <span className="site-related-review-card__person">
          <span className="site-related-review-card__avatar">
            <img alt="" className={review.avatarClassName} loading="lazy" src={review.avatar} />
          </span>
          <strong>{review.name}</strong>
        </span>
        <span className="site-related-review-card__course">{`Выпускник курса: ${review.course}`}</span>
      </span>
      <span className="site-related-review-card__body">
        <span className="site-review-quote">{review.quote}</span>
        <span className="site-related-review-card__transition">{review.transition}</span>
      </span>
    </button>
  );
}

function ReviewStoryPage({
  storyKey,
  onBack,
  headerScale,
  isMobile,
}: {
  storyKey: ReviewStoryKey;
  onBack: () => void;
  headerScale: number;
  isMobile: boolean;
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
            <button onClick={onBack} type="button">главная</button>
            <span aria-hidden="true">/</span>
            <strong>отзыв</strong>
          </div>
        </div>

        <div className="site-review-page__title">
          <h1>
            <span>{storyKey === "кирилл" ? "История Кирилла:" : `История ${story.name}:`}</span>
            <strong>{story.pageTitle}</strong>
          </h1>
        </div>

        <div className="site-review-page__hero">
          <img alt="" src={story.hero} />
        </div>

        <blockquote className="site-review-page__quote">{story.heroQuote}</blockquote>

        <div className="site-review-page__content">
          <aside className="site-review-page__summary" aria-label="Кратко о результате">
            <h2>кратко о результате</h2>
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

        <section className="site-review-page__free">
          <div>
            <h2>Попробуйте себя в новой профессии бесплатно</h2>
            <p>Получите вводный план по профессии, первый практический кейс и рекомендации по развитию навыков.</p>
          </div>
        </section>
        <button className="site-review-page__consult" type="button">получить консультацию</button>

        <section className="site-review-page__other" aria-label="Другие истории">
          <h2>другие истории</h2>
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
  contentScale,
  headerScale,
  isMobile,
}: {
  onBack: () => void;
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
            <button onClick={onBack} type="button">главная</button>
            <span aria-hidden="true">/</span>
            <strong>о нас</strong>
          </div>
        </div>

        <section className="site-about-hero">
          <img alt="" src={aboutHeroUrl} />
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
              <img alt="" src={aboutSwirlUrl} />
            </div>

            <article className="site-about-card site-about-card--purple">
              <p>Мы стремимся сделать качественное ИТ-образование доступным, понятным и по-настоящему полезным для тех, кто хочет уверенно развиваться в сфере технологий.</p>
              <p>В основе нашего подхода — последовательное обучение, адаптация программы под уровень и цели ученика, а также внимание к практическому применению знаний</p>
            </article>
          </section>

          <section className="site-about-mission">
            <div>
              <h2>наша миссия:</h2>
              <p>Дать ученикам не только теоретическую основу, но и реальные инструменты для дальнейшего роста: от первых шагов в программировании до более уверенного освоения прикладных навыков, необходимых для учебы, собственных проектов и будущей профессиональной реализации.</p>
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
              <img alt="Иннополис" src={aboutInnopolisUrl} />
              <div>
                <p>Наше сотрудничество с Иннополисом базируется на реализации эффективного образовательного процесса ИННОПРОГ.</p>
                <p>Совместные усилия дают возможность для развития образовательной платформы и её методических материалов, а также использования современных методов обучения.</p>
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
    <section className="site-tariffs-page" aria-label="Тарифы">
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

function TurnstileChallenge({
  onStatusChange,
  onTokenChange,
}: {
  onStatusChange: (status: TurnstileStatus) => void;
  onTokenChange: (token: string) => void;
}) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const statusRef = useRef(onStatusChange);
  const tokenRef = useRef(onTokenChange);

  useEffect(() => {
    statusRef.current = onStatusChange;
    tokenRef.current = onTokenChange;
  }, [onStatusChange, onTokenChange]);

  useEffect(() => {
    if (!IS_TURNSTILE_ENABLED) {
      statusRef.current("verified");
      tokenRef.current("");
      return;
    }

    let cancelled = false;
    let widgetId: string | null = null;

    statusRef.current("loading");
    tokenRef.current("");

    loadTurnstileScript()
      .then(() => {
        if (cancelled || !containerRef.current || !window.turnstile) {
          return;
        }

        widgetId = window.turnstile.render(containerRef.current, {
          sitekey: TURNSTILE_SITE_KEY,
          theme: "light",
          size: "flexible",
          callback: (token) => {
            tokenRef.current(token);
            statusRef.current("verified");
          },
          "expired-callback": () => {
            tokenRef.current("");
            statusRef.current("ready");
          },
          "error-callback": () => {
            tokenRef.current("");
            statusRef.current("error");
          },
        });
        statusRef.current("ready");
      })
      .catch(() => {
        if (!cancelled) {
          tokenRef.current("");
          statusRef.current("error");
        }
      });

    return () => {
      cancelled = true;

      if (widgetId && window.turnstile?.remove) {
        window.turnstile.remove(widgetId);
      }
    };
  }, []);

  return <div className="site-turnstile" ref={containerRef} />;
}

export default function App({
  initialRoute = { page: "home" },
}: {
  initialRoute?: AppInitialRoute;
}) {
  const initialRouteState = getRouteState(initialRoute);
  const [viewport, setViewport] = useState(getViewportState);
  const [leadModalState, setLeadModalState] = useState<"closed" | "form" | "success">("closed");
  const [activeReviewStory, setActiveReviewStory] = useState<ReviewStoryKey | null>(
    initialRouteState.activeReviewStory,
  );
  const [isAboutRoute, setIsAboutRoute] = useState(initialRouteState.isAboutRoute);
  const [isTariffsRoute, setIsTariffsRoute] = useState(initialRouteState.isTariffsRoute);
  const [isReady, setIsReady] = useState(hasLoadedInSession);
  const [shouldShowLoader, setShouldShowLoader] = useState(() => !hasLoadedInSession());
  const [isConsentChecked, setIsConsentChecked] = useState(false);
  const [isConsentError, setIsConsentError] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [leadDraft, setLeadDraft] = useState<LeadDraft>({});
  const [leadCaptchaToken, setLeadCaptchaToken] = useState("");
  const [leadCaptchaStatus, setLeadCaptchaStatus] = useState<TurnstileStatus>("idle");
  const [leadFormError, setLeadFormError] = useState("");
  const [isLeadSubmitting, setIsLeadSubmitting] = useState(false);
  const [shouldShowCookieBanner, setShouldShowCookieBanner] = useState(() => !hasCookieConsent());

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
    const handleResize = () => {
      setViewport(getViewportState());
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (!viewport.isMobile) {
      setIsMobileMenuOpen(false);
    }
  }, [viewport.isMobile]);

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
      setIsAboutRoute(routeState.isAboutRoute);
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
        '[data-carousel]:not([data-carousel="teachers"]):not([data-carousel="reviews"]):not([data-carousel="mobile-teachers"]):not([data-carousel="mobile-directions"])',
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
  }, [viewport.isMobile]);

  useEffect(() => {
    const carousels = Array.from(
      document.querySelectorAll<HTMLElement>("[data-carousel][data-carousel-sync]"),
    );

    const syncCarouselDots = (carousel: HTMLElement) => {
      const id = carousel.dataset.carousel;

      if (!id) {
        return;
      }

      const items = Array.from(carousel.children).filter(
        (child): child is HTMLElement => child instanceof HTMLElement,
      );
      let activeIndex = 0;
      let nearestDistance = Number.POSITIVE_INFINITY;
      const paddingLeft = Number.parseFloat(window.getComputedStyle(carousel).paddingLeft) || 0;
      const isCenterAligned = carousel.dataset.carouselAlign === "center";
      const activeAnchor = isCenterAligned ? carousel.clientWidth / 2 : 0;

      if (carousel.dataset.carouselInitialized !== "true") {
        const initialIndex = Number(carousel.dataset.carouselInitialIndex);
        const initialItem = Number.isFinite(initialIndex) ? items[initialIndex] : null;

        if (initialItem) {
          const maxScrollLeft = carousel.scrollWidth - carousel.clientWidth;
          const targetLeft = isCenterAligned
            ? initialItem.offsetLeft - ((carousel.clientWidth - initialItem.offsetWidth) / 2)
            : initialItem.offsetLeft - paddingLeft;

          carousel.scrollTo({
            left: Math.max(0, Math.min(maxScrollLeft, targetLeft)),
            behavior: "auto",
          });
        }

        carousel.dataset.carouselInitialized = "true";
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

      items.forEach((item, index) => {
        const isActive = index === activeIndex;

        item.dataset.active = String(isActive);
        item.setAttribute("aria-current", isActive ? "true" : "false");
      });

      document
        .querySelectorAll<HTMLElement>(`[data-carousel-dot][data-carousel-target="${id}"]`)
        .forEach((dot, index) => {
          const isActive = index === activeIndex;

          dot.dataset.active = String(isActive);
          dot.setAttribute("aria-current", isActive ? "true" : "false");
        });
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
  }, [viewport.isMobile]);

  useEffect(() => {
    document
      .querySelectorAll("[data-consent-toggle]")
      .forEach((toggle) => toggle.setAttribute("aria-checked", String(isConsentChecked)));
  }, [isConsentChecked, viewport.isMobile, leadModalState]);

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
    setLeadCaptchaToken("");
    setLeadCaptchaStatus("idle");
  };

  const closeLeadModal = () => {
    setLeadModalState("closed");
    setIsConsentError(false);
    setLeadFormError("");
    setLeadDraft({});
    setLeadCaptchaToken("");
    setLeadCaptchaStatus("idle");
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

  const openReviewStory = (story: string | undefined) => {
    const key = story as ReviewStoryKey | undefined;

    if (!key || !(key in REVIEW_STORIES)) {
      return;
    }

    const nextPath = `/reviews/${REVIEW_ROUTES[key]}`;

    if (window.location.pathname !== nextPath || window.location.hash) {
      window.history.pushState(null, "", nextPath);
    }

    setActiveReviewStory(key);
    setIsAboutRoute(false);
    setIsTariffsRoute(false);
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "instant" });
  };

  const goHome = () => {
    if (
      window.location.pathname !== "/" ||
      window.location.hash
    ) {
      window.history.pushState(null, "", "/");
    }

    setActiveReviewStory(null);
    setIsAboutRoute(false);
    setIsTariffsRoute(false);
    window.scrollTo({ top: 0, behavior: "instant" });
  };

  const openAboutPage = () => {
    if (window.location.pathname !== "/about" || window.location.hash) {
      window.history.pushState(null, "", "/about");
    }

    setActiveReviewStory(null);
    setIsAboutRoute(true);
    setIsTariffsRoute(false);
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "instant" });
  };

  const openTariffsPage = () => {
    if (window.location.pathname !== "/tariffs" || window.location.hash) {
      window.history.pushState(null, "", "/tariffs");
    }

    setActiveReviewStory(null);
    setIsAboutRoute(false);
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
    if (!isConsentChecked) {
      setIsConsentError(true);
      return;
    }

    const payload = getLeadPayload(source);

    setLeadDraft(payload);

    if (!isLeadPayloadValid(payload)) {
      setLeadFormError("Заполните имя и корректный номер телефона.");

      if (leadModalState === "closed") {
        setLeadModalState("form");
      }

      return;
    }

    if (IS_TURNSTILE_ENABLED && !leadCaptchaToken) {
      setLeadFormError("Пройдите проверку и отправьте заявку еще раз.");

      if (leadModalState === "closed") {
        setLeadModalState("form");
      }

      return;
    }

    setIsLeadSubmitting(true);
    setLeadFormError("");

    try {
      await sendLeadApplication(payload, leadCaptchaToken);
      setLeadModalState("success");
      setLeadDraft({});
      setLeadCaptchaToken("");
      setLeadCaptchaStatus("idle");
    } catch {
      setLeadFormError("Не удалось отправить заявку. Проверьте данные и попробуйте еще раз.");
      setLeadCaptchaToken("");
      setLeadCaptchaStatus("ready");
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
      setIsMobileMenuOpen((open) => !open);
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
        openReviewStory("кирилл");
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

    const reviewStoryTrigger = target?.closest<HTMLElement>("[data-review-story]");

    if (reviewStoryTrigger) {
      event.preventDefault();
      openReviewStory(reviewStoryTrigger.dataset.reviewStory);
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
        openReviewStory("кирилл");
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
        openReviewStory("кирилл");
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

    if (text.includes("для взрослых")) {
      goHome();
      return;
    }

    if (text.includes("для детей")) {
      openChildrenPage();
      return;
    }

    if (text === "отзывы" || text.includes("смотреть все отзывы")) {
      openReviewStory("кирилл");
      return;
    }

    if (text === "о нас") {
      openAboutPage();
      return;
    }

    if (text.includes("во всех тарифах") || text === "тарифы") {
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

    if (text.includes("начать обучение") || text.includes("начать бесплатно")) {
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
      target?.closest("[data-review-story]") &&
      (event.key === "Enter" || event.key === " ")
    ) {
      event.preventDefault();
      openReviewStory(target.closest<HTMLElement>("[data-review-story]")?.dataset.reviewStory);
      return;
    }

    if (
      target?.closest("[data-consent-toggle]") &&
      (event.key === "Enter" || event.key === " ")
    ) {
      event.preventDefault();
      toggleConsent();
    }
  };

  const activeDesign = viewport.design;
  const isReviewRoute = Boolean(activeReviewStory);
  const isStandaloneRoute = isReviewRoute || isAboutRoute || isTariffsRoute;
  const viewportWidth = activeDesign.width * viewport.scale;
  const aboutScale = viewportWidth / ABOUT_DESIGN_WIDTH;
  const canvasStyle = {
    width: `${activeDesign.width}px`,
    height: `${activeDesign.height}px`,
    transform: viewport.isMobile ? `scale(${viewport.scale})` : "none",
    zoom: viewport.isMobile ? undefined : viewport.scale,
  } as CSSProperties & { zoom?: number };

  return (
    <main
      aria-busy={!isReady}
      className={[
        "site-shell",
        isReady ? "site-shell--ready" : "",
        viewport.isMobile ? "site-shell--mobile" : "",
        isReviewRoute ? "site-shell--review-route" : "",
        isAboutRoute ? "site-shell--about-route" : "",
        isTariffsRoute ? "site-shell--tariffs-route" : "",
        isConsentChecked ? "site-shell--consent-checked" : "",
        isConsentError ? "site-shell--consent-error" : "",
      ].filter(Boolean).join(" ")}
      onClick={handleSiteClick}
      onKeyDown={handleSiteKeyDown}
      style={isStandaloneRoute ? undefined : { minHeight: `${Math.ceil(activeDesign.height * viewport.scale)}px` }}
    >
      {isReviewRoute ? (
        <ReviewStoryPage
          storyKey={activeReviewStory as ReviewStoryKey}
          onBack={goHome}
          headerScale={viewport.scale}
          isMobile={viewport.isMobile}
        />
      ) : isAboutRoute ? (
        <AboutPage
          onBack={goHome}
          contentScale={aboutScale}
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
          className={["site-canvas", viewport.isMobile ? "site-canvas--mobile" : ""]
            .filter(Boolean)
            .join(" ")}
          style={canvasStyle}
        >
          {viewport.isMobile ? <MainScreenMobile /> : <MainScreen />}
        </div>
      )}
      {viewport.isMobile && isMobileMenuOpen ? (
        <nav className="site-mobile-menu" aria-label="Мобильное меню">
          <div className="site-mobile-menu__top">
            <button aria-label="На главную" className="site-mobile-menu__logo" data-site-home type="button">
              <img alt="ИННОПРОГ Education" src="/logo_education.png" />
            </button>
            <button aria-label="Закрыть меню" className="site-mobile-menu__close" data-mobile-menu-toggle type="button">
              <span aria-hidden="true" />
            </button>
          </div>
          <div className="site-mobile-menu__links">
            <button
              aria-current={!isStandaloneRoute ? "page" : undefined}
              data-active={!isStandaloneRoute ? "true" : undefined}
              data-mobile-menu-link
              data-scroll-target="adults"
              type="button"
            >
              для взрослых
            </button>
            <button data-mobile-menu-link data-scroll-target="children" type="button">для детей</button>
            <button
              aria-current={isReviewRoute ? "page" : undefined}
              data-active={isReviewRoute ? "true" : undefined}
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
      {shouldShowLoader ? (
        <div className="site-loader" aria-hidden={isReady}>
          <img
            alt=""
            className="site-loader__logo"
            decoding="async"
            src="/logo_education.png"
          />
          <div className="site-loader__bar">
            <div className="site-loader__bar-fill" />
          </div>
        </div>
      ) : null}
      {leadModalState !== "closed" ? (
        <div
          className="site-lead-modal"
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

            <img alt="ИННОПРОГ Education" className="site-lead-modal__logo" src="/logo_white_and_black.svg" />

            {leadModalState === "form" ? (
              <form className="site-lead-modal__form" onSubmit={handleLeadFormSubmit}>
                <p className="site-lead-modal__subtitle">
                  Оставьте заявку, и мы свяжемся
                  <br />
                  с Вами в ближайшее время
                </p>
                <div className="site-lead-modal__fields">
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
                    aria-label="Ваше имя"
                    autoComplete="name"
                    className="site-lead-modal__input"
                    defaultValue={leadDraft.name || ""}
                    name="modal-name"
                    placeholder="Ваше имя"
                    type="text"
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
                {IS_TURNSTILE_ENABLED ? (
                  <div className="site-lead-modal__captcha">
                    <TurnstileChallenge
                      onStatusChange={setLeadCaptchaStatus}
                      onTokenChange={setLeadCaptchaToken}
                    />
                  </div>
                ) : null}
                {leadFormError ? (
                  <p className="site-lead-modal__error" role="alert">
                    {leadFormError}
                  </p>
                ) : null}
                <button
                  className="site-lead-modal__submit"
                  disabled={isLeadSubmitting || (IS_TURNSTILE_ENABLED && leadCaptchaStatus === "error")}
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
      ) : null}
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

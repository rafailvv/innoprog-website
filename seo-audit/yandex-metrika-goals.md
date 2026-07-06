# Цели Яндекс.Метрики

Счетчик: `110454081`

Эти идентификаторы отправляются сайтом через `ym(110454081, "reachGoal", goalId, params)`.

## Основные конверсионные цели

| ID цели | Что означает |
|---|---|
| `lead_form_open` | пользователь открыл форму заявки |
| `lead_form_submit_attempt` | пользователь нажал отправку заявки |
| `lead_form_submit_success` | заявка успешно отправлена на сервер |
| `lead_form_submit_error` | ошибка отправки заявки |
| `lead_form_validation_error` | пользователь попытался отправить некорректно заполненную форму |
| `lead_form_consent_missing` | пользователь попытался отправить форму без согласия |
| `lead_form_consent_accept` | пользователь поставил согласие на обработку данных |
| `lead_form_captcha_missing` | captcha не пройдена, если она будет включена |

Главная цель для рекламы и SEO-конверсий: `lead_form_submit_success`.

## Контакты

| ID цели | Что означает |
|---|---|
| `contact_phone_click` | клик по телефону |
| `contact_email_click` | клик по email |
| `contact_telegram_click` | клик по Telegram |
| `contact_whatsapp_click` | клик по WhatsApp |

## Навигация и интерес к разделам

| ID цели | Что означает |
|---|---|
| `course_open` | переход на любую страницу курса, в параметрах передается `course` |
| `course_open_python` | переход на курс Python |
| `course_open_data_science` | переход на курс Data Science |
| `course_open_frontend` | переход на курс Frontend |
| `course_open_data_analyst` | переход на курс Data-аналитик |
| `course_open_cpp` | переход на курс C++ |
| `course_open_mobile_developer` | переход на курс Мобильный разработчик |
| `course_open_unreal_engine` | переход на курс Unreal Engine |
| `course_open_java` | переход на курс Java |
| `course_open_ml_engineer` | переход на курс ML-инженер |
| `tariffs_open` | переход на страницу тарифов |
| `reviews_open` | переход на страницу отзывов, в параметрах передается `direction` |
| `about_open` | переход на страницу о школе |
| `children_school_click` | переход на детское направление на внешнем домене |

## Отзывы и доверие

| ID цели | Что означает |
|---|---|
| `review_story_open` | открытие истории ученика |
| `course_review_open` | открытие отзыва курса |
| `student_review_open` | открытие отзыва ученика |

## Документы и внешние ссылки

| ID цели | Что означает |
|---|---|
| `document_click` | клик по PDF/документу |
| `external_link_click` | клик по внешней ссылке, кроме отдельно выделенных контактов |
| `cookie_accept` | принятие cookie-баннера |

## Настройка в интерфейсе Метрики

В Яндекс.Метрике нужно создать цели типа `JavaScript-событие` с указанными ID. Рекомендуемый минимум для рекламы:

- `lead_form_submit_success`
- `contact_phone_click`
- `contact_telegram_click`
- `contact_whatsapp_click`
- `lead_form_open`
- `tariffs_open`

Остальные цели полезны для анализа воронки, UX и SEO-поведения.

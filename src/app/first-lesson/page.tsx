import { ResponsiveSiteFooter } from "../components/ResponsiveSiteFooter";
import styles from "../components/SiteInformation.module.css";
import { FIRST_LESSON_GUIDE } from "../firstLessonLinks";
import { createPageMetadata } from "../seo";

export const metadata = createPageMetadata({
  title: "Памятка к первому занятию",
  description: "Как подготовить компьютер, подключиться к первому онлайн-занятию и проверить микрофон",
  path: FIRST_LESSON_GUIDE,
});

export default function FirstLessonPage() {
  return (
    <div className={styles.surface}>
      <main className={styles.page}>
        <a href="/">← На главную</a>
        <h1>Памятка к первому занятию</h1>
        <p>Подготовьтесь за 5–10 минут до урока</p>
        <ol className={styles.steps} role="list">
          <li>
            <h2>Подготовьте компьютер</h2>
            <p>Обновите Яндекс Браузер или другой привычный браузер. Если хотите войти через приложение, заранее установите Zoom</p>
          </li>
          <li>
            <h2>Подключитесь по ссылке</h2>
            <p>Откройте ссылку из сообщения о записи. Разрешите доступ к микрофону и камере в приложении Zoom или в браузере</p>
          </li>
          <li>
            <h2>Проверьте микрофон и звук</h2>
            <p>Выберите микрофон в настройках звука и скажите несколько слов. Убедитесь, что индикатор микрофона реагирует, а тестовый звук слышен в наушниках или колонках</p>
          </li>
        </ol>
        <p>Если ссылка не открывается или вас не слышно, <a href="https://t.me/innoprog_admin">напишите менеджеру в Telegram</a> или <a href="tel:+79586067980">позвоните нам</a></p>
      </main>
      <ResponsiveSiteFooter />
    </div>
  );
}

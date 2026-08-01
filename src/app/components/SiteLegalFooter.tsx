import React from "react";
import reviewStoryMailUrl from "../../imports/MainScreenDesktop/review-story-mail.svg";
import reviewStoryPhoneUrl from "../../imports/MainScreenDesktop/review-story-phone.svg";
import reviewStoryTelegramUrl from "../../imports/MainScreenDesktop/review-story-telegram.svg";
import reviewStoryWhatsappUrl from "../../imports/MainScreenDesktop/review-story-whatsapp.svg";
import { FooterLegalDetails } from "../FooterLegalDetails";
import { EDUCATION_DISCLOSURE_LABEL, LEGAL_LINKS } from "../legalLinks";

export function SiteLegalFooter() {
  return (
    <footer className="site-review-page__footer">
      <img
        alt="ИННОПРОГ Education"
        className="site-review-page__footer-logo"
        src="/logo-education-360.webp"
        title="ИННОПРОГ Education"
      />
      <div className="site-review-page__footer-columns">
        <section>
          <h2>Контакты</h2>
          <a href="tel:+79586067980">Тел.: +7 (958) 606-79-80</a>
          <a href="mailto:education@innoprog.ru">Email: education@innoprog.ru</a>
          <a href="https://t.me/innoprog_admin" rel="noopener noreferrer" target="_blank">Telegram: @innoprog_admin</a>
          <a className="site-education-disclosure-link" href={LEGAL_LINKS.educationDisclosure}>
            {EDUCATION_DISCLOSURE_LABEL}
          </a>
        </section>
        <section>
          <h2>Адреса</h2>
          <p>г. Иннополис, ул. Университетская, д. 5, помещ. 115, р. м. 15/2</p>
          <p>420500, Республика Татарстан, Верхнеуслонский муниципальный район</p>
        </section>
        <section>
          <h2>Правовая информация</h2>
          <a href={LEGAL_LINKS.privacy} rel="noopener noreferrer" target="_blank">Политика конфиденциальности</a>
          <a href={LEGAL_LINKS.offer} rel="noopener noreferrer" target="_blank">Публичная оферта</a>
          <a href={LEGAL_LINKS.softwareOperationManual} rel="noopener noreferrer" target="_blank">Инструкция по эксплуатации</a>
          <a href={LEGAL_LINKS.functionalCharacteristics} rel="noopener noreferrer" target="_blank">Описание функциональных характеристик</a>
        </section>
      </div>
      <div className="site-review-page__socials" aria-label="Контакты и социальные сети">
        <a aria-label="Написать на почту" href="mailto:education@innoprog.ru"><img alt="" src={reviewStoryMailUrl} /></a>
        <a aria-label="Позвонить" href="tel:+79586067980"><img alt="" src={reviewStoryPhoneUrl} /></a>
        <a aria-label="WhatsApp" href="https://wa.me/79934099057?text=Добрый%20день%21%20Хочу%20приобрести%20обучение" rel="noopener noreferrer" target="_blank"><img alt="" src={reviewStoryWhatsappUrl} /></a>
        <a aria-label="Telegram" href="https://t.me/innoprog_admin" rel="noopener noreferrer" target="_blank"><img alt="" src={reviewStoryTelegramUrl} /></a>
      </div>
      <p className="site-review-page__footer-company"><FooterLegalDetails /></p>
    </footer>
  );
}

import { MynauiTelegram, TablerPhoneCall } from "./ContactIcons";
import { MAX_CONTACT_URL, MaxIcon } from "./MaxFooterLink";

export const TRIAL_APPLICATION_HREF = "/application";

const PHONE_HREF = "tel:+79586067980";
const PHONE_LABEL = "+7 (958) 606-79-80";

export function HeaderContactLinks({ variant }: { variant: "desktop" | "mobile" | "menu" }) {
  return (
    <div className={`site-header-contacts site-header-contacts--${variant}`}>
      <a
        aria-label="Написать в Telegram"
        href="https://t.me/innoprog_admin"
        rel="noopener noreferrer"
        target="_blank"
      >
        <MynauiTelegram />
      </a>
      {variant !== "mobile" && (
        <a aria-label="Написать в MAX" href={MAX_CONTACT_URL} rel="noopener noreferrer" target="_blank">
          <MaxIcon className="site-header-contacts__max" />
        </a>
      )}
      <a aria-label={`Позвонить ${PHONE_LABEL}`} href={PHONE_HREF} title={PHONE_LABEL}>
        <TablerPhoneCall />
      </a>
    </div>
  );
}

export function MobileMenuContacts() {
  return (
    <div className="site-mobile-menu__contacts">
      <a href={PHONE_HREF}>{PHONE_LABEL}</a>
      <p>Пн-Пт, 09:00-21:00 МСК</p>
      <HeaderContactLinks variant="menu" />
    </div>
  );
}

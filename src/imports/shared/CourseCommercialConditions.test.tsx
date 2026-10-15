import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import MainDesktop from "../MainScreenDesktop/MainScreenDesktop";
import MainMobile from "../MainScreenMobile/MainScreenMobile";
import { courseFaqItems } from "../courseFaqData";

describe("published commercial conditions", () => {
  it("retains seven FAQs and a compact answer count", () => {
    expect(courseFaqItems).toHaveLength(7);
    expect(courseFaqItems.reduce((sum, item) => sum + item.answer.length, 0)).toBeLessThanOrEqual(25);
  });

  it("distinguishes the introductory lesson and teacher feedback from an unlimited support promise", () => {
    const answer = courseFaqItems[2].answer.join(" ");
    expect(answer).toContain("до 45 минут");
    expect(answer).toContain("до приобретения абонемента");
    expect(answer).toContain("48 часов в рабочие дни");
    expect(answer).toContain("бесплатное ознакомительное занятие с новым специалистом");
  });

  it("qualifies the retraining diploma by program, assessment and prior education", () => {
    const answer = courseFaqItems[5].answer.join(" ");
    expect(answer).toContain("программы ДПО и успешной итоговой аттестации");
    expect(answer).toContain("среднее профессиональное или высшее образование");
    expect(answer).toContain("если это предусмотрено программой");
    expect(answer).not.toContain("получает диплом IT-школы INNOPROG по выбранному направлению и диплом");
  });

  it("explains the purchased period and qualified refund without requiring subsequent purchases", () => {
    const answer = courseFaqItems[6].answer.join(" ");
    expect(answer).toContain("предоплатой 100%");
    expect(answer).toContain("покупать следующие месяцы необязательно");
    expect(answer).toContain("education@innoprog.ru");
    expect(answer).toContain("предоставленного доступа, занятий и подтверждённых расходов");
    expect(courseFaqItems[6].links?.some((link) => link.href === "/oferta")).toBe(true);
  });

  it.each([["desktop", MainDesktop], ["mobile", MainMobile]] as const)("keeps career conditions and teacher timing explicit on %s", (_variant, Screen) => {
    const html = renderToStaticMarkup(<Screen />);
    expect(html).not.toContain("круглосуточная поддержка");
    expect(html).toContain("«Расширенный» и «Персональный»");
    expect(html).toContain("48 ч");
    expect(html).toContain("«Персональный»");
    expect(html).toContain("Условия тарифов");
  });
});

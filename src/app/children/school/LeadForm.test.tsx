import { afterEach, describe, expect, it, vi } from "vitest";
import {
  fireEvent,
  render,
  screen,
  waitFor,
  cleanup,
} from "@testing-library/react";
import { forwardRef, useImperativeHandle } from "react";
import LeadForm, { formatChildrenPhone, normalizeChildrenPhone } from "./LeadForm";
import * as analytics from "../../analytics";
const { requestToken } = vi.hoisted(() => ({ requestToken: vi.fn(async () => "test-captcha-token") }));
vi.mock("../../components/YandexSmartCaptcha", () => ({
  YandexSmartCaptcha: forwardRef(function Captcha(_props, ref) {
    useImperativeHandle(ref, () => ({
      requestToken,
    }));
    return null;
  }),
}));
afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
  requestToken.mockReset();
  requestToken.mockResolvedValue("test-captcha-token");
});
function fill() {
  fireEvent.change(screen.getByLabelText(/Ваше имя/), {
    target: { value: "Тестовый родитель" },
  });
  fireEvent.change(screen.getByLabelText(/Номер телефона/), {
    target: { value: "8 (999) 123-45-67" },
  });
  fireEvent.change(screen.getByLabelText(/Имя ребёнка/), { target: { value: "Александр" } });
  fireEvent.change(screen.getByLabelText(/Возраст ребёнка/), { target: { value: "12" } });
  fireEvent.click(screen.getByRole("checkbox", { name: /обработку персональных данных/ }));
}
describe("children lead submission", () => {
  it("sends the selected course with captcha and confirms only after success", async () => {
    const track = vi.spyOn(analytics, "trackApplicationSuccess");
    const fetch = vi
      .spyOn(globalThis, "fetch")
      .mockResolvedValue(Response.json({ ok: true }));
    render(
      <LeadForm course="Запись на курс «Python»" formId="children-python" />,
    );
    fill();
    fireEvent.click(screen.getByRole("button", { name: "Отправить" }));
    await waitFor(() =>
      expect(screen.getByRole("status").textContent).toContain(
        "Заявка отправлена",
      ),
    );
    expect(fetch).toHaveBeenCalledOnce();
    expect(fetch.mock.calls[0][0]).toBe("/application/request");
    expect(JSON.parse(String(fetch.mock.calls[0][1]?.body))).toMatchObject({
      phone: "+79991234567",
      question: "Запись на курс «Python»\nИмя ребёнка: Александр\nВозраст ребёнка: 12",
      personal_data_consent: true,
      advertising_consent: false,
      captcha_token: "test-captcha-token",
      form_id: "children-python",
    });
    expect(track).toHaveBeenCalledExactlyOnceWith("children-python");
  });
  it("keeps entered values and offers retry when the backend fails", async () => {
    const track = vi.spyOn(analytics, "trackApplicationSuccess");
    vi.spyOn(globalThis, "fetch").mockResolvedValue(
      Response.json({ ok: false }, { status: 502 }),
    );
    render(<LeadForm />);
    fill();
    fireEvent.click(screen.getByRole("button", { name: "Отправить" }));
    await waitFor(() =>
      expect(screen.getByRole("alert").textContent).toContain(
        "Не удалось отправить",
      ),
    );
    expect((screen.getByLabelText(/Ваше имя/) as HTMLInputElement).value).toBe(
      "Тестовый родитель",
    );
    expect(screen.queryByRole("status")).toBeNull();
    expect(track).not.toHaveBeenCalled();
    expect(
      (screen.getByRole("button", { name: "Отправить" }) as HTMLButtonElement)
        .disabled,
    ).toBe(false);
  });
});

describe("children phone formatting and validation", () => {
  it("normalizes pasted Russian numbers and preserves international numbers", () => {
    expect(normalizeChildrenPhone("8 (999) 123-45-67")).toBe("+79991234567");
    expect(normalizeChildrenPhone("9991234567")).toBe("+79991234567");
    expect(normalizeChildrenPhone("+44 20 7946 0958")).toBe("+442079460958");
    expect(formatChildrenPhone("89991234567")).toBe("+7 (999) 123-45-67");
    expect(formatChildrenPhone("+7 (999)")).toBe("+7 (999)");
    expect(normalizeChildrenPhone("")).toBe("");
  });
  it("allows editing freely and formats the complete phone on blur", () => {
    render(<LeadForm />);
    const field = screen.getByLabelText(/Номер телефона/) as HTMLInputElement;
    fireEvent.change(field, { target: { value: "89991234567" } }); fireEvent.blur(field);
    expect(field.value).toBe("+7 (999) 123-45-67");
    fireEvent.change(field, { target: { value: "" } }); fireEvent.blur(field);
    expect(field.value).toBe("");
  });
  it.each([
    ["Возраст ребёнка", "19", "возраст ребёнка"],
    ["Номер телефона", "+799912345678", "номер телефона"],
    ["Электронная почта", "invalid@", "адрес электронной почты"],
  ])("rejects invalid %s before sending", async (label, value, message) => {
    const fetch = vi.spyOn(globalThis, "fetch"); render(<LeadForm />); fill();
    fireEvent.change(screen.getByLabelText(new RegExp(label)), { target: { value } });
    fireEvent.submit(screen.getByRole("form"));
    expect(screen.getByRole("alert").textContent).toContain(message);
    expect(fetch).not.toHaveBeenCalled();
  });
  it("sends direction, optional email, goals and separate advertising consent", async () => {
    const fetch = vi.spyOn(globalThis, "fetch").mockResolvedValue(Response.json({ ok: true }));
    render(<LeadForm />); fill();
    fireEvent.change(screen.getByLabelText("Направление"), { target: { value: "Создание сайтов с нуля" } });
    fireEvent.change(screen.getByLabelText(/Электронная почта/), { target: { value: "parent@example.ru" } });
    fireEvent.change(screen.getByLabelText(/Пожелания или вопрос/), { target: { value: "По субботам" } });
    fireEvent.click(screen.getByRole("checkbox", { name: /рекламные/ }));
    fireEvent.submit(screen.getByRole("form"));
    await waitFor(() => expect(fetch).toHaveBeenCalledOnce());
    expect(JSON.parse(String(fetch.mock.calls[0][1]?.body))).toMatchObject({ advertising_consent: true, email: "parent@example.ru", question: "Направление: Создание сайтов с нуля\nИмя ребёнка: Александр\nВозраст ребёнка: 12\nПожелания: По субботам" });
  });
});

describe("captcha and duplicate submission", () => {
  it("preserves entries without sending when captcha is closed", async () => {
    const fetch = vi.spyOn(globalThis, "fetch");
    requestToken.mockRejectedValueOnce(new Error("captcha-closed"));
    render(<LeadForm />); fill(); fireEvent.submit(screen.getByRole("form"));
    await waitFor(() => expect(screen.getByRole("alert").textContent).toContain("Проверка безопасности не завершена"));
    expect(fetch).not.toHaveBeenCalled();
    expect((screen.getByLabelText(/Имя ребёнка/) as HTMLInputElement).value).toBe("Александр");
  });
  it("does not start a second captcha or request while submission is pending", async () => {
    let resolveToken!: (token: string) => void;
    requestToken.mockImplementationOnce(() => new Promise<string>((resolve) => { resolveToken = resolve; }));
    const fetch = vi.spyOn(globalThis, "fetch").mockResolvedValue(Response.json({ ok: true }));
    render(<LeadForm />); fill(); const form = screen.getByRole("form");
    fireEvent.submit(form); fireEvent.submit(form);
    expect(requestToken).toHaveBeenCalledOnce(); expect(fetch).not.toHaveBeenCalled();
    resolveToken("test-token");
    await waitFor(() => expect(screen.getByRole("status")).toBeTruthy());
    expect(fetch).toHaveBeenCalledOnce();
  });
});

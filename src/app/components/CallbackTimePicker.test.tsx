import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { CallbackTimePicker } from "./CallbackTimePicker";

function browserTimezone(zone: string) {
  const original = Intl.DateTimeFormat.prototype.resolvedOptions;
  vi.spyOn(Intl.DateTimeFormat.prototype, "resolvedOptions").mockImplementation(function () {
    return { ...original.call(this), timeZone: zone };
  });
}
afterEach(() => { cleanup(); vi.restoreAllMocks(); });

describe("callback time picker", () => {
  it("submits one selected interval and explains the timezone", () => {
    browserTimezone("Europe/Moscow");
    const { container } = render(<form><CallbackTimePicker /></form>);
    expect(screen.getByText("Время по Москве")).toBeTruthy();
    expect(new FormData(container.querySelector("form")!).get("callback_window")).toBe("anytime");
    fireEvent.click(screen.getByRole("radio", { name: "14:00–16:00" }));
    expect(new FormData(container.querySelector("form")!).getAll("callback_window")).toEqual(["14:00–16:00"]);
  });
  it("detects local time and submits the explicitly chosen display timezone", () => {
    browserTimezone("Asia/Yekaterinburg");
    const { container } = render(<form><CallbackTimePicker /></form>);
    const form = container.querySelector("form")!;
    expect(new FormData(form).get("callback_timezone")).toBe("Asia/Yekaterinburg");
    fireEvent.click(screen.getByRole("radio", { name: "14:00–16:00" }));
    fireEvent.click(screen.getByRole("button", { name: /Местное, МСК\+2/ }));
    expect(new FormData(form).get("callback_timezone")).toBe("Europe/Moscow");
    expect(new FormData(form).get("callback_window")).toBe("14:00–16:00");
    fireEvent.click(screen.getByRole("button", { name: /Переключить на местное/ }));
    expect(new FormData(form).get("callback_timezone")).toBe("Asia/Yekaterinburg");
  });
  it("preserves timezone and slot when an inline draft is opened in the modal", () => {
    browserTimezone("Asia/Yekaterinburg");
    const { container } = render(<form><CallbackTimePicker defaultValue="16:00–18:00" defaultTimezone="Europe/Moscow" /></form>);
    const data = new FormData(container.querySelector("form")!);
    expect(data.get("callback_timezone")).toBe("Europe/Moscow");
    expect(data.get("callback_window")).toBe("16:00–18:00");
  });
});

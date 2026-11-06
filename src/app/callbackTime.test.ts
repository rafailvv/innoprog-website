import { describe, expect, it } from "vitest";
import { callbackNote, isCallbackTimezone } from "./callbackTime";

const winter = new Date("2026-11-07T09:00:00Z");
describe("callback time conversion", () => {
  it.each([
    ["Europe/Moscow", "14:00–16:00", "Удобное время для звонка: 14:00–16:00 (по Москве)"],
    ["Asia/Yekaterinburg", "14:00–16:00", "Удобное время для звонка: 14:00–16:00 (местное, МСК+2)\n❗ По Москве: 12:00–14:00"],
    ["Europe/Berlin", "14:00–16:00", "Удобное время для звонка: 14:00–16:00 (местное, МСК−2)\n❗ По Москве: 16:00–18:00"],
    ["Asia/Kolkata", "14:00–16:00", "Удобное время для звонка: 14:00–16:00 (местное, МСК+2:30)\n❗ По Москве: 11:30–13:30"],
    ["Pacific/Kiritimati", "10:00–12:00", "Удобное время для звонка: 10:00–12:00 (местное, МСК+11)\n❗ По Москве: 23:00 (предыдущий день)–01:00"],
    ["America/New_York", "18:00–20:00", "Удобное время для звонка: 18:00–20:00 (местное, МСК−8)\n❗ По Москве: 02:00 (следующий день)–04:00 (следующий день)"],
  ])("converts %s %s without losing timezone or calendar day", (zone, slot, expected) => {
    expect(callbackNote(slot, zone, winter)).toBe(expected);
  });
  it("uses the current seasonal UTC offset", () => {
    expect(callbackNote("14:00–16:00", "Europe/Berlin", new Date("2026-07-07T09:00:00Z"))).toContain("❗ По Москве: 15:00–17:00");
  });
  it("never includes UTC offsets in user-facing notification text", () => {
    for (const zone of ["Europe/Moscow", "Asia/Yekaterinburg", "America/New_York"]) {
      expect(callbackNote("14:00–16:00", zone, winter)).not.toContain("UTC");
    }
  });
  it("does not invent an interval when any time is selected", () => {
    expect(callbackNote("anytime", "Asia/Yekaterinburg", winter)).toBe("Удобное время для звонка: любое время (местное, МСК+2)");
  });
  it.each(["not/a-zone", "", null, 5])("rejects invalid timezone %s", (zone) => {
    expect(isCallbackTimezone(zone)).toBe(false);
  });
});

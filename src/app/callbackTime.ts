export const CALLBACK_WINDOWS = ["10:00–12:00", "12:00–14:00", "14:00–16:00", "16:00–18:00", "18:00–20:00"] as const;
export const CALLBACK_ANYTIME = "anytime";
export const MOSCOW_TIMEZONE = "Europe/Moscow";

export function isCallbackWindow(value: unknown): value is string {
  return value === CALLBACK_ANYTIME || CALLBACK_WINDOWS.some((slot) => slot === value);
}

export function isCallbackTimezone(value: unknown): value is string {
  if (typeof value !== "string" || value.length > 100 || !value) return false;
  try {
    new Intl.DateTimeFormat("en", { timeZone: value }).format();
    return true;
  } catch {
    return false;
  }
}

export function timezoneOffset(timeZone: string, now = new Date()) {
  const offset = new Intl.DateTimeFormat("en", { timeZone, timeZoneName: "longOffset" })
    .formatToParts(now).find((part) => part.type === "timeZoneName")!.value;
  if (offset === "GMT") return 0;
  const match = /^GMT([+-])(\d{2}):(\d{2})$/.exec(offset);
  if (!match) throw new Error("unsupported-timezone-offset");
  return (Number(match[2]) * 60 + Number(match[3])) * (match[1] === "-" ? -1 : 1);
}

function offsetLabel(minutes: number, prefix: string) {
  if (!minutes) return prefix;
  const absolute = Math.abs(minutes);
  return `${prefix}${minutes < 0 ? "−" : "+"}${Math.floor(absolute / 60)}${absolute % 60 ? `:${String(absolute % 60).padStart(2, "0")}` : ""}`;
}

export function localTimeLabel(timeZone: string, now = new Date()) {
  return `Местное, ${offsetLabel(timezoneOffset(timeZone, now) - 180, "МСК")}`;
}

function moscowClock(minutes: number) {
  const day = Math.floor(minutes / 1440);
  const clock = ((minutes % 1440) + 1440) % 1440;
  const time = `${String(Math.floor(clock / 60)).padStart(2, "0")}:${String(clock % 60).padStart(2, "0")}`;
  return time + (day < 0 ? " (предыдущий день)" : day > 0 ? " (следующий день)" : "");
}

export function callbackNote(value: string, timeZone = MOSCOW_TIMEZONE, now = new Date()) {
  if (!isCallbackWindow(value)) throw new Error("invalid-callback-window");
  const offset = timezoneOffset(timeZone, now);
  const selected = value === CALLBACK_ANYTIME ? "любое время" : value;
  if (offset === 180) return `Удобное время для звонка: ${selected} (по Москве)`;
  const original = `Удобное время для звонка: ${selected} (местное, ${offsetLabel(offset - 180, "МСК")})`;
  if (value === CALLBACK_ANYTIME) return original;
  const times = value.split("–").map((time) => {
    const [hours, minutes] = time.split(":").map(Number);
    return moscowClock(hours * 60 + minutes + 180 - offset);
  });
  return `${original}\n❗ По Москве: ${times.join("–")}`;
}

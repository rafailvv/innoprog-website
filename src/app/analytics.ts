const METRIKA_COUNTER_ID = 110454081;
type Goal = "application_success" | "contact_telegram" | "contact_whatsapp" | "contact_phone";
type MetrikaWindow = Window & { ym?: (id: number, method: string, goal: string, parameters: Record<string, string>) => void };

function reachGoal(goal: Goal, formId?: string) {
  if (typeof window === "undefined") return;
  const parameters: Record<string, string> = {
    page_path: window.location.pathname,
    audience: /^\/children(?:\/|$)/.test(window.location.pathname) ? "children" : "adults",
  };
  // Never send contact details, form text, query parameters or full destination URLs.
  if (formId && /^[a-z0-9_-]{1,80}$/i.test(formId)) parameters.form_id = formId;
  try {
    (window as MetrikaWindow).ym?.(METRIKA_COUNTER_ID, "reachGoal", goal, parameters);
  } catch { /* Analytics must not interrupt navigation or successful applications. */ }
}

export function trackApplicationSuccess(formId: string) {
  reachGoal("application_success", formId);
}

export function trackContactClick(href: string) {
  let url: URL;
  try { url = new URL(href, window.location.href); } catch { return; }
  if (url.protocol === "tel:") reachGoal("contact_phone");
  else if (url.protocol === "https:" && ["t.me", "telegram.me"].includes(url.hostname)) reachGoal("contact_telegram");
  else if (url.protocol === "https:" && ["wa.me", "api.whatsapp.com"].includes(url.hostname)) reachGoal("contact_whatsapp");
}

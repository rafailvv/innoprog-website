import { proxyPdf } from "../../pdfProxy";

type RouteContext = { params: Promise<{ path: string[] }> };

const LEGACY_E_LEARNING_ORDER = [
  "sveden",
  "document",
  "Приказ_об_организации_обучения_с_применением_электронного_обучения_и_ДОТ.pdf",
].join("/");
const CURRENT_E_LEARNING_ORDER = "/files/sveden/document/Приказ_№_ОБР-12_об_организации_образовательной_деятельности_с_применением_электронного_обучения_и_ДОТ.pdf";

function storageKey(path: string[]) {
  return `site-public/${path.join("/")}`;
}

function legacyRedirect(request: Request, path: string[]) {
  if (path.join("/") !== LEGACY_E_LEARNING_ORDER) return null;
  return Response.redirect(new URL(CURRENT_E_LEARNING_ORDER, request.url), 301);
}

export async function GET(request: Request, context: RouteContext) {
  const path = (await context.params).path;
  return legacyRedirect(request, path) ?? proxyPdf(request, storageKey(path));
}

export async function HEAD(request: Request, context: RouteContext) {
  const path = (await context.params).path;
  return legacyRedirect(request, path) ?? proxyPdf(request, storageKey(path));
}

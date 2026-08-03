import { proxyPdf } from "../../pdfProxy";

type RouteContext = { params: Promise<{ path: string[] }> };

const LEGACY_E_LEARNING_ORDERS = new Set([
  "Приказ_об_организации_обучения_с_применением_электронного_обучения_и_ДОТ.pdf",
  "Приказ_об_организации_дистанционного_обучения.pdf",
  "ПРИКАЗ_ОБ_ОРГАНИЗАЦИИ_ДИСТАНЦИОННОГО_ОБУЧЕНИЯ.pdf",
].map((filename) => ["sveden", "document", filename].join("/")));
const ARCHIVED_E_LEARNING_ORDER = "/files/sveden/archive/document/Приказ_об_организации_дистанционного_обучения.pdf";

function storageKey(path: string[]) {
  return `site-public/${path.join("/")}`;
}

function legacyRedirect(request: Request, path: string[]) {
  if (!LEGACY_E_LEARNING_ORDERS.has(path.join("/"))) return null;
  return Response.redirect(new URL(ARCHIVED_E_LEARNING_ORDER, request.url), 301);
}

export async function GET(request: Request, context: RouteContext) {
  const path = (await context.params).path;
  return legacyRedirect(request, path) ?? proxyPdf(request, storageKey(path));
}

export async function HEAD(request: Request, context: RouteContext) {
  const path = (await context.params).path;
  return legacyRedirect(request, path) ?? proxyPdf(request, storageKey(path));
}

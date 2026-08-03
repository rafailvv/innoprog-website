import { proxyPdf } from "../../pdfProxy";

type RouteContext = { params: Promise<{ path: string[] }> };

const LEGACY_E_LEARNING_ORDERS = new Set([
  "Приказ_об_организации_обучения_с_применением_электронного_обучения_и_ДОТ.pdf",
  "Приказ_об_организации_дистанционного_обучения.pdf",
  "ПРИКАЗ_ОБ_ОРГАНИЗАЦИИ_ДИСТАНЦИОННОГО_ОБУЧЕНИЯ.pdf",
].map((filename) => ["sveden", "document", filename].join("/")));
const CURRENT_E_LEARNING_ORDER = "/files/sveden/document/Приказ_№_ОБР-12_об_организации_образовательной_деятельности_с_применением_электронного_обучения_и_ДОТ.pdf";

function storageKey(path: string[]) {
  return `site-public/${path.join("/")}`;
}

function isInternalArchive(path: string[]) {
  return path[0] === "sveden" && path[1] === "archive";
}

function legacyRedirect(request: Request, path: string[]) {
  if (!LEGACY_E_LEARNING_ORDERS.has(path.join("/"))) return null;
  return Response.redirect(new URL(CURRENT_E_LEARNING_ORDER, request.url), 301);
}

export async function GET(request: Request, context: RouteContext) {
  const path = (await context.params).path;
  if (isInternalArchive(path)) return new Response(null, { status: 404 });
  return legacyRedirect(request, path) ?? proxyPdf(request, storageKey(path));
}

export async function HEAD(request: Request, context: RouteContext) {
  const path = (await context.params).path;
  if (isInternalArchive(path)) return new Response(null, { status: 404 });
  return legacyRedirect(request, path) ?? proxyPdf(request, storageKey(path));
}

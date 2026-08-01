import { proxyPdf } from "../../pdfProxy";

type RouteContext = { params: Promise<{ path: string[] }> };

function storageKey(path: string[]) {
  return `site-public/${path.join("/")}`;
}

export async function GET(request: Request, context: RouteContext) {
  return proxyPdf(request, storageKey((await context.params).path));
}

export async function HEAD(request: Request, context: RouteContext) {
  return proxyPdf(request, storageKey((await context.params).path));
}

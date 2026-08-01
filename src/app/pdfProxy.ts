import manifest from "./sveden/documents.generated.json";

const STORAGE_ORIGIN = "https://storage.yandexcloud.net/innoprog-documents/";
const PUBLIC_KEYS = new Set(manifest.documents.map((document) => document.storageKey));

export const PDF_STORAGE_KEYS = {
  privacy: "site-public/legal/privacy.pdf",
  consent: "site-public/legal/consent.pdf",
  advertisingConsent: "site-public/legal/advertising-consent.pdf",
  offer: "site-public/sveden/paid_edu/Публичная_оферта_редакция_08.04.2026.pdf",
  license: "site-public/sveden/common/Выписка_из_реестра_лицензий_от_15.07.2026.pdf",
  softwareOperationManual: "site-public/technical/software-operation-manual.pdf",
  functionalCharacteristics: "site-public/technical/functional-characteristics.pdf",
} as const;

function storageUrl(storageKey: string) {
  return STORAGE_ORIGIN + storageKey.split("/").map(encodeURIComponent).join("/");
}

export async function proxyPdf(request: Request, storageKey: string) {
  if (!PUBLIC_KEYS.has(storageKey)) {
    return new Response("Not found", {
      status: 404,
      headers: { "X-Robots-Tag": "noindex, noarchive" },
    });
  }

  const upstreamHeaders: Record<string, string> = {};
  const range = request.headers.get("range");
  const ifRange = request.headers.get("if-range");
  if (range) upstreamHeaders.Range = range;
  if (ifRange) upstreamHeaders["If-Range"] = ifRange;

  const upstream = await fetch(storageUrl(storageKey), {
    method: request.method === "HEAD" ? "HEAD" : "GET",
    headers: upstreamHeaders,
    cache: "no-store",
  });

  const responseHeaders = new Headers();
  for (const name of ["accept-ranges", "content-length", "content-range", "etag", "last-modified"]) {
    const value = upstream.headers.get(name);
    if (value) responseHeaders.set(name, value);
  }
  responseHeaders.set("Cache-Control", "public, max-age=3600, stale-while-revalidate=86400");
  responseHeaders.set("Content-Disposition", "inline");
  responseHeaders.set("Content-Type", upstream.ok ? "application/pdf" : "text/plain; charset=utf-8");
  responseHeaders.set("X-Robots-Tag", "noindex, noarchive");

  return new Response(request.method === "HEAD" ? null : upstream.body, {
    status: upstream.status,
    headers: responseHeaders,
  });
}

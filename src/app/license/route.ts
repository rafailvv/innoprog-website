import { PDF_STORAGE_KEYS, proxyPdf } from "../pdfProxy";

export const GET = (request: Request) => proxyPdf(request, PDF_STORAGE_KEYS.license);
export const HEAD = GET;

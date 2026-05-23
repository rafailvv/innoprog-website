import { createReadStream, existsSync } from "node:fs";
import { stat } from "node:fs/promises";
import { createServer } from "node:http";
import path from "node:path";
import { fileURLToPath } from "node:url";
import requestHandler from "./api/application/request.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.join(__dirname, "dist");
const port = Number(process.env.PORT || 3000);

const mimeTypes = {
  ".avif": "image/avif",
  ".css": "text/css; charset=utf-8",
  ".gif": "image/gif",
  ".html": "text/html; charset=utf-8",
  ".ico": "image/x-icon",
  ".jpeg": "image/jpeg",
  ".jpg": "image/jpeg",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".pdf": "application/pdf",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".txt": "text/plain; charset=utf-8",
  ".webp": "image/webp",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
};

function sendJson(res, statusCode, payload) {
  res.writeHead(statusCode, {
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store",
  });
  res.end(JSON.stringify(payload));
}

function createVercelResponseAdapter(res) {
  return Object.assign(res, {
    status(statusCode) {
      res.statusCode = statusCode;
      return this;
    },
    json(payload) {
      sendJson(res, res.statusCode || 200, payload);
      return this;
    },
  });
}

async function serveStatic(req, res) {
  const url = new URL(req.url || "/", "http://localhost");
  const pathname = decodeURIComponent(url.pathname);
  const requestedPath = pathname === "/" ? "/index.html" : pathname;
  const normalizedPath = path.normalize(requestedPath).replace(/^(\.\.[/\\])+/, "");
  let filePath = path.join(distDir, normalizedPath);

  if (!filePath.startsWith(distDir)) {
    sendJson(res, 403, { ok: false, error: "forbidden" });
    return;
  }

  if (!existsSync(filePath)) {
    filePath = path.join(distDir, "index.html");
  }

  const fileStat = await stat(filePath);

  if (!fileStat.isFile()) {
    filePath = path.join(distDir, "index.html");
  }

  const extension = path.extname(filePath).toLowerCase();
  const isAsset = filePath.includes(`${path.sep}assets${path.sep}`);

  res.writeHead(200, {
    "Content-Type": mimeTypes[extension] || "application/octet-stream",
    "Cache-Control": isAsset
      ? "public, max-age=31536000, immutable"
      : "no-cache",
  });

  createReadStream(filePath).pipe(res);
}

const server = createServer(async (req, res) => {
  try {
    if (req.url === "/healthz") {
      sendJson(res, 200, { ok: true });
      return;
    }

    if (req.url?.startsWith("/api/application/request")) {
      await requestHandler(req, createVercelResponseAdapter(res));
      return;
    }

    await serveStatic(req, res);
  } catch (error) {
    console.error(error);
    sendJson(res, 500, { ok: false, error: "internal_error" });
  }
});

server.listen(port, "0.0.0.0", () => {
  console.log(`Innoprog website listening on ${port}`);
});

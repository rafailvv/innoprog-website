import { readFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";

const root = process.cwd();
const contract = JSON.parse(
  await readFile(path.join(root, "src/app/sveden/itemprop-contract.json"), "utf8"),
);
const baseUrlArgument = process.argv.find((argument) => argument.startsWith("--base-url="));
const baseUrl = baseUrlArgument?.slice("--base-url=".length).replace(/\/$/, "");

function extractItemProps(html) {
  return new Set(
    [...html.matchAll(/itemprop="([^"]+)"/gi)].flatMap((match) => match[1].trim().split(/\s+/)),
  );
}

async function readSectionHtml(section) {
  if (baseUrl) {
    const response = await fetch(`${baseUrl}/sveden/${section}`);
    if (!response.ok) throw new Error(`${section}: HTTP ${response.status}`);
    return response.text();
  }
  return readFile(path.join(root, `.next/server/app/sveden/${section}.html`), "utf8");
}

const report = [];
for (const [section, requiredProperties] of Object.entries(contract)) {
  const html = await readSectionHtml(section);
  // Check actual URL attributes, not nullable values in React's flight data.
  for (const [, value] of html.matchAll(/(?:href|src|action)="([^"]*)"/gi)) {
    if (/(?:^|\/)\s*(?:null|undefined)(?:[/?#]|$)/i.test(value)) {
      throw new Error(`${section}: invalid URL attribute ${value}`);
    }
  }
  const actualProperties = extractItemProps(html);
  const missing = requiredProperties.filter((property) => !actualProperties.has(property));
  const forbidden = ["fmPlanDocLink", "hosteInfo"].filter((property) => actualProperties.has(property));

  if (missing.length || forbidden.length) {
    throw new Error(
      `${section}: ${missing.length ? `missing ${missing.join(", ")}` : ""}${missing.length && forbidden.length ? "; " : ""}${forbidden.length ? `invalid ${forbidden.join(", ")}` : ""}`,
    );
  }
  report.push(`${section}:${actualProperties.size}`);
}

console.log(`Sveden source HTML verified (${baseUrl ?? "production build"}): ${report.join(" ")}`);

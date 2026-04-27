import { cpSync, existsSync, mkdirSync, readdirSync, rmSync } from "node:fs";
import { join, resolve } from "node:path";

const projectRoot = resolve(process.cwd());
const distDir = join(projectRoot, "dist");

const entriesToCopy = [
  "404.html",
  "cookie-policy.html",
  "index.html",
  "privacy-policy.html",
  "privacy.html",
  "terms-of-service.html",
  "terms.html",
  "assets",
  "forms"
];

rmSync(distDir, { recursive: true, force: true });
mkdirSync(distDir, { recursive: true });

for (const entry of entriesToCopy) {
  const sourcePath = join(projectRoot, entry);

  if (!existsSync(sourcePath)) {
    continue;
  }

  cpSync(sourcePath, join(distDir, entry), {
    recursive: true,
    force: true
  });
}

const copiedEntries = readdirSync(distDir);

if (copiedEntries.length === 0) {
  throw new Error("The dist directory is empty. Nothing was prepared for deployment.");
}

console.log(`Prepared ${copiedEntries.length} top-level entries in ${distDir}`);
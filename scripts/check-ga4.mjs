import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";

const requiredId = "G-7HQQDGHRT2";
const ignore = new Set(["node_modules", ".next", ".git", "dist", "build"]);

function* walk(dir) {
  for (const entry of readdirSync(dir)) {
    if (ignore.has(entry)) continue;
    const path = join(dir, entry);
    const stat = statSync(path);
    if (stat.isDirectory()) yield* walk(path);
    else if (/\.(tsx|ts|jsx|js|html|mdx?)$/.test(entry)) yield path;
  }
}

let found = false;
for (const file of walk(".")) {
  if (readFileSync(file, "utf8").includes(requiredId)) {
    found = true;
    break;
  }
}

if (!found) {
  console.error(`GA4 guard failed: missing ${requiredId}`);
  process.exit(1);
}

const consentLayoutPath = join("app", "[locale]", "layout.tsx");
const consentLayout = readFileSync(consentLayoutPath, "utf8");
const consentDefault =
  "analytics_storage:c==='accepted'?'granted':'denied'";

if (!consentLayout.includes(consentDefault)) {
  console.error(
    "GA4 guard failed: analytics storage must default to denied until explicit acceptance",
  );
  process.exit(1);
}

console.log(`GA4 guard OK: ${requiredId}`);

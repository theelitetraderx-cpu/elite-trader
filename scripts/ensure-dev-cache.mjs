import { existsSync, rmSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const nextDir = join(root, ".next");

function shouldResetDevCache() {
  if (!existsSync(nextDir)) {
    return { reset: false, reason: "no .next folder" };
  }

  // Corrupt cache (seen as ENOENT for .next/package.json during build)
  if (!existsSync(join(nextDir, "package.json"))) {
    return { reset: true, reason: "missing .next/package.json (corrupt cache)" };
  }

  // Production build output — dev server cannot reuse this for layout.css chunks
  if (existsSync(join(nextDir, "BUILD_ID"))) {
    return { reset: true, reason: "production BUILD_ID present" };
  }

  // Stale production static without dev manifest
  const hasDevManifest = existsSync(join(nextDir, "static", "development"));
  const hasProdStatic = existsSync(join(nextDir, "static", "chunks"));
  if (hasProdStatic && !hasDevManifest) {
    return { reset: true, reason: "production static cache without dev manifest" };
  }

  return { reset: false, reason: "dev cache looks healthy" };
}

const { reset, reason } = shouldResetDevCache();

if (reset) {
  try {
    rmSync(nextDir, { recursive: true, force: true, maxRetries: 3, retryDelay: 200 });
    console.log(`[dev] Cleared .next (${reason})`);
  } catch (error) {
    console.error("[dev] Failed to clear .next:", error);
    process.exit(1);
  }
} else {
  console.log(`[dev] Keeping .next (${reason})`);
}

import { rmSync } from "node:fs";
import { join } from "node:path";

const target = join(process.cwd(), ".next");

function removeNextDir() {
  for (let attempt = 0; attempt < 3; attempt += 1) {
    try {
      rmSync(target, { recursive: true, force: true, maxRetries: 3, retryDelay: 200 });
      console.log("Removed .next build cache");
      return;
    } catch (error) {
      if (attempt === 2) {
        console.error("Failed to remove .next:", error);
        process.exit(1);
      }
    }
  }
}

removeNextDir();

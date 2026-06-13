import { rmSync } from "node:fs";
import { join } from "node:path";

const target = join(process.cwd(), ".next");

try {
  rmSync(target, { recursive: true, force: true });
  console.log("Removed .next build cache");
} catch (error) {
  console.error("Failed to remove .next:", error);
  process.exit(1);
}

import { spawn } from "node:child_process";
import { execSync } from "node:child_process";
import { join } from "node:path";

const port = process.env.PORT || "3000";

function killPortWindows(targetPort) {
  try {
    const out = execSync(`netstat -ano | findstr ":${targetPort}" | findstr LISTENING`, {
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"],
    });
    const pids = new Set();
    for (const line of out.split(/\r?\n/)) {
      const parts = line.trim().split(/\s+/);
      const pid = parts[parts.length - 1];
      if (pid && /^\d+$/.test(pid) && pid !== "0") {
        pids.add(pid);
      }
    }
    for (const pid of pids) {
      try {
        execSync(`taskkill /F /PID ${pid}`, { stdio: "ignore" });
        console.log(`[dev] Stopped stale process on port ${targetPort} (pid ${pid})`);
      } catch {
        // already exited
      }
    }
  } catch {
    // nothing listening
  }
}

// Only reset cache when corrupt or after production build — not every start
await import("./ensure-dev-cache.mjs");

if (process.platform === "win32") {
  killPortWindows(port);
}

const nextBin = join(process.cwd(), "node_modules", "next", "dist", "bin", "next");
const useTurbo = process.env.NEXT_USE_TURBO === "1";

const args = ["dev", "-p", port];
if (useTurbo) {
  args.push("--turbo");
}

console.log(`[dev] Starting Next.js on http://localhost:${port}${useTurbo ? " (Turbopack)" : ""}`);

const child = spawn(process.execPath, [nextBin, ...args], {
  stdio: "inherit",
  env: process.env,
  cwd: process.cwd(),
});

child.on("exit", (code) => {
  process.exit(code ?? 0);
});

process.on("SIGINT", () => child.kill("SIGINT"));
process.on("SIGTERM", () => child.kill("SIGTERM"));

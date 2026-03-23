#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const { spawn } = require("child_process");

const ROOT_DIR = path.resolve(__dirname, "..");
const SRC_PAGES_DIR = path.join(ROOT_DIR, "src", "pages");
const SRC_PARTIALS_DIR = path.join(ROOT_DIR, "src", "partials");
const BUILD_SCRIPT = path.join(__dirname, "build-pages.js");
const WATCH_DEBOUNCE_MS = 120;

let timer = null;
let building = false;
let pending = false;

function runBuild(reason) {
  if (building) {
    pending = true;
    return;
  }

  building = true;
  console.log(`[watch] build start (${reason})`);

  const child = spawn(process.execPath, [BUILD_SCRIPT], {
    cwd: ROOT_DIR,
    stdio: "inherit",
  });

  child.on("exit", (code) => {
    building = false;
    if (code !== 0) {
      console.error(`[watch] build failed with code ${code}`);
    } else {
      console.log("[watch] build done");
    }

    if (pending) {
      pending = false;
      runBuild("queued change");
    }
  });
}

function scheduleBuild(reason) {
  if (timer) {
    clearTimeout(timer);
  }
  timer = setTimeout(() => runBuild(reason), WATCH_DEBOUNCE_MS);
}

function watchDir(dir) {
  if (!fs.existsSync(dir)) {
    console.warn(`[watch] skip missing directory: ${dir}`);
    return;
  }

  fs.watch(
    dir,
    { recursive: true },
    (eventType, filename) => {
      if (!filename || !filename.endsWith(".html")) {
        return;
      }
      scheduleBuild(`${eventType}: ${filename}`);
    }
  );

  console.log(`[watch] watching ${path.relative(ROOT_DIR, dir)}`);
}

watchDir(SRC_PAGES_DIR);
watchDir(SRC_PARTIALS_DIR);
runBuild("startup");

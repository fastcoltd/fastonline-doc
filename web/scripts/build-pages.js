#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

const ROOT_DIR = path.resolve(__dirname, "..");
const SRC_PAGES_DIR = path.join(ROOT_DIR, "src", "pages");
const INCLUDE_RE = /<!--\s*@include\s+(.+?)\s*-->/g;

function parseIncludeDirective(rawRef, filePath) {
  const trimmed = rawRef.trim();
  const jsonStart = trimmed.indexOf("{");

  let includeRef = trimmed;
  let vars = {};

  if (jsonStart !== -1) {
    includeRef = trimmed.slice(0, jsonStart).trim();
    const jsonText = trimmed.slice(jsonStart).trim();
    try {
      vars = JSON.parse(jsonText);
    } catch (error) {
      throw new Error(
        `Invalid include params JSON in ${path.relative(
          ROOT_DIR,
          filePath
        )}: ${jsonText}`
      );
    }
  }

  includeRef = includeRef.replace(/^['"]|['"]$/g, "");
  if (!includeRef) {
    throw new Error(`Include path is empty in ${path.relative(ROOT_DIR, filePath)}`);
  }

  return { includeRef, vars };
}

function applyTemplateVars(content, vars) {
  return content.replace(/{{\s*([A-Za-z0-9_.-]+)\s*}}/g, (_, key) => {
    const value = vars[key];
    return value === undefined || value === null ? "" : String(value);
  });
}

function resolveIncludes(filePath, content, stack = []) {
  return content.replace(INCLUDE_RE, (_, rawRef) => {
    const { includeRef, vars } = parseIncludeDirective(rawRef, filePath);
    const includePath = path.resolve(path.dirname(filePath), includeRef);

    if (stack.includes(includePath)) {
      const chain = [...stack, includePath].map((p) => path.relative(ROOT_DIR, p));
      throw new Error(`Circular include detected: ${chain.join(" -> ")}`);
    }

    if (!fs.existsSync(includePath)) {
      throw new Error(
        `Include file not found: ${path.relative(ROOT_DIR, includePath)} (from ${path.relative(
          ROOT_DIR,
          filePath
        )})`
      );
    }

    const includeContent = fs.readFileSync(includePath, "utf8");
    const resolvedContent = resolveIncludes(includePath, includeContent, [...stack, includePath]);
    return applyTemplateVars(resolvedContent, vars);
  });
}

function buildAllPages() {
  if (!fs.existsSync(SRC_PAGES_DIR)) {
    throw new Error(`Source pages directory not found: ${SRC_PAGES_DIR}`);
  }

  const pageFiles = fs
    .readdirSync(SRC_PAGES_DIR, { withFileTypes: true })
    .filter((entry) => entry.isFile() && entry.name.endsWith(".html"))
    .map((entry) => entry.name)
    .sort();

  if (pageFiles.length === 0) {
    console.warn("No source pages found under src/pages.");
    return;
  }

  for (const fileName of pageFiles) {
    const srcFile = path.join(SRC_PAGES_DIR, fileName);
    const outFile = path.join(ROOT_DIR, fileName);
    const srcContent = fs.readFileSync(srcFile, "utf8");
    const outContent = resolveIncludes(srcFile, srcContent, [srcFile]);
    fs.writeFileSync(outFile, outContent, "utf8");
  }

  console.log(`Built ${pageFiles.length} page(s) to project root.`);
}

try {
  buildAllPages();
} catch (error) {
  console.error(error.message || error);
  process.exit(1);
}

#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

const ROOT_DIR = path.resolve(__dirname, "..");
const SRC_PAGES_DIR = path.join(ROOT_DIR, "src", "pages");
const INCLUDE_RE = /<!--\s*@include\s+(.+?)\s*-->/g;
const ASSET_ATTR_RE = /\b(href|src)\s*=\s*("([^"]*)"|'([^']*)')/g;
const HEAD_OPEN_TAG_RE = /<head[^>]*>/i;

function isLocalCssOrJsAsset(url) {
  if (!url) {
    return false;
  }
  if (/^(?:[a-z]+:)?\/\//i.test(url) || url.startsWith("data:") || url.startsWith("mailto:")) {
    return false;
  }
  const [pathPart] = url.split(/[?#]/);
  if (!pathPart) {
    return false;
  }
  const normalized = pathPart.replace(/^\.\//, "");
  if (!(normalized.startsWith("css/") || normalized.startsWith("js/"))) {
    return false;
  }
  return normalized.endsWith(".css") || normalized.endsWith(".js");
}

function appendOrReplaceVersion(url, buildVersion) {
  const [withoutHash, hashPart = ""] = url.split("#");
  const hash = hashPart ? `#${hashPart}` : "";
  const [pathPart, queryPart = ""] = withoutHash.split("?");
  const params = new URLSearchParams(queryPart);
  params.set("v", buildVersion);
  const query = params.toString();
  return `${pathPart}${query ? `?${query}` : ""}${hash}`;
}

function applyCacheBust(content, buildVersion) {
  return content.replace(ASSET_ATTR_RE, (full, attrName, quotedValue, doubleQuoted, singleQuoted) => {
    const originalUrl = doubleQuoted !== undefined ? doubleQuoted : singleQuoted;
    if (!isLocalCssOrJsAsset(originalUrl)) {
      return full;
    }
    const nextUrl = appendOrReplaceVersion(originalUrl, buildVersion);
    const quote = quotedValue.startsWith('"') ? '"' : "'";
    return `${attrName}=${quote}${nextUrl}${quote}`;
  });
}

function ensureNoCacheMeta(content) {
  if (/<meta\s+http-equiv=["']Cache-Control["']/i.test(content)) {
    return content;
  }
  const headMatch = content.match(HEAD_OPEN_TAG_RE);
  if (!headMatch) {
    return content;
  }
  const noCacheMetaBlock =
    '\n    <meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate" />' +
    '\n    <meta http-equiv="Pragma" content="no-cache" />' +
    '\n    <meta http-equiv="Expires" content="0" />\n';
  return content.replace(HEAD_OPEN_TAG_RE, (headOpen) => `${headOpen}${noCacheMetaBlock}`);
}

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

  const buildVersion = new Date().toISOString().replace(/[-:.TZ]/g, "").slice(0, 14);

  for (const fileName of pageFiles) {
    const srcFile = path.join(SRC_PAGES_DIR, fileName);
    const outFile = path.join(ROOT_DIR, fileName);
    const srcContent = fs.readFileSync(srcFile, "utf8");
    const resolvedContent = resolveIncludes(srcFile, srcContent, [srcFile]);
    const noCacheContent = ensureNoCacheMeta(resolvedContent);
    const outContent = applyCacheBust(noCacheContent, buildVersion);
    fs.writeFileSync(outFile, outContent, "utf8");
  }

  console.log(`Built ${pageFiles.length} page(s) to project root. Cache version: ${buildVersion}`);
}

try {
  buildAllPages();
} catch (error) {
  console.error(error.message || error);
  process.exit(1);
}

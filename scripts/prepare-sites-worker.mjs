import { mkdir, readdir, readFile, writeFile, copyFile } from 'node:fs/promises';
import path from 'node:path';

const root = process.cwd();
const distDir = path.join(root, 'dist');
const serverDir = path.join(distDir, 'server');
const openAiDistDir = path.join(distDir, '.openai');
const hostingSource = path.join(root, '.openai', 'hosting.json');
const hostingTarget = path.join(openAiDistDir, 'hosting.json');

const mimeTypes = new Map([
  ['.html', 'text/html; charset=utf-8'],
  ['.js', 'text/javascript; charset=utf-8'],
  ['.css', 'text/css; charset=utf-8'],
  ['.svg', 'image/svg+xml'],
  ['.png', 'image/png'],
  ['.jpg', 'image/jpeg'],
  ['.jpeg', 'image/jpeg'],
  ['.webp', 'image/webp'],
  ['.ico', 'image/x-icon'],
  ['.json', 'application/json; charset=utf-8'],
  ['.txt', 'text/plain; charset=utf-8']
]);

const textExtensions = new Set(['.html', '.js', '.css', '.svg', '.json', '.txt']);

async function collectFiles(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    if (entry.name === 'server' || entry.name === '.openai') {
      continue;
    }

    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...await collectFiles(fullPath));
    } else {
      files.push(fullPath);
    }
  }

  return files;
}

await mkdir(serverDir, { recursive: true });
await mkdir(openAiDistDir, { recursive: true });
await copyFile(hostingSource, hostingTarget);

const files = {};
for (const filePath of await collectFiles(distDir)) {
  const relative = `/${path.relative(distDir, filePath).replaceAll(path.sep, '/')}`;
  const ext = path.extname(filePath).toLowerCase();
  const buffer = await readFile(filePath);
  const isText = textExtensions.has(ext);

  files[relative] = {
    mime: mimeTypes.get(ext) ?? 'application/octet-stream',
    encoding: isText ? 'text' : 'base64',
    content: isText ? buffer.toString('utf8') : buffer.toString('base64')
  };
}

if (files['/index.html']) {
  files['/'] = files['/index.html'];
}

const worker = `const files = ${JSON.stringify(files)};\n\n` +
`function decodeBase64(value) {\n` +
`  const binary = atob(value);\n` +
`  const bytes = new Uint8Array(binary.length);\n` +
`  for (let index = 0; index < binary.length; index += 1) bytes[index] = binary.charCodeAt(index);\n` +
`  return bytes;\n` +
`}\n\n` +
`function buildResponse(file, pathName) {\n` +
`  const headers = new Headers({ "content-type": file.mime });\n` +
`  if (pathName.startsWith("/assets/")) headers.set("cache-control", "public, max-age=31536000, immutable");\n` +
`  return new Response(file.encoding === "base64" ? decodeBase64(file.content) : file.content, { headers });\n` +
`}\n\n` +
`export default {\n` +
`  async fetch(request) {\n` +
`    const url = new URL(request.url);\n` +
`    const pathName = decodeURIComponent(url.pathname);\n` +
`    const file = files[pathName] || (!pathName.includes(".") ? files["/index.html"] : undefined);\n` +
`    if (!file) return new Response("Not found", { status: 404 });\n` +
`    return buildResponse(file, pathName);\n` +
`  }\n` +
`};\n`;

await writeFile(path.join(serverDir, 'index.js'), worker, 'utf8');

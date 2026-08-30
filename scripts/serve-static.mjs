import { createReadStream, existsSync, statSync } from "node:fs";
import { createServer } from "node:http";
import { extname, resolve, sep } from "node:path";

const root = resolve("out");
const port = Number(process.env.PORT ?? 3000);
const host = process.env.HOST ?? "127.0.0.1";

const contentTypes = new Map([
  [".css", "text/css; charset=utf-8"],
  [".html", "text/html; charset=utf-8"],
  [".ico", "image/x-icon"],
  [".js", "text/javascript; charset=utf-8"],
  [".json", "application/json; charset=utf-8"],
  [".map", "application/json; charset=utf-8"],
  [".png", "image/png"],
  [".svg", "image/svg+xml"],
  [".txt", "text/plain; charset=utf-8"],
  [".webp", "image/webp"],
  [".woff", "font/woff"],
  [".woff2", "font/woff2"],
]);

function safeFile(relativePath) {
  const absolutePath = resolve(root, relativePath);
  if (absolutePath !== root && !absolutePath.startsWith(`${root}${sep}`)) return null;
  if (!existsSync(absolutePath) || !statSync(absolutePath).isFile()) return null;
  return absolutePath;
}

function resolveRequestPath(requestUrl) {
  const pathname = decodeURIComponent(new URL(requestUrl, `http://${host}:${port}`).pathname);
  const relative = pathname.replace(/^\/+/, "");
  const candidates =
    pathname === "/"
      ? ["index.html"]
      : [relative, `${relative}.html`, `${relative.replace(/\/$/, "")}/index.html`];

  for (const candidate of candidates) {
    const file = safeFile(candidate);
    if (file) return { file, status: 200 };
  }

  return { file: safeFile("404.html"), status: 404 };
}

createServer((request, response) => {
  try {
    const { file, status } = resolveRequestPath(request.url ?? "/");
    if (!file) {
      response.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
      response.end("Not Found");
      return;
    }

    response.writeHead(status, {
      "Content-Type": contentTypes.get(extname(file).toLowerCase()) ?? "application/octet-stream",
    });
    createReadStream(file).pipe(response);
  } catch {
    response.writeHead(400, { "Content-Type": "text/plain; charset=utf-8" });
    response.end("Bad Request");
  }
}).listen(port, host, () => {
  console.log(`Static export server listening on http://${host}:${port}`);
});

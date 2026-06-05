import http from "node:http";
import { readFile } from "node:fs/promises";
import path from "node:path";

async function requestListener(request, response) {
  const url = request.url;
  console.log(url);

  // 1. Rutas específicas de la aplicación
  if (url === "/api/health") {
    const status = { status: "ok" };
    const json = JSON.stringify(status);
    response.writeHead(200, { "Content-Type": "application/json" });
    response.end(json);
  } else if (url === "/api/time") {
    const time = { time: new Date().toISOString() };
    const json = JSON.stringify(time);
    response.writeHead(200, { "Content-Type": "application/json" });
    response.end(json);
  } else if (url === "/") {
    const html = `
    <!doctype html>
    <html lang="es">
    <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="/style.css">
    <title>Vanilla Node Web Server</title>
    </head>
    <body>
    <h1>Bienvenido a Vanilla Node Web Server</h1>
    <section>
    <h2>Prueba la API</h2>
    <ul>
    <li><a href="/api/health">/api/health</a></li>
    <li><a href="/api/time">/api/time</a></li>
    </ul>
    </section>
    <section>
    <h2>Conoce a la mascota</h2>
    <figure>
    <img src="/node-mascot.svg" alt="Mascota de Node.js" width="120" />
    <figcaption>Mascota de Node.js</figcaption>
    </figure>
    </section>
    </body>
    </html>
    `;
    response.writeHead(200, { "Content-Type": "text/html" });
    response.end(html);
  }

  // 2. Archivos estaticos en /public
  const PUBLIC_DIR = path.resolve("public");
  const filePath = path.join(PUBLIC_DIR, url);
  const ext = path.extname(url).toLowerCase();

  // if (url === "/node-mascot.svg") {
  //   try {
  //     const data = await readFile("./node-mascot.svg");
  //     response.writeHead(200, { "Content-Type": "image/svg+xml" });
  //     return response.end(data);
  //   } catch {
  //     response.writeHead(404);
  //     return response.end();
  //   }
  // }

  // if (url === "/style.css") {
  //   try {
  //     const data = await readFile("./style.css");
  //     response.writeHead(200, { "Content-Type": "text/css" });
  //     return response.end(data);
  //   } catch {
  //     response.writeHead(404);
  //     return response.end();
  //   }
  // }
}

const server = http.createServer(requestListener);
server.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});

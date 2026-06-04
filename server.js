import http from "node:http";

function requestListener(request, response) {
  // response.writeHead(200, { "Content-Type": "text/plain" });

  if (request.url === "/") {
    const html = `
    <!doctype html>
    <html lang="es">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
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
    </body>
    </html>
    `;
    response.writeHead(200, { "Content-Type": "text/html" });
    response.end(html);
  } else if (request.url === "/api/health") {
    const status = { status: "ok" };
    const json = JSON.stringify(status);
    response.writeHead(200, { "Content-Type": "application/json" });
    response.end(json);
  } else if (request.url === "/api/time") {
    const time = { time: "pendiente" };
    const json = JSON.stringify(time);
    response.writeHead(200, { "Content-Type": "application/json" });
    response.end(json);
  }

  // response.end("Hola Codeable");
}

const server = http.createServer(requestListener);
server.listen(3000);

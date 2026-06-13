import { readFile } from "node:fs/promises";
import path from "node:path";

const mimeTypes = {
  ".svg": "image/svg+xml",
  ".css": "text/css",
  ".ico": "image/x-icon",
};

const PUBLIC_DIR = path.resolve("public");

export async function staticHandler(_req, res, pathname) {
  // try {
  const filePath = path.join(PUBLIC_DIR, pathname);
  const ext = path.extname(pathname).toLowerCase();
  const data = await readFile(filePath);

  res.writeHead(200, { "Content-Type": mimeTypes[ext] });
  return res.end(data);
  // } catch (error) {
  // Determinar el código de estado basado en el error de sistema
  //   let status = 500;
  //   let message = "Error interno del servidor";

  //   if (error.code === "ENOENT" || error.code === "EISDIR") {
  //     status = 404;
  //     message = "Recurso no encontrado";
  //   } else if (error.code === "EACCES") {
  //     status = 403;
  //     message = "Acceso prohibido";
  //   }

  //   return sendHtmlError(res, message, status);
  // }
}

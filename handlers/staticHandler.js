import fs from "node:fs";
import path from "node:path";
import { HttpError } from "../utils/errors.js";

const mimeTypes = {
  ".svg": "image/svg+xml",
  ".css": "text/css",
  ".ico": "image/x-icon",
};

const PUBLIC_DIR = path.resolve("public");

export async function staticHandler(_req, res, pathname) {
  const filePath = path.join(PUBLIC_DIR, pathname);

  try {
    const stats = await fs.promises.stat(filePath);

    if (!stats.isFile()) {
      throw new HttpError("Recurso no encontrado", 404);
    }

    const ext = path.extname(pathname).toLowerCase();
    const mimeType = mimeTypes[ext] || "application/octet-stream";

    const readStream = fs.createReadStream(filePath);

    res.writeHead(200, { "Content-Type": mimeType });
    // readStream.on("error", callback);
    readStream.pipe(res);
  } catch (error) {
    if (error.code === "ENOENT") {
      throw new HttpError("Recurso no encontrado", 404);
    }

    if (error.code === "EACCES") {
      throw new HttpError("Acceso denegado", 403);
    }

    throw error;
  }
}

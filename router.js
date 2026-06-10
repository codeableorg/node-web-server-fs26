import { getHealth, getTime } from "./handlers/apiHandlers.js";
import { getHome, getNewContact } from "./handlers/viewHandlers.js";
import { staticHandler } from "./handlers/staticHandler.js";
import { parseUrlEncoded } from "./utils/bodyParser.js";

export async function router(req, res) {
  const pathname = req.url;
  const method = req.method;
  console.log(pathname);

  // Rutas de API
  if (pathname === "/api/health") {
    return await getHealth(req, res);
  }

  if (pathname === "/api/time") {
    return await getTime(req, res);
  }

  // Rutas de Vistas
  if (pathname === "/contact" && method === "GET") {
    return await getNewContact(req, res);
  }

  if (pathname === "/contact" && method === "POST") {
    // sanitizacion o parseado del body
    const body = await parseUrlEncoded(req);
    console.log(body);

    // validacion de los datos
    const { name, email, message } = body;

    if (!name || !email || !message) {
      res.writeHead(400); // 400 Bad Request
      return res.end();
    }

    // return await saveNewContact(req, res);

    res.writeHead(200);
    return res.end("Mensaje recibido!");
  }

  if (pathname === "/") {
    return await getHome(req, res);
  }

  // Fallback: Archivos Estáticos
  return await staticHandler(req, res, pathname);
}

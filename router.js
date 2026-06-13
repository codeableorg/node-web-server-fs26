import { getHealth, getTime, getEstates } from "./handlers/apiHandlers.js";
import {
  getHome,
  getNewContact,
  postContact,
} from "./handlers/viewHandlers.js";
import { staticHandler } from "./handlers/staticHandler.js";
import { sendHtmlError, sendJsonError } from "./utils/response.js";

export async function router(req, res) {
  const pathname = req.url;
  const method = req.method;
  console.log(pathname);

  try {
    // Rutas de API
    if (pathname === "/api/health") {
      return await getHealth(req, res);
    }

    if (pathname === "/api/time") {
      return await getTime(req, res);
    }

    if (pathname === "/api/estates") {
      return await getEstates(req, res);
    }

    // Rutas de Vistas
    if (pathname === "/contact" && method === "GET") {
      return await getNewContact(req, res);
    }

    if (pathname === "/contact" && method === "POST") {
      return await postContact(req, res);
    }

    if (pathname === "/") {
      return await getHome(req, res);
    }

    // Fallback: Archivos Estáticos
    return await staticHandler(req, res, pathname);
  } catch (error) {
    console.error("Router Error:", error);
    const status = error.status || 500;
    const message =
      status === 500 ? "Error Interno del Servidor" : error.message;

    if (pathname.startsWith("/api")) {
      sendJsonError(res, message, status);
    } else {
      sendHtmlError(res, message, status);
    }
  }
}

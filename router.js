import { getHealth, getTime } from "./handlers/apiHandlers.js";
import { getHome } from "./handlers/viewHandlers.js";
import { staticHandler } from "./handlers/staticHandler.js";

export async function router(req, res) {
  const pathname = req.url;
  console.log(pathname);

  // Rutas de API
  if (pathname === "/api/health") {
    return await getHealth(req, res);
  }

  if (pathname === "/api/time") {
    return await getTime(req, res);
  }

  // Rutas de Vistas
  if (pathname === "/") {
    return await getHome(req, res);
  }

  // Fallback: Archivos Estáticos
  return await staticHandler(req, res, pathname);
}

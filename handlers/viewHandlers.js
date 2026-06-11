import { sendHtml } from "../utils/response.js";
import { getLayout } from "../utils/html.js";
import { parseUrlEncoded } from "../utils/bodyParser.js";
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";

export async function getHome(_req, res) {
  const content = `
    <h1>Bienvenido a Vanilla Node Web Server</h1>
    <section>
      <h2>Conoce a la mascota</h2>
      <figure>
        <img src="/node-mascot.svg" alt="Mascota de Node.js" width="120" />
        <figcaption>Mascota de Node.js</figcaption>
      </figure>
    </section>
    <section>
      <h2>Prueba la API</h2>
      <ul>
        <li><a href="/api/health">/api/health</a></li>
        <li><a href="/api/time">/api/time</a></li>
      </ul>
    </section>
  `;

  const html = getLayout("Inicio", content);
  sendHtml(res, html);
}

export async function getNewContact(req, res) {
  const content = `
    <section>
      <h2>Formulario de Contacto</h2>
      <form action="/contact" method="POST">
        <div>
          <label for="name">Nombre:</label>
          <input type="text" id="name" name="name" required />
        </div>
        <div>
          <label for="email">Correo electrónico:</label>
          <input type="email" id="email" name="email" required />
        </div>
        <div>
          <label for="message">Mensaje:</label>
          <textarea id="message" name="message" required></textarea>
        </div>
        <button type="submit">Enviar</button>
      </form>
    </section>
  `;

  const html = getLayout("Nuevo Contacto", content);
  sendHtml(res, html);
}

const DATA_DIR = path.join(import.meta.dirname, "../data");
const MESSAGES_FILE = path.join(DATA_DIR, "messages.json");

export async function postContact(req, res) {
  // sanitizacion o parseado del body
  const body = await parseUrlEncoded(req);
  console.log(body);

  // validacion de los datos
  const { name, email, message } = body;

  if (!name || !email || !message) {
    res.writeHead(400); // 400 Bad Request
    return res.end();
  }

  // persistencia de datos
  let messages = [];

  try {
    const fileContent = await readFile(MESSAGES_FILE, "utf-8");
    messages = JSON.parse(fileContent);
  } catch (error) {
    if (error.code === "ENOENT") {
      console.log("TEST");
      await writeFile(MESSAGES_FILE, messages);
    } else {
      // Cualquier otro error se trata como un error de servidor.
      const status = 500; // Internal Server Error
      res.writeHead(status);
      return res.end();
    }
  }

  const newMessage = {
    name,
    email,
    message,
    timestamp: new Date().toISOString(),
  };
  messages.push(newMessage);
  await writeFile(MESSAGES_FILE, JSON.stringify(messages, null, 2));

  // Devolvemos una confirmación.
  const content = `
      <h1>Mensaje Recibido</h1>
      <p>Gracias <strong>${name}</strong> (${email}). Hemos recibido tu mensaje.</p>
      <a href="/">Volver al inicio</a>
      `;

  const html = getLayout("Confirmación", content);
  return sendHtml(res, html);
}

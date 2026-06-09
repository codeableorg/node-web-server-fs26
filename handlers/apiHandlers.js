import { sendJson } from "../utils/response.js";

export async function getHealth(req, res) {
  sendJson(res, { status: "ok" });
}

export async function getTime(req, res) {
  sendJson(res, { time: new Date().toISOString() });
}

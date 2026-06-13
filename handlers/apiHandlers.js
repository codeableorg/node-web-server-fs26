import { sendJson } from "../utils/response.js";

export async function getHealth(req, res) {
  sendJson(res, { status: "ok" });
}

export async function getTime(req, res) {
  sendJson(res, { time: new Date().toISOString() });
}

export async function getEstates(req, res) {
  const estates = [
    {
      address: "Av Husares DE Junin N° 6xx, Dpto. 1807",
      district: "Jesús María",
      city: "Lima",
      price: 469000,
      area: 79,
    },
    {
      address: "Av Husares DE Junin N° 6xx, Dpto. 1807",
      district: "Jesús María",
      city: "Lima",
      price: 469000,
      area: 79,
    },
    {
      address: "Av Husares DE Junin N° 6xx, Dpto. 1807",
      district: "Jesús María",
      city: "Lima",
      price: 469000,
      area: 79,
    },
    {
      address: "Av Husares DE Junin N° 6xx, Dpto. 1807",
      district: "Jesús María",
      city: "Lima",
      price: 469000,
      area: 79,
    },
    {
      address: "Av Husares DE Junin N° 6xx, Dpto. 1807",
      district: "Jesús María",
      city: "Lima",
      price: 469000,
      area: 79,
    },
  ];
  sendJson(res, estates);
}

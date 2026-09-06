// Netlify Function: armazenamento central dos produtos (Netlify Blobs)
// GET  /api/products  -> qualquer visitante lê (público)
// POST /api/products  -> salva lista inteira (exige header x-admin-key)
import { getStore } from "@netlify/blobs";

const BLOB_KEY = "produtos";
const store = () => getStore("gymx");

export default async (req) => {
  if (req.method === "GET") {
    const data = await store().get(BLOB_KEY, { type: "json" });
    return Response.json(
      { products: data ?? null },
      { headers: { "Cache-Control": "no-store" } }
    );
  }

  if (req.method === "POST") {
    const expected = process.env.ADMIN_KEY || "gymx2008";
    if (req.headers.get("x-admin-key") !== expected) {
      return Response.json({ error: "não autorizado" }, { status: 401 });
    }
    let body;
    try {
      body = await req.json();
    } catch {
      return Response.json({ error: "JSON inválido" }, { status: 400 });
    }
    if (!body || !Array.isArray(body.products)) {
      return Response.json({ error: "formato inválido" }, { status: 400 });
    }
    await store().setJSON(BLOB_KEY, body.products);
    return Response.json({ ok: true });
  }

  return Response.json({ error: "método não permitido" }, { status: 405 });
};

export const config = { path: "/api/products" };

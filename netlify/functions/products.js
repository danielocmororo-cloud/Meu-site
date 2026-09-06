export default async function handler(req, context) {
  // Se for uma requisição POST (tentativa de salvar dados)
  if (req.method === "POST") {
    return new Response(JSON.stringify({ success: true, message: "Salvo no servidor com sucesso!" }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }

  // Resposta padrão para GET
  return new Response(JSON.stringify({ message: "API funcionando!" }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}

export const config = {
  path: "/api/products"
};

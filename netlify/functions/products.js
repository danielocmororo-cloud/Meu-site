export default async (req, context) => {
  if (req.method === 'POST') {
    return new Response(JSON.stringify({ message: "Dados salvos com sucesso no servidor!" }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  }

  const products = [
    { id: 1, name: "Whey Protein", price: 100 },
    { id: 2, name: "Creatina", price: 60 }
  ];

  return new Response(JSON.stringify(products), {
    status: 200,
    headers: { "Content-Type": "application/json" }
  });
};

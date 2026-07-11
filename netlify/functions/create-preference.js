exports.handler = async (event, context) => {
  // Solo permitir solicitudes POST
  if (event.httpMethod !== "POST") {
    return { 
      statusCode: 405, 
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type"
      },
      body: JSON.stringify({ error: "Method Not Allowed" }) 
    };
  }

  // Soporte para preflight (OPTIONS)
  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type"
      },
      body: ""
    };
  }

  try {
    const { items } = JSON.parse(event.body);
    const accessToken = process.env.MP_ACCESS_TOKEN;
    
    if (!accessToken) {
      return {
        statusCode: 500,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*"
        },
        body: JSON.stringify({ error: "Falta configurar la variable MP_ACCESS_TOKEN en Netlify." })
      };
    }

    // Mapear los items del carrito al formato de Mercado Pago
    const mpItems = items.map(item => {
      // Parsear precio: "$8.000" -> 8000
      const cleanPrice = item.price.replace(/[^0-9]/g, '');
      const price = parseInt(cleanPrice, 10);
      return {
        title: item.title,
        quantity: item.quantity,
        unit_price: price,
        currency_id: 'ARS'
      };
    });

    const siteUrl = process.env.URL || 'http://localhost:8888';

    const preferenceData = {
      items: mpItems,
      back_urls: {
        success: `${siteUrl}/index.html?payment=success`,
        failure: `${siteUrl}/index.html?payment=failure`,
        pending: `${siteUrl}/index.html?payment=pending`
      },
      auto_return: "approved"
    };

    const response = await fetch("https://api.mercadopago.com/checkout/preferences", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${accessToken}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(preferenceData)
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Error de Mercado Pago: ${errorText}`);
    }

    const data = await response.json();

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      },
      body: JSON.stringify({
        id: data.id,
        init_point: data.init_point
      })
    };
  } catch (error) {
    console.error("Error creating Mercado Pago preference:", error);
    return {
      statusCode: 500,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      },
      body: JSON.stringify({ error: error.message })
    };
  }
};

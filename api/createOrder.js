export default async function handler(req, res) {
  const { name, amount, uid, message } = req.body;

  const response = await fetch("https://sandbox.cashfree.com/pg/orders", {
    method: "POST",
    headers: {
      accept: "application/json",
      "x-api-version": "2022-09-01",
      "content-type": "application/json",
      "x-client-id": process.env.CASHFREE_CLIENT_ID,
      "x-client-secret": process.env.CASHFREE_CLIENT_SECRET
    },
    body: JSON.stringify({
      order_amount: parseFloat(amount),
      order_currency: "INR",
      customer_details: {
        customer_id: uid || "anon_" + Date.now(),
        customer_name: name,
        customer_email: "anon@tips.com"
      },
      order_meta: {
        return_url: "https://your-vercel-site.vercel.app/tip.html?success=true"
      },
      order_note: message
    })
  });

  const data = await response.json();
  res.status(200).json(data);
}

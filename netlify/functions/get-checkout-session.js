import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async (req) => {
  const url = new URL(req.url);
  const sessionId = url.searchParams.get("session_id");

  if (!sessionId) {
    return Response.json(
      { error: "注文情報が見つかりません。" },
      { status: 400 }
    );
  }

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ["line_items"],
    });

    const items = session.line_items.data.map((item) => ({
      name: item.description,
      quantity: item.quantity,
      amount: item.amount_total,
    }));

   const itemsTotal = items.reduce(
  (sum, item) => sum + item.amount,
  0
);

const shipping = (session.amount_total || 0) - itemsTotal;

return Response.json({
  items,
  itemsTotal,
  shipping,
  total: session.amount_total,
  email: session.customer_details?.email || "",
});
  } catch (error) {
    console.error(error);

    return Response.json(
      { error: "注文情報を取得できませんでした。" },
      { status: 500 }
    );
  }
};
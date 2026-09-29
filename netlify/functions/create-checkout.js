import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async (req) => {
  if (req.method !== "POST") {
    return new Response("Method Not Allowed", {
      status: 405,
    });
  }

  try {
    const { items } = await req.json();

    const allowedProducts = {
      "TQ-001": {
        name: "た★スケール",
        price: 4980,
      },
    };

    const lineItems = items.map((item) => {
      const product = allowedProducts[item.code];

      if (!product) {
        throw new Error("商品が見つかりません");
      }

      return {
        price_data: {
          currency: "jpy",
          product_data: {
            name: product.name,
          },
          unit_amount: product.price,
        },
        quantity: item.quantity,
      };
    });

    const origin = new URL(req.url).origin;

    const session = await stripe.checkout.sessions.create({
      mode: "payment",

      line_items: lineItems,

      shipping_address_collection: {
        allowed_countries: ["JP"],
      },

      shipping_options: [
        {
          shipping_rate_data: {
            type: "fixed_amount",
            display_name: "郵便",
            fixed_amount: {
              amount: 500,
              currency: "jpy",
            },
          },
        },
      ],

      success_url: `${origin}/order-complete?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/cart?canceled=true`,
    });

    return Response.json({
      url: session.url,
    });
  } catch (error) {
    console.error(error);

    return Response.json(
      {
        error: "決済ページの作成に失敗しました。",
      },
      { status: 500 }
    );
  }
};
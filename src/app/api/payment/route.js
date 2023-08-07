import Stripe from "stripe";
import { NextResponse, NextRequest } from "next/server";

export async function POST(request) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  let data = await request.json();
  let items = data.items;
  let metadata = data.metadata;
  const session = await stripe.checkout.sessions.create({
    invoice_creation: {
      enabled: true,
    },
    line_items: items,
    metadata: metadata,
    mode: "payment",
    success_url: `${process.env.NEXT_PUBLIC_HOSTNAME}/payment/success`,
    cancel_url: `${process.env.NEXT_PUBLIC_HOSTNAME}/payment/failure`,
  });

  return NextResponse.json(session.url);
}

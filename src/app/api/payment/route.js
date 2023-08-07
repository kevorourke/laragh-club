import Stripe from "stripe";
import { NextResponse, NextRequest } from "next/server";

export async function POST(request) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  let data = await request.json();
  let items = data.items;
  let metadata = data.metadata;
  const session = await stripe.checkout.sessions.create({
    invoice_creation_: {
      enabled: true,
    },
    line_items: items,
    metadata: metadata,
    mode: "payment",
    success_url: `${location.origin}/members/payment/success`,
    cancel_url: `${location.origin}/members/payment/failure`,
  });

  return NextResponse.json(session.url);
}

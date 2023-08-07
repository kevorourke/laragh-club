import Stripe from "stripe";
import { createNewPaymentRecord } from "@/supabase/supabase-admin";

export async function POST(req) {
  const body = await req.text();
  const sig = req.headers["stripe-signature"];
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  let event;

  try {
    if (!sig || !webhookSecret) return;
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
  } catch (err) {
    console.log(`Error message: ${err.message}`);
    return new Response(`Webhook Error: ${err.message}`, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    try {
      const checkoutSession = event.data.object;
      let data = {};
      data.amount = checkoutSession.amount_total;
      data.member_ids = JSON.parse(checkoutSession.metadata.memberIds);
      await createNewPaymentRecord(data); // ensure this is awaited if it's async
      console.log(checkoutSession);
    } catch (error) {
      console.log(error);
      return new Response(
        "Webhook handler failed. View your nextjs function logs.",
        {
          status: 400,
        }
      );
    }
  }
  return new Response(JSON.stringify({ received: true }));
}

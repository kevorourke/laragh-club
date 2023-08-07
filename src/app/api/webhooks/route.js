import { NextResponse } from "next/server";

import { createNewPaymentRecord } from "@/supabase/supabase-admin";

export async function POST(req) {
  const data = await req.text();
  console.log(JSON.parse(data));
  let event = JSON.parse(data);
  // const sig = headers().get("Stripe-Signature");
  // const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  // let event;
  // try {
  //   if (!sig || !webhookSecret) return;
  //   event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
  // } catch (err) {
  //   console.log(`❌ Error message: ${err.message}`);
  //   return new Response(`Webhook Error: ${err.message}`, { status: 400 });
  // }
  // have to return response promptly, ie without waiting for back-end process or stripe will potentially flag your account
  switch (event.type) {
    case "checkout.session.completed":
      try {
        const checkoutSession = event.data.object;
        let data = {};
        data.amount = checkoutSession.amount_total;
        data.member_ids = JSON.parse(checkoutSession.metadata.memberIds);
        await createNewPaymentRecord(data);
        console.log("Checkout Session:", checkoutSession);
      } catch (error) {
        console.error(
          "Error processing checkout.session.completed event:",
          error
        );
        res.status(400).json({
          error: "Webhook handler failed. Check server logs for more details.",
        });
        return;
      }
      break;
    default:
      // Unexpected event type
      console.log(`Unhandled event type ${event.type}.`);
  }
  return NextResponse.json(
    { message: "successfully received" },
    { status: 200 }
  );
}

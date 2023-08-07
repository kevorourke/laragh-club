import Stripe from "stripe";
import { createNewPaymentRecord } from "@/supabase/supabase-admin";

export default async function handleStripeWebhook(req, res) {
  // Log the entire request object to diagnose its structure
  console.log("Request object:", req);

  // Safely attempt to extract the Stripe-Signature header
  const sig = req && req.headers ? req.headers["stripe-signature"] : null;

  // If for some reason we still don't have a signature, log it and exit early
  if (!sig) {
    console.error("No Stripe signature found in the request.");
    res.status(400).json({ error: "Missing Stripe signature" });
    return;
  }

  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  let event;

  try {
    if (!webhookSecret) throw new Error("No webhook secret provided");
    event = stripe.webhooks.constructEvent(req.body, sig, webhookSecret);
  } catch (err) {
    console.error(`Error message: ${err.message}`);
    res.status(400).json({ error: `Webhook Error: ${err.message}` });
    return;
  }

  if (event.type === "checkout.session.completed") {
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
  }

  res.json({ received: true });
}

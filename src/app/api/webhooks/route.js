const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).end(); // Method not allowed
    return;
  }

  const buf = await buffer(req);
  const payload = buf.toString("utf-8");
  let event;

  if (endpointSecret) {
    const signature = req.headers["stripe-signature"];
    try {
      event = stripe.webhooks.constructEvent(
        payload,
        signature,
        endpointSecret
      );
    } catch (err) {
      console.log(`⚠️  Webhook signature verification failed.`, err.message);
      return res.status(400).end(); // Bad request response
    }
  } else {
    event = JSON.parse(payload);
  }

  // Handle the event
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

  res.json({ received: true }); // Return a response to acknowledge receipt of the event
}

// This helper function is necessary because the Stripe webhook's signature verification requires
// the raw body, not the parsed body that Next.js provides by default.
async function buffer(readable) {
  const chunks = [];
  for await (const chunk of readable) {
    chunks.push(chunk);
  }
  return Buffer.concat(chunks);
}

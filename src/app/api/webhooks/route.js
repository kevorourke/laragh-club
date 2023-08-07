import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2022-11-15",
});

export async function POST(req) {
  let event;
  const rawBody = await req.text(); // Have also tried using await buffer(req) from 'micro' but no luck
  const stripeHeader = req.headers.get("stripe-signature"); // This returns undefined always....
  event = stripe.webhooks.constructEvent(
    rawBody,
    stripeHeader,
    process.env.STRIPE_WEBHOOK_SECRET_KEY
  );

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
}

export const config = {
  api: {
    bodyParser: false,
  },
};

import { NextResponse } from "next/server";

import {
  createNewPaymentRecord,
  updateLottoTicketRecord,
} from "@/supabase/supabase-admin";

export async function POST(req) {
  const data = await req.text();
  console.log(JSON.parse(data));
  let event = JSON.parse(data);

  let product = event.data.object.metadata.product;
  if (event.type === "checkout.session.completed") {
    switch (product) {
      case "membership":
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
            error:
              "Webhook handler failed. Check server logs for more details.",
          });
          return;
        }
        break;

      case "lotto":
        try {
          const checkoutSession = event.data.object;
          let data = {};

          data.ticket_ids = JSON.parse(checkoutSession.metadata.ticket_ids);
          await updateLottoTicketRecord(data);
          console.log("Checkout Session:", checkoutSession);
        } catch (error) {
          console.error(
            "Error processing checkout.session.completed event:",
            error
          );
          res.status(400).json({
            error:
              "Webhook handler failed. Check server logs for more details.",
          });
          return;
        }
        break;
      default:
        // Unexpected event type
        console.log(`Unhandled event type ${event.type}.`);
    }
  } else {
    console.log(`Unhandled event type ${event.type}.`);
  }

  return NextResponse.json(
    { message: "successfully received" },
    { status: 200 }
  );
}

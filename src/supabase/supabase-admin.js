import { createClient } from "@supabase/supabase-js";

// Note: supabaseAdmin uses the SERVICE_ROLE_KEY which you must only use in a secure server-side context
// as it has admin priviliges and overwrites RLS policies!
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const createNewPaymentRecord = async (data) => {
  const paymentData = {
    amount: data.amount,
    member_ids: data.member_ids,
  };

  const { error } = await supabaseAdmin.from("payments").insert(paymentData);
  if (error) throw error;
  console.log("Payment inserted successfully");
};

export { createNewPaymentRecord };

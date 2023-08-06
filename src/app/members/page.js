import StackedTable from "@/components/StackedTable";
import { createServerSupabaseClient } from "@/supabase/supabase-server";
import CheckoutButton from "@/components/CheckoutButton";

export default async function Page() {
  const supabase = createServerSupabaseClient();

  const { data, error } = await supabase.from("members").select();

  const members = data;
  const paymentMembers = data.filter((item) => item.payment_due === true);

  return (
    <>
      <StackedTable members={members} />

      {paymentMembers ? <CheckoutButton members={paymentMembers} /> : null}
    </>
  );
}

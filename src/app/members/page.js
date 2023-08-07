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
      <StackedTable
        members={members}
        title="My Members"
        description="The members that are associated with your profile"
        link="/members/register"
        buttonText="Add New Member"
      />

      {paymentMembers.length != 0 ? (
        <CheckoutButton members={paymentMembers} />
      ) : null}
    </>
  );
}

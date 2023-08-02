import StackedTable from "@/components/StackedTable";
import { createServerSupabaseClient } from "@/supabase/supabase-server";
import CheckoutButton from "@/components/CheckoutButton";

export default async function Page() {
  const supabase = createServerSupabaseClient();

  const { data, error } = await supabase.from("members").select();
  console.log(data);
  console.log(error);
  const members = data;

  // Partial of ./components/CheckoutForm.tsx

  return (
    <>
      <StackedTable members={members} />
      <CheckoutButton />
    </>
  );
}

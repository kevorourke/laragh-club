import TeamsStackedTable from "@/components/TeamTable";
import { createServerSupabaseClient } from "@/supabase/supabase-server";

async function Page() {
  const supabase = createServerSupabaseClient();

  const { data, error } = await supabase.from("teams").select();
  console.log(data);
  return <TeamsStackedTable teams={data} />;
}

export default Page;

import { createClient } from "@supabase/supabase-js";

// Note: supabaseAdmin uses the SERVICE_ROLE_KEY which you must only use in a secure server-side context
// as it has admin priviliges and overwrites RLS policies!
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  { auth: { persistSession: false } }
);

const createNewPaymentRecord = async (data) => {
  const paymentData = {
    amount: data.amount,
    member_ids: data.member_ids,
  };
  console.log(paymentData);

  const { error } = await supabaseAdmin.from("payments").insert(paymentData);
  if (error) throw error;
  console.log("Payment inserted successfully");
};

const getTeamIds = async () => {
  const { data, error } = await supabaseAdmin.from("teams").select("id");
  return data;
};

const getMemberIds = async () => {
  const { data, error } = await supabaseAdmin.from("members").select("id");
  return data;
};

const getMember = async (id) => {
  const { data, error } = await supabaseAdmin
    .from("members")
    .select()
    .eq("id", id);
  console.log(error);
  return data;
};

async function getMembers(team) {
  let members;
  if (team.adult) {
    const { membersRes, membersError } = await supabaseAdmin
      .from("members")
      .select();
    // .eq(team.code, true);
    console.log("members");
    console.log(membersRes);
    members = membersRes;
    console.log(membersError);
  } else {
    const { membersRes, error } = await supabaseAdmin
      .from("members")
      .select()
      .eq(team.code, true)
      .in("playing_year", team.year);

    console.log(error);
    members = membersRes;
  }
}

const getTeamMembers = async (id) => {
  const { data, error } = await supabaseAdmin
    .from("teams")
    .select()
    .eq("id", id);

  let teamObj = {
    team: data[0],
  };

  const members = await getMembers(teamObj.team);

  teamObj = { ...teamObj, members: members };

  return teamObj;
};

export {
  createNewPaymentRecord,
  getTeamIds,
  getMemberIds,
  getMember,
  getTeamMembers,
};

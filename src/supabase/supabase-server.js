import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { cache } from "react";

const createServerSupabaseClient = cache(() =>
  createServerComponentClient({ cookies })
);

async function getSession() {
  const supabase = createServerSupabaseClient();
  try {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    return session;
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
}

async function getProfile() {
  const supabase = createServerSupabaseClient();
  try {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    const { data } = await supabase
      .from("profiles")
      .select()
      .eq("id", session.user.id);
    return data[0];
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
}

async function getUserDetails() {
  const supabase = createServerSupabaseClient();
  try {
    const { data: userDetails } = await supabase
      .from("users")
      .select("*")
      .single();
    return userDetails;
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
}

async function getSubscription() {
  const supabase = createServerSupabaseClient();
  try {
    const { data: subscription } = await supabase
      .from("subscriptions")
      .select("*, prices(*, products(*))")
      .in("status", ["trialing", "active"])
      .maybeSingle()
      .throwOnError();
    return subscription;
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
}

const getActiveProductsWithPrices = async () => {
  const supabase = createServerSupabaseClient();
  const { data, error } = await supabase
    .from("products")
    .select("*, prices(*)")
    .eq("active", true)
    .eq("prices.active", true)
    .order("metadata->index")
    .order("unit_amount", { foreignTable: "prices" });

  if (error) {
    console.log(error.message);
  }
  return data ?? [];
};

const getTeamMembers = async (team) => {
  const supabase = createServerSupabaseClient();
  let members;
  if (team.adult) {
    let { membersRes, membersError } = await supabase
      .from("members")
      .select("id");
    // .eq(team.code, true);
    console.log("members");
    console.log(membersRes);
    return membersRes;
  } else {
    const { membersRes, error } = await supabase
      .from("members")
      .select()
      .eq(team.code, true)
      .in("playing_year", team.year);

    console.log(error);
    return membersRes;
  }
};

const getTeam = async (id) => {
  const supabase = createServerSupabaseClient();
  const { data, error } = await supabase.from("teams").select().eq("id", id);

  return data;
};

export {
  createServerSupabaseClient,
  getSession,
  getUserDetails,
  getSubscription,
  getActiveProductsWithPrices,
  getTeam,
  getTeamMembers,
  getProfile,
};

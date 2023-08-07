"use client";

import { useSupabase } from "@/supabase/SupabaseProvider";
import { useEffect, useState } from "react";
import StackedTable from "@/components/StackedTable";

export default function Page({ params }) {
  const [data, setData] = useState([]);
  const [teams, setTeams] = useState([]);

  const supabase = useSupabase();

  useEffect(() => {
    const getData = async () => {
      const teamsData = await getTeam(params.slug, supabase);
      setTeams(teamsData);
      const teamMembersData = await getTeamMembers(teamsData[0], supabase);
      setData(teamMembersData);
    };
    getData();
  }, [params.slug, supabase]);

  console.log(data);
  console.log(teams);
  return <StackedTable members={data} />;
}

async function generateStaticParams(supabase) {
  const data = await getTeamIds(supabase);
  return data.map((item) => ({ slug: item.id }));
}

const getTeamIds = async (supabase) => {
  const { data, error } = await supabase.from("teams").select("id");
  if (error) console.error("Error fetching team ids:", error);
  return data;
};

const getTeamMembers = async (team, supabase) => {
  if (team.adult) {
    const { data, error } = await supabase
      .from("members")
      .select()
      .eq(team.code, true)
      .eq("player", "yes")
      .eq("adult", true);
    if (error) console.error("Error fetching members:", error);
    return data;
  } else {
    const { data, error } = await supabase
      .from("members")
      .select()
      .eq(team.code, true)
      .in("playing_year", team.year);
    if (error) console.error("Error fetching members:", error);
    return data;
  }
};

const getTeam = async (id, supabase) => {
  const { data, error } = await supabase.from("teams").select().eq("id", id);
  if (error) console.error("Error fetching team:", error);
  return data;
};

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
      if (teamsData && teamsData.length > 0) {
        setTeams(teamsData);
        const teamMembersData = await getTeamMembers(teamsData[0], supabase);
        setData(teamMembersData);
      }
    };
    getData();
  }, [params.slug]);

  const title = teams[0]?.team_name + " " + teams[0]?.code?.toUpperCase();

  return (
    <StackedTable
      members={data}
      title={title}
      description="All the members of your team"
      link="/members/team-manager"
      buttonText="Back to team page"
    />
  );
}

async function generateStaticParams(supabase) {
  const data = await getTeamIds(supabase);
  return data.map((item) => ({ slug: item.id }));
}

const getTeamIds = async (supabase) => {
  const { data, error } = await supabase.from("teams").select("id");
  if (error) {
    console.error("Error fetching team ids:", error);
    return [];
  }
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
    if (error) {
      console.error("Error fetching members:", error);
      return [];
    }
    return data;
  } else {
    const { data, error } = await supabase
      .from("members")
      .select()
      .eq(team.code, true)
      .in("playing_year", team.year);
    if (error) {
      console.error("Error fetching members:", error);
      return [];
    }
    return data;
  }
};

const getTeam = async (id, supabase) => {
  const { data, error } = await supabase.from("teams").select().eq("id", id);
  if (error) {
    console.error("Error fetching team:", error);
    return [];
  }
  return data;
};

"use client";
import { useState, useEffect } from "react";
import { useSupabase } from "@/supabase/SupabaseProvider";
import Link from "next/link";

function StatusBar({ id }) {
  const [profile, setProfile] = useState(null);
  const supabase = useSupabase();

  useEffect(() => {
    const fetchProfile = async () => {
      const data = await getProfile(id);
      setProfile(data[0]);
      console.log(data);
    };

    fetchProfile();
  }, [id]);

  async function getProfile(id) {
    try {
      const { data } = await supabase.from("profiles").select().eq("id", id);
      return data;
    } catch (error) {
      console.error("Error:", error);
      return null;
    }
  }
  const linkType = (profile) => {
    if (profile.role === "admin") {
      return (
        <Link href="/members/admin" legacyBehavior passHref>
          <button className="flex flex-1 justify-end text-white">
            Go to Admin Portal
          </button>
        </Link>
      );
    } else if (profile.role === "team_manager") {
      return (
        <Link href="/members/team-manager" legacyBehavior passHref>
          <button className="flex flex-1 justify-end text-white">
            Go to Team Manager Portal
          </button>
        </Link>
      );
    } else {
      return (
        <Link href="/members/team-manager" legacyBehavior passHref>
          <button className="flex flex-1 justify-end text-white">
            Go to Members Dashboard
          </button>
        </Link>
      );
    }
  };

  return (
    <div className="flex gap-x-6 bg-orange-600 px-6 py-2.5 sm:px-3.5 ">
      <div className="text-sm leading-6 text-white justify-start">
        {profile ? `You are logged in as ${profile.email}` : "Loading..."}
      </div>
      {profile && linkType(profile)}
    </div>
  );
}

export default StatusBar;

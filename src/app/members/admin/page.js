"use client";
import { useSupabase } from "@/supabase/SupabaseProvider";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
function Page() {
  const router = useRouter();
  const onClick = async (person) => {
    let newRole;
    person.role === "user" ? (newRole = "team_manager") : (newRole = "user");
    const { data, error } = await supabase
      .from("profiles")
      .update({ role: newRole })
      .eq("id", person.id);
    if (error) {
      console.log(error.message);
    }
    router.refresh();
  };
  const [people, setPeople] = useState([]);
  const supabase = useSupabase();

  useEffect(() => {
    const getData = async () => {
      const data = await getProfiles(supabase);
      setPeople(data);
    };
    getData();
  }, []);

  const getProfiles = async (supabase) => {
    const { data, error } = await supabase
      .from("profiles")
      .select()
      .in("role", ["user", "team_manager"]);

    if (error) {
      console.log(error.message);
    }
    return data;
  };

  return (
    <div>
      <ul role="list" className="divide-y divide-gray-100">
        {people.map((person) => (
          <li
            key={person.email}
            className="flex items-center justify-between gap-x-6 py-5"
          >
            <div className="flex min-w-0 gap-x-4">
              <div className="min-w-0 flex-auto">
                <p className="text-sm font-semibold leading-6 text-gray-900">
                  {person.email}
                </p>
                <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                  {" "}
                  Role: {person.role}
                </p>
              </div>
            </div>
            <button
              href={person.email}
              onClick={() => onClick(person)}
              className="rounded-full bg-white px-2.5 py-1 text-xs font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
            >
              {person.role === "user"
                ? "Update role to team manager"
                : "Update role to user"}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Page;

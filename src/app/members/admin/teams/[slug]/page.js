import { getTeamIds, getTeamMembers } from "@/supabase/supabase-admin";

export default async function Page({ params }) {
  const data = await getTeamMembers(params.slug);
  console.log(data);
  return <div>My Post:{JSON.stringify(data)}</div>;
}

async function generateStaticParams() {
  const data = await getTeamIds();

  return data.map(
    (item = {
      slug: item.id,
    })
  );
}

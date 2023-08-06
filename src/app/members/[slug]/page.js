import { getMemberIds, getMember } from "@/supabase/supabase-admin";
import ProfileElement from "@/components/ProfileElement";

export default async function Page({ params }) {
  const data = await getData(params);
  const item = data[0];
  let detailsArray = [];

  for (const key in item) {
    detailsArray.push(
      <ProfileElement key={key} label={key} value={item[key]} />
    );
  }

  return (
    <ul role="list" className="divide-y divide-gray-100">
      {detailsArray}
    </ul>
  );
}

async function generateStaticParams() {
  const data = await getMemberIds();

  return data.map(
    (item = {
      slug: item.id,
    })
  );
}

async function getData(params) {
  const data = await getMember(params.slug);
  return data;
}

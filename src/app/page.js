import LatestPost from "@/components/latest-posts";

export default function Home() {
  return (
    <main>
      <LatestPost limit={3} />
    </main>
  );
}

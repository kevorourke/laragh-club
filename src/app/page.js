import LatestPost from "@/components/LatestPosts";
import HomePageHeader from "@/components/HomePageHeader";
import stradone from "../../public/stradone.png";

export default function Home() {
  return (
    <main>
      <HomePageHeader bg={stradone} />
      <LatestPost limit={3} />
    </main>
  );
}

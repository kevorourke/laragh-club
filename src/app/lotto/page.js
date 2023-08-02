import Image from "next/image";
import LottoBalls from "@/components/LottoBalls";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <LottoBalls />
    </main>
  );
}

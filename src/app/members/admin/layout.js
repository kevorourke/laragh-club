import { getProfile } from "@/supabase/supabase-server";
import { redirect } from "next/navigation";

async function Layout({ children }) {
  const session = await getProfile();

  console.log(session);
  return <>{session.role === "admin" ? children : redirect("/")}</>;
}

export default Layout;

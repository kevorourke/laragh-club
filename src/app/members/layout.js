import Login from "@/components/Login";
import { getSession } from "@/supabase/supabase-server";

async function LoggedInLayout({ children }) {
  const session = await getSession();
  return <>{session ? children : <Login />}</>;
}

export default LoggedInLayout;

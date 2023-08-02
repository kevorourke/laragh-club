"use client";
import { useSession, useSupabase } from "../supabase/SupabaseProvider";
import { useRouter } from "next/navigation";

function LoginMenuItem({ type }) {
  const session = useSession();
  const supabase = useSupabase();
  const router = useRouter();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.refresh();
  };

  const mobileMenu = (link, label) => {
    if (link === "/sign-out") {
      return (
        <div className="py-6">
          <a
            onClick={handleSignOut}
            className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
          >
            {label}
          </a>
        </div>
      );
    } else {
      return (
        <div className="py-6">
          <a
            href={link}
            className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
          >
            {label}
          </a>
        </div>
      );
    }
  };

  const desktopMenu = (link, label) => {
    if (link === "/sign-out") {
      return (
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <a
            onClick={handleSignOut}
            className="text-sm font-semibold leading-6 text-gray-900"
          >
            {label} <span aria-hidden="true">&rarr;</span>
          </a>
        </div>
      );
    } else {
      return (
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <a
            href={link}
            className="text-sm font-semibold leading-6 text-gray-900"
          >
            {label} <span aria-hidden="true">&rarr;</span>
          </a>
        </div>
      );
    }
  };

  if (session) {
    if (type === "mobile") {
      return mobileMenu("/sign-out", "Sign out");
    } else {
      return desktopMenu("/sign-out", "Sign Out");
    }
  } else {
    if (type === "mobile") {
      return mobileMenu("/members", "Login");
    } else {
      return desktopMenu("/members", "Login");
    }
  }
}

export default LoginMenuItem;

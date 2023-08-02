"use client";

import { createContext, useContext, useEffect } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";

const Context = createContext(undefined);

export default function SupabaseProvider({ children, session }) {
  const supabase = createClientComponentClient();
  const router = useRouter();

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_, _session) => {
        console.log("Start Provider");
        console.log(_session);
        console.log("End Provider");

        if (_session?.access_token !== session?.access_token) {
          router.refresh();
        }
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [router, supabase]);

  return (
    <Context.Provider value={{ supabase, session }}>
      <>{children}</>
    </Context.Provider>
  );
}

export const useSupabase = () => {
  const context = useContext(Context);

  if (context === undefined) {
    throw new Error("useSupabase must be used inside SupabaseProvider");
  }

  return context.supabase;
};

export const useSession = () => {
  const context = useContext(Context);

  if (context === undefined) {
    throw new Error("useSession must be used inside SupabaseProvider");
  }

  return context.session;
};

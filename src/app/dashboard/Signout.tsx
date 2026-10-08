"use client";

import { createClient } from "@/lib/supabase/client";

export default function Signout() {
  const supabase = createClient();

  async function signout() {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error(error);
      return;
    }
    window.location.href = "/signin";
  }

  return (
    <button className="bg-accent-light" type="button" onClick={signout}>
      Sign out
    </button>
  );
}

"use client";

import { createClient } from "@/lib/supabase/client";

export default function InsertProfile() {
  const supabase = createClient();

  async function insertProfile() {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    console.log(user?.id);
    if (user) {
      const { data, error } = await supabase
        .from("profiles")
        .insert({
          id: user.id,
          username: "Joel_dev",
          full_name: "Joel",
        })
        .select()
        .single();
      console.log(data);
      console.log(error);
    }
  }
  return (
    <button className="bg-amber-100" onClick={insertProfile}>
      Insert Pofile
    </button>
  );
}

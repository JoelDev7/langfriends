"use client";
import { createClient } from "@/lib/supabase/client";

export default function ReadProfile() {
  const supabase = createClient();
  async function readProfile() {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (user) {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      console.log(data);
      console.log(error);
    }
  }
  return (
    <button className="bg-blue-200" onClick={readProfile}>
      Read profile
    </button>
  );
}

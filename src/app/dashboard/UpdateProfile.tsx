"use client";
import { createClient } from "@/lib/supabase/client";

export default function UpdateProfile() {
  const supabase = createClient();
  async function updateProfile() {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (user) {
      const { data, error } = await supabase
        .from("profiles")
        .update({
          username: "joel_dev",
        })
        .eq("id", user.id)
        .select()
        .single();
      console.log(data);
      console.log(error);
    }
  }
  return (
    <button className="bg-fuchsia-200" onClick={updateProfile}>
      Update profile
    </button>
  );
}

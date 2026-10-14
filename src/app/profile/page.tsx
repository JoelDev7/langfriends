import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import ProfileForm from "./ProfileForm";

export default async function Profile() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/signin");
  }

  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .maybeSingle();

  if (profileError) {
    console.error(profileError);
  }
  const { data: countries, error: countriesError } = await supabase
    .from("countries")
    .select("country");

  if (countriesError) {
    console.error(countriesError);
  }

  return (
    <>
      <h1>My Profile</h1>
      <ProfileForm profile={profile} email={user.email} countries={countries} />
    </>
  );
}

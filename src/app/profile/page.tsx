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
  const { data: languages, error: languagesError } = await supabase
    .from("languages")
    .select("language");

  if (languagesError) {
    console.error(languagesError);
  }

  return (
    <div className="flex flex-col  h-vh  justify-center items-center">
      <div className="md:w-1/2 w-11/12 xl:w-1/3 border border-primary-light rounded-lg p-9 m-9">
        <ProfileForm
          profile={profile}
          email={user.email}
          countries={countries}
          languages={languages}
        />
      </div>
    </div>
  );
}

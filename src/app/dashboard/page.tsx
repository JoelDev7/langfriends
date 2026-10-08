import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Signout from "./Signout";
import InsertProfile from "./InsertProfile";
import ReadProfile from "./ReadProfile";
import UpdateProfile from "./UpdateProfile";

export default async function DashboardPage() {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getClaims();

  if (error || !data?.claims) {
    redirect("/signin");
  }
  const {
    data: { user },
  } = await supabase.auth.getUser();
  console.log(user?.id);

  return (
    <main>
      <h1>Dashboard</h1>
      <p>Welcome!</p>
      <InsertProfile />
      <Signout />
      <ReadProfile />
      <UpdateProfile />
      <pre>{JSON.stringify(data.claims, null, 2)}</pre>
    </main>
  );
}

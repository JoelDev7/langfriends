import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getClaims();

  if (error || !data?.claims) {
    redirect("/signup");
  }

  return (
    <main>
      <h1>Dashboard</h1>
      <p>Welcome!</p>

      <pre>{JSON.stringify(data.claims, null, 2)}</pre>
    </main>
  );
}

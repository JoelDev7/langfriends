import { createClient } from "@/lib/supabase/server";
import Image from "next/image";

type navLink = {
  text: string;
  link: string;
};
export default async function Header() {
  const navLinks: navLink[] = [{ link: "/", text: "Home" }];
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const { data } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user?.id)
    .single();
  return (
    <header>
      <nav className="flex justify-end p-4 gap-4">
        <ul className="flex gap-4">
          {navLinks.map((navlink) => {
            return (
              <li className="flex items-center" key={navlink.link}>
                <a className="text-primary" href={navlink.link}>
                  {navlink.text}
                </a>
              </li>
            );
          })}
        </ul>
        <a href="/profile">
          <div className="relative size-10 rounded-full overflow-hidden">
            <Image
              src={data?.avatar_url}
              fill
              alt={data?.full_name + "'s picture"}
            />
          </div>
        </a>
      </nav>
    </header>
  );
}

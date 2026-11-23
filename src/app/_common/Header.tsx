"use client";
import { useProfile } from "@/hooks/useProfile";
import Image from "next/image";
import { usePathname } from "next/navigation";

type navLink = {
  text: string;
  link: string;
};
type Props = {
  profileProp: any;
};
export default function Header({ profileProp }: Props) {
  const navLinks: navLink[] = [{ link: "/", text: "Home" }];
  const pathname = usePathname();
  const pathsToNotRender = [
    "/signup",
    "/signin",
    "/forgot-password",
    "/reset-password",
  ];
  const renderHeader = !pathsToNotRender.some((path) =>
    pathname.startsWith(path),
  );
  const { profile } = useProfile();
  if (renderHeader) {
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
                src={
                  profile?.avatar_url
                    ? profile.avatar_url
                    : profileProp.avatar_url
                }
                fill
                alt={
                  profile?.full_name
                    ? profile.full_name
                    : profileProp.full_name + "'s profile picture"
                }
              />
            </div>
          </a>
        </nav>
      </header>
    );
  }
}

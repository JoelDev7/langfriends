import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "./_common/Header";
import { createClient } from "@/lib/supabase/server";
import { ProfileProvider } from "@/contexts/ProfileContext";
import { PopoverProvider } from "@/contexts/PopoverContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Langfriends",
  description: "Language exchange website",
};

export default async function RootLayout({ children }: LayoutProps<"/">) {
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
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="w-full h-full">
        <ProfileProvider>
          <PopoverProvider>
            <Header profileProp={data} />
            {children}
          </PopoverProvider>
        </ProfileProvider>
      </body>
    </html>
  );
}

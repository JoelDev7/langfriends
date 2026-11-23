"use client";
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";

export type Profile = { avatar_url: string; full_name: string };

interface ProfileContextType {
  profile: Profile;
  setProfile: Dispatch<SetStateAction<Profile>>;
}

const ProfileContext = createContext<ProfileContextType | null>(null);

export function ProfileProvider({ children }: { children: ReactNode }) {
  const [profile, setProfile] = useState<Profile>({
    avatar_url: "",
    full_name: "",
  });

  return (
    <ProfileContext value={{ profile, setProfile }}>{children}</ProfileContext>
  );
}

export function useProfile() {
  const context = useContext(ProfileContext);

  if (!context) {
    throw new Error("use Profile must be used within a  Profile Provider");
  }

  return context;
}

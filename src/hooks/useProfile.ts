import { ProfileContext } from "../contexts/ProfileContext";
import { useContext } from "react";

export function useProfile() {
  const context = useContext(ProfileContext);

  if (!context) {
    throw new Error("use Profile must be used within a  Profile Provider");
  }

  return context;
}
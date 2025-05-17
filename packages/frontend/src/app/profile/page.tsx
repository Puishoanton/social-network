import { Metadata } from "next";
import Profile from "./components/Profile.component";

export const metadata: Metadata = {
  title: 'My profile',
}

export default function ProfilePage() {
  return (
    <Profile />
  );
}

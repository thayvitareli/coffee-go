import ProfileView from "@/features/profile/profile.view";
import { useProfileViewModel } from "@/features/profile/profile.view-model";

export default function ProfileScreen() {
  const { user, signOut } = useProfileViewModel();

  return <ProfileView user={user} signOut={signOut} />;
}

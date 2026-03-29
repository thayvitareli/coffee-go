import ProfileView from "@/features/profile/profile.view";
import { useProfileViewModel } from "@/features/profile/profile.view-model";

export default function ProfileScreen() {
  const viewModel = useProfileViewModel();

  return <ProfileView {...viewModel} />;
}

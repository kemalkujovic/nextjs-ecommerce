import { OrganizationProfile, UserProfile } from "@clerk/nextjs";

const SettingsPage = () => {
  return (
    <div className="pt-5 mt-2 flex  mx-auto">
      <UserProfile />
    </div>
  );
};

export default SettingsPage;

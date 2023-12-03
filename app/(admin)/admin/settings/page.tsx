"use client";
import { OrganizationProfile, UserProfile } from "@clerk/nextjs";
import axios from "axios";
const SettingsPage = () => {
  const setAdminStatus = async (email: string) => {
    try {
      const emails = {
        email: email,
      };
      const response = await axios.post("/api/clerk/addAdmin", emails);

      console.log(response);
    } catch (error) {
      console.error("Network error:", error);
    }
  };

  return (
    <div className="pt-5 mt-2 flex  mx-auto">
      <button onClick={() => setAdminStatus("kemalkujovic1111@gmail.com")}>
        SAD
      </button>
    </div>
  );
};

export default SettingsPage;

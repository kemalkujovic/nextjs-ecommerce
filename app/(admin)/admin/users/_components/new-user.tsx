"use client";

import axios from "axios";

const NewUser = () => {
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
    <div>
      <button onClick={() => setAdminStatus("kemalkujovic1111@gmail.com")}>
        SAD
      </button>
    </div>
  );
};

export default NewUser;

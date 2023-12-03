import TitleHeader from "@/app/(admin)/_components/title-header";
import React from "react";
import NewUser from "../_components/new-user";

const NewUserAdminPage = () => {
  return (
    <div className="p-4 mt-2 w-3/4 max-md:w-full mx-auto">
      <TitleHeader
        title="Create new Admin"
        description="Add new admin with e-mail"
      />
      <NewUser />
    </div>
  );
};

export default NewUserAdminPage;

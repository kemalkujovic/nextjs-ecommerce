import TitleHeader from "@/app/(admin)/_components/title-header";
import React from "react";

const NewUserAdminPage = () => {
  return (
    <div className="pt-4 w-4/5 max-md:w-full">
      <TitleHeader
        title="Create new Admin"
        description="Add new admin with e-mail"
      />
    </div>
  );
};

export default NewUserAdminPage;

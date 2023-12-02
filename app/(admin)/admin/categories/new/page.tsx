import React from "react";
import NewCategorie from "../_components/new-categorie";
import TitleHeader from "@/app/(admin)/_components/title-header";

const NewCategoriePage = () => {
  return (
    <div className="pt-4 w-4/5 max-md:w-full">
      <TitleHeader title="Create category" description="Add a new category" />
      <NewCategorie />
    </div>
  );
};

export default NewCategoriePage;

import React from "react";
import NewCategorie from "../_components/new-categorie";
import TitleHeader from "@/app/(admin)/_components/title-header";

const NewCategoriePage = () => {
  return (
    <div className="p-4 mt-2 w-3/4 max-md:w-full mx-auto">
      <TitleHeader title="Create category" description="Add a new category" />
      <NewCategorie />
    </div>
  );
};

export default NewCategoriePage;

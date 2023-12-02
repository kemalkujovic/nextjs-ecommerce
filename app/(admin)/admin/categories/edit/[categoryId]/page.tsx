import React from "react";
import NewCategorie from "../../_components/new-categorie";
import TitleHeader from "@/app/(admin)/_components/title-header";

const EditCategoryPage = () => {
  return (
    <div>
      <TitleHeader title="Edit category" description="Edit a category" />
      <NewCategorie />
    </div>
  );
};

export default EditCategoryPage;

import TitleHeader from "../../_components/title-header";
import TableCategories from "./_components/table-categories";

const CategoriesPage = () => {
  return (
    <div className="p-4 mt-2 w-3/4 max-md:w-full mx-auto">
      <TitleHeader
        count={0}
        title="Categoires"
        description="Manage categories for store"
        url="/admin/categories/new"
      />
      <TableCategories />
    </div>
  );
};

export default CategoriesPage;

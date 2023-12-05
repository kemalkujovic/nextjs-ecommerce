import TitleHeader from "@/app/(admin)/_components/title-header";
import AddProduct from "./_components/add-product";

const NewPage = () => {
  return (
    <div className="p-4 mt-2 w-3/4 max-md:w-full mx-auto">
      <TitleHeader title="Create Product" description="Add a new product" />
      <AddProduct />
    </div>
  );
};

export default NewPage;

import TitleHeader from "@/app/(admin)/_components/title-header";
import AddProduct from "./_components/add-product";
import NewHeader from "./_components/new-header";

const NewPage = () => {
  return (
    <div className="pt-4 w-4/5 max-md:w-full">
      <TitleHeader title="Create Product" description="Add a new product" />
      <AddProduct />
    </div>
  );
};

export default NewPage;

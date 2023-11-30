import axios from "axios";
import ProductTable from "./_components/table-products";
import TitleHeader from "../../_components/title-header";

const ProductsPage = async () => {
  return (
    <div className="p-4 mt-2 w-3/4 max-md:w-full mx-auto">
      <ProductTable />
    </div>
  );
};

export default ProductsPage;

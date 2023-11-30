import axios from "axios";
import ProductTable from "./_components/table-products";
import ProductItem from "./_components/product-header";

const ProductsPage = async () => {
  return (
    <div className="p-4 mt-2 w-3/4 max-md:w-full mx-auto">
      <ProductItem />
      <ProductTable />
    </div>
  );
};

export default ProductsPage;

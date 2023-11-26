import axios from "axios";
import ProductTable from "./_components/table-products";
import ProductItem from "./_components/product-header";

const ProductsPage = async () => {
  return (
    <div className="pt-4 w-4/5 max-md:w-full">
      <ProductItem />
      <ProductTable />
    </div>
  );
};

export default ProductsPage;

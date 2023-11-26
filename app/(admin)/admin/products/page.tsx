import axios from "axios";
import ProductTable from "./_components/table-products";
import ProductItem from "./_components/product-header";

const ProductsPage = async () => {
  return (
    <div className="pt-4 pr-4  w-full">
      <ProductItem />
      <ProductTable />
    </div>
  );
};

export default ProductsPage;

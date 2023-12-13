import { getAllProducts, getCategories } from "@/lib/apiCalls";
import SidebarItems from "./sidebar-items";
import PriceInput from "./price-input";

const SidebarProducts = async () => {
  const category = await getCategories();
  const data = await getAllProducts();

  return (
    <div className="w-1/6 max-sm:w-full p-4 flex flex-col gap-y-1">
      <p className="font-semibold mt-1">Category</p>
      <SidebarItems category={category} />
      <PriceInput data={data} />
    </div>
  );
};

export default SidebarProducts;

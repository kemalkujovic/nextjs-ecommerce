import { getCategories } from "@/lib/apiCalls";
import SidebarItems from "./sidebar-items";

const SidebarProducts = async () => {
  const category = await getCategories();
  return (
    <div className="w-1/6 max-sm:w-full p-4 flex flex-col gap-y-1">
      <p className="font-semibold mt-1">Category</p>
      <SidebarItems category={category} />
    </div>
  );
};

export default SidebarProducts;

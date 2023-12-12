import { Category } from "@/types";
import Link from "next/link";

type CategoryProps = {
  data: Category[];
};

const SidebarProducts: React.FC<CategoryProps> = (data) => {
  return (
    <div className="flex flex-col gap-y-1">
      <p className="font-semibold">Category</p>
      <Link href="/shop" className="text-sm">
        All
      </Link>
      {data.data?.map((category: any) => (
        <Link
          href={`/shop/${category.category}`}
          key={category.id}
          className="text-sm"
        >
          {category.category[0].toUpperCase() + category.category.slice(1)}
        </Link>
      ))}
    </div>
  );
};

export default SidebarProducts;

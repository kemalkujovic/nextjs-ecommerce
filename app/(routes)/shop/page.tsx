import Container from "@/components/ui/container";
import SidebarProducts from "./_components/sidebar-products";
import { getCategories } from "@/lib/apiCalls";

export const metadata = {
  title: "Shop | Kemal Store",
  description: `Shop for e-ecommerce, selling products, and new productivity`,
};

const ShopPage = async () => {
  const category = await getCategories();

  return (
    <Container>
      <div className="p-4 sm:p-6 lg:p-8">
        <SidebarProducts data={category} />
      </div>
    </Container>
  );
};

export default ShopPage;

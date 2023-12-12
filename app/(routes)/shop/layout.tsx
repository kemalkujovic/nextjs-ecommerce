import Container from "@/components/ui/container";
import SidebarProducts from "./_components/sidebar-products";
import SortItems from "./_components/sort-items";

const Layout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <Container>
      <div className="h-full w-full py-5 sm:px-6 lg:px-10 flex max-sm:flex-col">
        <SidebarProducts />
        <div className="flex-1 p-4">
          <SortItems count={23} />
          {children}
        </div>
      </div>
    </Container>
  );
};

export default Layout;

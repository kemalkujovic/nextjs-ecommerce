import Container from "@/components/ui/container";
import SidebarProducts from "./_components/sidebar-products";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Container>
      <div className="h-full w-full py-5 sm:px-6 lg:px-10 flex max-sm:flex-col">
        <SidebarProducts />
        <div className="flex-1 p-4">{children}</div>
      </div>
    </Container>
  );
};

export default Layout;

import Footer from "@/components/footer";
import SortItems from "../shop/_components/sort-items";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div className="min-h-full w-full py-5 sm:px-6 lg:px-10 flex max-sm:flex-col mx-auto max-w-7xl">
        <div className="flex-1 p-4 ">
          <SortItems />
          {children}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Layout;

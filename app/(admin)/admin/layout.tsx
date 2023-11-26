import Navbar from "../_components/Navbar";
import Sidebar from "../_components/Sidebar";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full">
      <Navbar />
      <main className="pt-14 flex h-full gap-x-7">
        <Sidebar />
        {children}
      </main>
    </div>
  );
};

export default AdminLayout;
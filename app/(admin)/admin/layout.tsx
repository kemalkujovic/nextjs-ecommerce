import Navbar from "../_components/Navbar";
import Sidebar from "../_components/Sidebar";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Navbar />
      <Sidebar />
      {children}
    </div>
  );
};

export default AdminLayout;

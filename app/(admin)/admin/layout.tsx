import { auth } from "@clerk/nextjs";
import Navbar from "../_components/Navbar";
import Sidebar from "../_components/Sidebar";
import { redirect } from "next/navigation";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  const { userId } = auth();
  if (!userId) {
    redirect("/sign-in");
  }
  return (
    <div className="h-full">
      <Navbar />
      <main className="pt-14 flex h-full gap-x-7">
        <div className="w-64 shrink-0 hidden md:block">
          <Sidebar />
        </div>
        {children}
      </main>
    </div>
  );
};

export default AdminLayout;

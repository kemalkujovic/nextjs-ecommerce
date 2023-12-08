import Navbar from "../_components/Navbar";
import Sidebar from "../_components/Sidebar";
import { redirect } from "next/navigation";
import { currentUser } from "@clerk/nextjs";

export const metadata = {
  title: "Admin | Kemal Store",
  description: `Admin for e-ecommerce, selling products, and new productivity`,
};

const AdminLayout = async ({ children }: { children: React.ReactNode }) => {
  const user = await currentUser();

  if (!user || !user.unsafeMetadata.isAdmin) {
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

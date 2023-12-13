import Footer from "@/components/footer";
import NavBar from "@/components/navbar";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div className="min-h-full h-full w-full">
        <NavBar />
        {children}
      </div>
    </>
  );
};

export default layout;

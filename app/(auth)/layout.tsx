import Footer from "@/components/footer";
import NavBar from "@/components/navbar";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <NavBar />
      {children}
      <Footer />
    </>
  );
};

export default layout;

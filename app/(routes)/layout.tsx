import NavBar from "@/components/navbar";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className=" h-full w-full">
      <NavBar />
      {children}
    </div>
  );
};

export default layout;

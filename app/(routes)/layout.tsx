import NavBar from "@/components/navbar";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-gray-50 h-full w-full">
      <NavBar />
      {children}
    </div>
  );
};

export default layout;

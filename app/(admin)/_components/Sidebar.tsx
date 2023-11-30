import NavItem from "./nav-item";

const Sidebar = () => {
  return (
    <div className="md:block relative h-screen bg-neutral-800 w-64  max-md:w-full font-medium text-xs py-4 mb-1">
      <NavItem />
    </div>
  );
};

export default Sidebar;

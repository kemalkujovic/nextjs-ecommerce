import NavItem from "./nav-item";

const Sidebar = () => {
  return (
    <div className="hidden md:block relative h-full bg-neutral-800 w-64 font-medium text-xs py-4 mb-1">
      <NavItem />
    </div>
  );
};

export default Sidebar;

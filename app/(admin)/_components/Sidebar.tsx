import NavItem from "./nav-item";

const Sidebar = () => {
  return (
    <div className="fixed top-14 h-full bg-neutral-800 w-64 font-medium text-xs py-8 mb-1">
      <NavItem />
    </div>
  );
};

export default Sidebar;

import React from "react";
import Navlinks from "./Navlinks";

const Sidebar = () => {
  return (
    <div className="w-[300px] h-[92vh] border-r shadow-sm max-md:hidden p-2">
      <Navlinks />
    </div>
  );
};

export default Sidebar;

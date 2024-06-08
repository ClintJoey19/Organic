import React from "react";
import Navlinks from "./Navlinks";

const Sidebar = () => {
  return (
    <div className="fixed top-[8vh] left-0 z-10 w-[300px] h-[92vh] border-r shadow-sm max-md:hidden p-2 bg-white">
      <Navlinks />
    </div>
  );
};

export default Sidebar;

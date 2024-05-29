import { Minus, Plus } from "lucide-react";
import React from "react";

type Size = "sm" | "md";

const QuantityTracker = ({ size }: { size: Size }) => {
  const iconSize = {
    sm: "h-5 w-5",
    md: "h-8 w-8",
  };

  const fontSize = {
    sm: "text-md",
    md: "text-2xl",
  };
  return (
    <div className="flex gap-x-4 items-center">
      <Minus
        className={`${iconSize[size]} text-white bg-primary rounded-md p-1 cursor-pointer`}
      />
      <span className={`${fontSize[size]}`}>1</span>
      <Plus
        className={`${iconSize[size]} text-white bg-primary rounded-md p-1 cursor-pointer`}
      />
    </div>
  );
};

export default QuantityTracker;

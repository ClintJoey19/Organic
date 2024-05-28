import { Minus, Plus } from "lucide-react";
import React from "react";

const QuantityTracker = () => {
  return (
    <div className="flex gap-x-2 items-center">
      <Minus className="h-5 w-5 text-white bg-primary rounded-md p-1" />
      <span>1</span>
      <Plus className="h-5 w-5 text-white bg-primary rounded-md p-1" />
    </div>
  );
};

export default QuantityTracker;

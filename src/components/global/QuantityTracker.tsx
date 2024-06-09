"use client";
import { Minus, Plus } from "lucide-react";
import { Operator } from "../product/forms/ProductPurchaseControlForm";

type Size = "sm" | "md";

interface QuantityTrackerProps {
  size: Size;
  quantity: number;
  handleQuantity: (operation: Operator) => void;
}

const QuantityTracker = ({
  size,
  quantity,
  handleQuantity,
}: QuantityTrackerProps) => {
  const iconSize = {
    sm: "h-5 w-5",
    md: "h-8 w-8",
  };

  const fontSize = {
    sm: "text-md",
    md: "text-2xl",
  };
  return (
    <div className="flex justify-end items-center gap-x-4">
      <Minus
        className={`${iconSize[size]} text-white bg-primary rounded-md p-1 cursor-pointer`}
        onClick={() => handleQuantity("minus")}
      />
      <span className={`${fontSize[size]}`}>{quantity}</span>
      <Plus
        className={`${iconSize[size]} text-white bg-primary rounded-md p-1 cursor-pointer`}
        onClick={() => handleQuantity("add")}
      />
    </div>
  );
};

export default QuantityTracker;

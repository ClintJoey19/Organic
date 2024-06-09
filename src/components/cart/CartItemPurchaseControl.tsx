"use client";
import { useState } from "react";
import { Operator } from "../product/forms/ProductPurchaseControlForm";
import QuantityTracker from "../global/QuantityTracker";

const CartItemPurchaseControl = () => {
  const [quantity, setQuantity] = useState<number>(1);

  const handleQuantity = (operation: Operator) => {
    switch (operation) {
      case "add": {
        setQuantity((prev) => prev + 1);
        break;
      }
      case "minus": {
        if (quantity === 1) return;
        setQuantity((prev) => prev - 1);
        break;
      }
    }
  };

  return (
    <div>
      <QuantityTracker
        size="sm"
        quantity={quantity}
        handleQuantity={handleQuantity}
      />
    </div>
  );
};

export default CartItemPurchaseControl;

"use client";
import { Operator } from "../product/forms/ProductPurchaseControlForm";
import QuantityTracker from "../global/QuantityTracker";
import { updateCartItem } from "@/lib/actions/cart-item.action";
import { usePathname } from "next/navigation";

interface CartItemPurchaseControlProps {
  id: string;
  quantity: number;
  stocks: number;
}

const CartItemPurchaseControl = ({
  id,
  quantity,
  stocks,
}: CartItemPurchaseControlProps) => {
  const pathname = usePathname();

  const handleQuantity = async (operation: Operator) => {
    switch (operation) {
      case "add": {
        if (quantity >= stocks) return;
        await updateCartItem(id, "quantity", quantity + 1, pathname);
        break;
      }
      case "minus": {
        if (quantity === 1) return;
        await updateCartItem(id, "quantity", quantity - 1, pathname);
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

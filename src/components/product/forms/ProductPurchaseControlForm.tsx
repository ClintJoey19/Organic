"use client";
import QuantityTracker from "@/components/global/QuantityTracker";
import { Button } from "@/components/ui/button";
import { log } from "console";
import Link from "next/link";
import { useState } from "react";

export type Operator = "add" | "minus";

interface ProductPurchaseControlFormProps {
  productId: string;
  stocks: number;
}

const ProductPurchaseControlForm = ({
  productId,
  stocks,
}: ProductPurchaseControlFormProps) => {
  const [quantity, setQuantity] = useState(1);

  const handleQuantity = (operation: Operator) => {
    switch (operation) {
      case "add": {
        if (quantity >= stocks) return;
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

  const addToCart = async () => {
    try {
      console.log("Added to cart");
    } catch (error: any) {
      console.error(error.message);
    }
  };

  return (
    <div>
      <div className="flex justify-end mt-4">
        <QuantityTracker
          size="md"
          quantity={quantity}
          handleQuantity={handleQuantity}
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-4">
        <Button variant="outline" onClick={addToCart}>
          Add to Cart
        </Button>
        <Button asChild>
          <Link href={`/checkout?productId=${productId}&quantity=${quantity}`}>
            Buy
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default ProductPurchaseControlForm;

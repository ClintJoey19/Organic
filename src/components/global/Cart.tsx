"use client";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ShoppingBasket } from "lucide-react";
import CartItem from "./CartItem";
import { Button } from "../ui/button";
import { formatPrice } from "@/lib/utils";

const Cart = () => {
  return (
    <Sheet>
      <SheetTrigger>
        <ShoppingBasket className="hover:text-primary cursor-pointer transition" />
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Shopping Cart</SheetTitle>
        </SheetHeader>
        <div className="flex flex-col justify-between gap-y-2 mt-2">
          <div className="flex flex-col gap-y-2">
            <CartItem />
          </div>
          <div className="flex flex-col gap-y-2">
            <div className="flex justify-between items-center">
              <p>Total:</p>
              <span>{formatPrice(40)}</span>
            </div>
            <Button>Checkout</Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default Cart;

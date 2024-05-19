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
        <div>// Todo Added Carts...</div>
      </SheetContent>
    </Sheet>
  );
};

export default Cart;

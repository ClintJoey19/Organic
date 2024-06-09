import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ShoppingBasket } from "lucide-react";
import CartItem from "./CartItem";
import { Button } from "../ui/button";
import { formatPrice } from "@/lib/utils";
import Link from "next/link";
import { getCartItems } from "@/lib/actions/cart-item.action";

interface CartItem {
  _id: string;
  userId: string;
  productId: string;
  quantity: number;
  isChecked: boolean;
}

const Cart = async () => {
  const cartItems = await getCartItems();

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
          <Link
            href="/transactions"
            className="text-end text-sm hover:underline hover:text-primary transition"
          >
            View Transactions
          </Link>
          <div className="flex flex-col gap-y-2 h-[540px] overflow-y-auto">
            {cartItems.map((item: CartItem) => (
              <CartItem
                key={item._id}
                id={item._id}
                productId={item.productId}
                quantity={item.quantity}
              />
            ))}
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

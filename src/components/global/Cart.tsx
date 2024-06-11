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
  price: number;
  quantity: number;
  isChecked: boolean;
}

const Cart = async () => {
  const cartItems: CartItem[] = await getCartItems("666025f1618f8955d4f8e44b");
  const totalAmount = cartItems.reduce<number>(
    (accumulator: number, item: CartItem) => {
      if (item.isChecked) {
        return accumulator + item.price * item.quantity;
      } else {
        return accumulator;
      }
    },
    0
  );

  return (
    <Sheet>
      <SheetTrigger>
        <div className="relative">
          <ShoppingBasket className="hover:text-primary cursor-pointer transition" />
          {cartItems && cartItems.length > 0 && (
            <span className="w-5 h-5 absolute -top-2 -right-2 flex items-center justify-center bg-destructive rounded-full text-xs font-medium text-white">
              {cartItems.length}
            </span>
          )}
        </div>
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
            {cartItems && cartItems.length > 0 ? (
              cartItems.map((item: CartItem) => (
                <CartItem
                  key={item._id}
                  id={item._id}
                  productId={item.productId}
                  quantity={item.quantity}
                  isChecked={item.isChecked}
                />
              ))
            ) : (
              <p className="m-auto">No added cart items.</p>
            )}
          </div>
          <div className="flex flex-col gap-y-2">
            <div className="flex justify-between items-center">
              <p>Total:</p>
              <span>{formatPrice(totalAmount)}</span>
            </div>
            <Button asChild>
              <Link href={`/checkout?cart=666025f1618f8955d4f8e44b`}>
                Checkout
              </Link>
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default Cart;

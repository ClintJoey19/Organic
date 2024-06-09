import { Checkbox } from "../ui/checkbox";
import Image from "next/image";
import { Trash } from "lucide-react";
import QuantityTracker from "./QuantityTracker";
import { formatPrice } from "@/lib/utils";
import CartItemPurchaseControl from "../cart/CartItemPurchaseControl";

interface CartItemProps {
  id: string;
  productId: string;
  quantity: number;
  price: number;
}

const CartItem = ({ id, productId, quantity, price }: CartItemProps) => {
  return (
    <div className="flex flex-col justify-between border border-slate-200 p-2 rounded-md hover:shadow-md transition cursor-pointer relative">
      <div className="flex gap-x-2 items-center">
        <Checkbox />
        <Image src={"/apple.webp"} alt="apple" height={70} width={70} />
        <p className="font-medium">Apple</p>
      </div>
      <div className="flex flex-col items-end gap-x-2">
        <span>{formatPrice(40)}</span>
        <CartItemPurchaseControl />
      </div>
      <Trash className="h-6 w-6 bg-destructive text-white rounded-md p-1 absolute top-1 right-1" />
    </div>
  );
};

export default CartItem;

import { Checkbox } from "../ui/checkbox";
import Image from "next/image";
import { Trash } from "lucide-react";
import { formatPrice } from "@/lib/utils";
import CartItemPurchaseControl from "../cart/CartItemPurchaseControl";
import { ProductClient } from "@/app/(root)/products/page";
import { getProduct } from "@/lib/actions/product.action";
import DeleteCartItem from "../cart/DeleteCartItem";

interface CartItemProps {
  id: string;
  productId: string;
  quantity: number;
}

const CartItem = async ({ id, productId, quantity }: CartItemProps) => {
  const product: ProductClient = await getProduct(productId);

  return (
    <div className="flex flex-col justify-between border border-slate-200 p-2 rounded-md hover:shadow-md transition cursor-pointer relative">
      <div className="flex gap-x-2 items-center">
        <Checkbox />
        <Image
          src={product.productImg}
          alt={product.name}
          height={70}
          width={70}
        />
        <p className="font-medium">{product.name}</p>
      </div>
      <div className="flex flex-col items-end gap-x-2">
        <span>{formatPrice(product.price)}</span>
        <CartItemPurchaseControl
          id={id}
          quantity={quantity}
          stocks={product.stocks}
        />
      </div>
      <DeleteCartItem id={id} />
    </div>
  );
};

export default CartItem;

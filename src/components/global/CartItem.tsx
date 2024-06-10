import { Checkbox } from "../ui/checkbox";
import Image from "next/image";
import { formatPrice } from "@/lib/utils";
import CartItemPurchaseControl from "../cart/CartItemPurchaseControl";
import { ProductClient } from "@/app/(root)/products/page";
import { getProduct } from "@/lib/actions/product.action";
import DeleteCartItem from "../cart/DeleteCartItem";
import CheckCartItem from "../cart/CheckCartItem";

interface CartItemProps {
  id: string;
  productId: string;
  quantity: number;
  isChecked: boolean;
}

const CartItem = async ({
  id,
  productId,
  quantity,
  isChecked,
}: CartItemProps) => {
  const product: ProductClient = await getProduct(productId);

  return (
    <div className="flex flex-col justify-between border border-slate-200 p-2 rounded-md hover:shadow-md transition cursor-pointer relative">
      <div className="flex gap-x-2 items-center">
        <CheckCartItem id={id} isChecked={isChecked} />
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

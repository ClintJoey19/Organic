import { ProductClient } from "@/app/(root)/products/page";
import { getProduct } from "@/lib/actions/product.action";
import { formatPrice } from "@/lib/utils";
import Image from "next/image";

interface CheckoutItemProps {
  productId: string;
  quantity: number;
}

const CheckoutItem = async ({ productId, quantity }: CheckoutItemProps) => {
  const { name, price, productImg }: ProductClient = await getProduct(
    productId
  );
  return (
    <div className="border border-slate-300 p-2 rounded-sm flex justify-between items-center gap-2">
      <Image
        src={productImg}
        alt={name}
        height={60}
        width={60}
        objectFit="cover"
      />
      <div className="flex flex-col">
        <p className="text-sm mb-2">{name}</p>
        <div className="flex max-md:flex-col justify-end gap-2">
          <span className="text-sm">{formatPrice(price)}</span>
          <span className="text-sm">{quantity} kg</span>
        </div>
      </div>
    </div>
  );
};

export default CheckoutItem;

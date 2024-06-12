import { ProductClient } from "@/app/(root)/products/page";
import { getProduct } from "@/lib/actions/product.action";
import { formatPrice } from "@/lib/utils";
import Image from "next/image";
import React from "react";

interface OrderItemProps {
  id: string;
  productId: string;
  quantity: number;
}

const OrderItem = async ({ id, productId, quantity }: OrderItemProps) => {
  const product: ProductClient = await getProduct(productId);

  return (
    <div className="flex items-center gap-2 border border-slate-300 rounded-md">
      <div className="">
        <Image
          src={product.productImg}
          alt={product.name}
          height={100}
          width={100}
          objectFit="cover"
        />
      </div>
      <div className="w-full flex flex-col gap-2 items-end p-2">
        <p>{product.name}</p>
        <div className="flex gap-2 items-center">
          <p className="text-slate-500 text-sm">&times; {quantity}</p>
          <p className="text-sm">{formatPrice(product.price)}</p>
        </div>
      </div>
    </div>
  );
};

export default OrderItem;

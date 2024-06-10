import { formatPrice } from "@/lib/utils";
import Image from "next/image";

interface CheckoutItemProps {
  name: string;
  price: number;
  quantity: number;
  productImg: string;
}

const CheckoutItem = ({
  name,
  price,
  quantity,
  productImg,
}: CheckoutItemProps) => {
  return (
    <div className="w-full flex flex-col gap-4">
      <h3 className="font-semibold">Product</h3>
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
    </div>
  );
};

export default CheckoutItem;

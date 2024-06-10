"use client";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
import { formatPrice } from "@/lib/utils";
import { Star } from "lucide-react";
import { createCartItem } from "@/lib/actions/cart-item.action";
import toast from "react-hot-toast";
import { usePathname } from "next/navigation";

interface ProductProps {
  id: string;
  name: string;
  category: string;
  price: number;
  stocks: number;
  productImg: string;
  ratings?: number;
}

const Product = ({
  id,
  name,
  price,
  stocks,
  productImg,
  ratings,
}: ProductProps) => {
  const pathname = usePathname();

  const addToCart = async () => {
    try {
      await createCartItem("666025f1618f8955d4f8e44b", id, price, 1, pathname);

      toast.success("Product added to cart");
    } catch (error: any) {
      console.error(error.message);
    }
  };
  return (
    <div className="w-full rounded-xl hover:shadow-md transition flex flex-col overflow-hidden border border-slate-200 relative">
      <div className="w-full h-[200px] relative overflow-hidden">
        <Image
          src={productImg}
          alt={name}
          fill
          objectFit="cover"
          className="hover:scale-110 transition"
        />
      </div>
      <div className="flex flex-col gap-2 p-2">
        <Link
          href={`/products/${id}`}
          className="font-medium hover:text-primary transition"
        >
          {name}
        </Link>
        <div className="flex flex-col gap-y-2 items-end">
          <p className="text-left">{formatPrice(price)}</p>
          <p className="flex items-center gap-x-1">
            {ratings || 0} <Star className="h-4 w-4 text-primary" />
          </p>
        </div>
        <div className="flex flex-col gap-2">
          <Button variant="outline" onClick={addToCart}>
            Add to Cart
          </Button>
          <Button asChild>
            <Link href={`/checkout?productId=${id}&quantity=1`}>Buy</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Product;

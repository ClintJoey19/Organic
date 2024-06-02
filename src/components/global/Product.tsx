import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
import { formatPrice } from "@/lib/utils";
import { Star } from "lucide-react";

interface ProductProps {
  id: string;
  name: string;
  category: string;
  price: number;
  quantity: number;
  quality: string;
  imageUrl: string;
  ratings: number;
}

const Product = ({
  id,
  name,
  price,
  quantity,
  quality,
  imageUrl,
  ratings,
}: ProductProps) => {
  return (
    <div className="w-full rounded-xl hover:shadow-md transition flex flex-col overflow-hidden border border-slate-200 relative">
      <div className="w-full h-[200px] relative overflow-hidden">
        <Image
          src={imageUrl}
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
            {ratings} <Star className="h-4 w-4 text-primary" />
          </p>
        </div>
        <div className="flex flex-col gap-2">
          <Button variant="outline">Add to Cart</Button>
          <Button asChild>
            <Link href={`/checkout?productId=${id}&quantity=1`}>Buy</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Product;

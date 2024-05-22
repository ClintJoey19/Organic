import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";

interface ProductProps {
  id: string;
  name: string;
  price: number;
  quantity: number;
  quality: string;
  imageUrl: string;
}

const Product = ({
  id,
  name,
  price,
  quantity,
  quality,
  imageUrl,
}: ProductProps) => {
  return (
    <div className="w-full rounded-md hover:shadow-md transition flex flex-col overflow-hidden outline-1 outline outline-slate-200 relative">
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
        <Link href={`/products/${id}`}>{name}</Link>
        <div className="flex flex-col gap-2">
          <Button>Add to Cart</Button>
          <Button variant="outline" asChild>
            <Link href={`/checkout?productId='${id}'`}>Buy</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Product;

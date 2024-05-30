import QuantityTracker from "@/components/global/QuantityTracker";
import ProductReview from "@/components/product/ProductReview";
import StarReview from "@/components/product/StarReview";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { formatPrice } from "@/lib/utils";
import { Star } from "lucide-react";
import Image from "next/image";
import React from "react";

interface ProductPageProps {
  params: {
    productId: string;
  };
}

const page = ({ params }: ProductPageProps) => {
  return (
    <section className="container">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div className="h-[500px] max-sm:h-[300px] relative p-4 border border-slate-200 rounded-lg">
          <Image src={`/apple.webp`} alt="apple" fill objectFit="cover" />
        </div>
        <div className="p-4">
          <h2 className="text-2xl font-medium">Apple</h2>
          <p className="mb-4">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae alias
            quo consectetur cupiditate, nihil in.
          </p>
          <span className="text-4xl font-medium">{formatPrice(40)}</span>
          <div className="flex justify-between items-center">
            <p className="flex items-center gap-x-1 text-sm">
              5 <Star className="h-4 w-4 text-primary" />
            </p>
            <p className="text-slate-700 text-sm">2.1k sold</p>
          </div>
          <div className="flex justify-end mt-4">
            <QuantityTracker size="md" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-4">
            <Button variant="outline">Add to Cart</Button>
            <Button>Buy</Button>
          </div>
        </div>
      </div>
      <div>
        <h2 className="page-title mb-4">Product Reviews</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          <div className="flex flex-col gap-y-2">
            <h3>Reviews</h3>
            <ProductReview />
            <ProductReview />
            <ProductReview />
          </div>
          <div className="max-md:order-first">
            <StarReview />
            <div className="mb-2">
              <Textarea placeholder="e.g. 'This product is ...'" />
            </div>
            <div className="flex justify-end">
              <Button>Submit</Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default page;

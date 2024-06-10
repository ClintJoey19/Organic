import QuantityTracker from "@/components/global/QuantityTracker";
import ProductReview from "@/components/product/ProductReview";
import StarReview from "@/components/product/StarReview";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { getProduct } from "@/lib/actions/product.action";
import { formatPrice } from "@/lib/utils";
import { Star } from "lucide-react";
import Image from "next/image";
import { ProductClient } from "../page";
import ProductPurchaseControlForm from "@/components/product/forms/ProductPurchaseControlForm";

interface ProductPageProps {
  params: {
    productId: string;
  };
}

const page = async ({ params }: ProductPageProps) => {
  const product: ProductClient = await getProduct(params.productId);

  return (
    <section className="container">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div className="h-[500px] max-sm:h-[300px] relative p-4 border border-slate-200 rounded-lg">
          <Image src={product.productImg} alt="apple" fill objectFit="cover" />
        </div>
        <div className="p-4">
          <h2 className="text-2xl font-medium mb-4">{product.name}</h2>
          <p className="mb-4 text-slate-500 text-sm text-justify">
            {product.description}
          </p>
          <span className="text-4xl font-medium">
            {formatPrice(product.price)}
          </span>
          <div className="flex justify-between items-center">
            <p className="flex items-center gap-x-1 text-sm">
              {product.ratings || 0} <Star className="h-4 w-4 text-primary" />
            </p>
            <p className="text-slate-700 text-sm">{product.sold || 0} sold</p>
          </div>
          <p className="text-sm">
            In Stocks: <span>{product.stocks} kg</span>
          </p>
          <ProductPurchaseControlForm
            productId={params.productId}
            price={product.price}
            stocks={product.stocks}
          />
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

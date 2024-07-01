import ProductReview from "@/components/product/ProductReview";
import { getProduct } from "@/lib/actions/product.action";
import { formatPrice } from "@/lib/utils";
import { Star } from "lucide-react";
import Image from "next/image";
import { ProductClient } from "../page";
import ProductPurchaseControlForm from "@/components/product/forms/ProductPurchaseControlForm";
import ProductReviewForm from "@/components/product/ProductReviewForm";
import ProductReviews from "@/components/product/ProductReviews";
import { currentUser } from "@clerk/nextjs/server";
import { getUser } from "@/lib/actions/user.action";

interface ProductPageProps {
  params: {
    productId: string;
  };
}

const page = async ({ params }: ProductPageProps) => {
  const current = await currentUser();
  const email = current?.emailAddresses[0].emailAddress;

  if (email) {
    const user = await getUser(email);
  }

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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <ProductReviews productId={product._id} />
          <div className="max-md:order-first">
            <ProductReviewForm
              productId={product._id}
              rating={product.ratings}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default page;

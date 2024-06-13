import React from "react";
import ProductReview from "./ProductReview";
import { getReviews } from "@/lib/actions/review.action";

interface ProductReview {
  _id: string;
  userId: string;
  productId: string;
  rating: number;
  comment: string;
  createdAt: string;
}

const ProductReviews = async ({ productId }: { productId: string }) => {
  const reviews: ProductReview[] = await getReviews(productId);

  return (
    <div className="flex flex-col gap-y-2">
      <h3 className="mb-2">Reviews</h3>
      {!reviews ||
        (reviews.length === 0 && (
          <div className="h-[100px] flex items-center justify-center rounded-md border border-slate-300">
            <p className="text-slate-500 italic">
              There are no product reviews yet.
            </p>
          </div>
        ))}
      {reviews.map((review) => (
        <ProductReview
          key={review._id}
          id={review._id}
          userId={review.userId}
          productId={review.productId}
          rating={review.rating}
          comment={review.comment}
          createdAt={review.createdAt}
        />
      ))}
    </div>
  );
};

export default ProductReviews;

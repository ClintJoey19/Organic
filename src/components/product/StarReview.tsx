"use client";
import { useState } from "react";
import { Star } from "lucide-react";

const StarReview = () => {
  const [starred, setStarred] = useState(0);

  const handleStar = (star: number) => {
    setStarred(star);
  };

  return (
    <div className="flex justify-between mb-4">
      <h3>Rate this product</h3>
      <div className="flex gap-x-2">
        {Array.from([1, 2, 3, 4, 5]).map((star) => (
          <Star
            key={star}
            className={`h-5 w-5 ${
              star <= starred ? "text-primary" : "text-slate-700"
            } cursor-pointer`}
            onClick={() => handleStar(star)}
          />
        ))}
      </div>
    </div>
  );
};

export default StarReview;

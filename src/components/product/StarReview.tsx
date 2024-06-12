import { Star } from "lucide-react";

interface StarReviewProps {
  rating: number;
  handleRating: (star: number) => void;
}

const StarReview = ({ rating, handleRating }: StarReviewProps) => {
  return (
    <div className="flex justify-between">
      <h3 className="font-medium">Rate this product</h3>
      <div className="flex gap-x-2">
        {Array.from([1, 2, 3, 4, 5]).map((star) => (
          <Star
            key={star}
            className={`h-5 w-5 ${
              star <= rating ? "text-primary" : "text-slate-700"
            } cursor-pointer`}
            onClick={() => handleRating(star)}
          />
        ))}
      </div>
    </div>
  );
};

export default StarReview;

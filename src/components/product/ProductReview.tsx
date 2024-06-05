import { Star } from "lucide-react";
import Image from "next/image";
import React from "react";

const ProductReview = () => {
  const starred = 5;
  return (
    <div className="p-4 rounded-md border border-slate-300 flex gap-x-2">
      <div>
        <Image
          src={"/profile-user(1).png"}
          alt="user-profile"
          height={35}
          width={35}
        />
      </div>
      <div className="w-full flex flex-col gap-x-2">
        <div className="w-full flex justify-between items-center mb-2">
          <p className="text-sm">User Name</p>
          <div className="flex gap-x-2 items-center">
            {Array.from([1, 2, 3, 4, 5]).map((star) => (
              <Star
                key={star}
                className={`h-4 w-4 ${
                  star <= starred ? "text-primary" : "text-slate-700"
                }`}
              />
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-sm text-slate-500">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Culpa quod
            labore ut ipsam illo delectus fugiat provident magni vero. Delectus?
          </p>
          <p className="text-xs text-slate-500 text-end">05/30/2024</p>
        </div>
      </div>
    </div>
  );
};

export default ProductReview;

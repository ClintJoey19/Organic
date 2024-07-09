import React from "react";
import { Skeleton } from "../ui/skeleton";

const ProductsLoading = () => {
  return (
    <div className="grid grid-cols-5 max-xl:grid-cols-4 max-lg:grid-cols-3 max-sm:grid-cols-2 max-xs:grid-cols-1 gap-4">
      {Array.from({ length: 10 }).map((_, i) => (
        <div key={i} className="rounded-md">
          <div className="w-full h-[200px]">
            <Skeleton className="w-full h-full" />
          </div>
          <div className="flex flex-col gap-2 p-2">
            <Skeleton className="w-10 h-4 " />
            <div className="flex justify-end gap-2">
              <Skeleton className="w-10 h-4" />
              <Skeleton className="w-10 h-4" />
            </div>
          </div>
          <div className="flex-col gap-2">
            <Skeleton className="w-full h-5" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductsLoading;

import React from "react";
import { Skeleton } from "../ui/skeleton";

const OrdersLoading = () => {
  return (
    <div className="w-full flex flex-col gap-4">
      {Array.from({ length: 5 }).map((_, i) => (
        <div
          key={i}
          className="flex flex-col gap-4 border border-slate-300 rounded-lg p-4"
        >
          <div className="flex justify-between items-center">
            <Skeleton className="h-8 w-60" />
            <Skeleton className="h-10 w-24 rounded-full" />
          </div>
          <Skeleton className="h-8 w-60" />
          <div className="flex justify-between items-center">
            <Skeleton className="h-10 w-24" />
            <Skeleton className="h-10 w-40" />
            <Skeleton className="h-10 w-24" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
            <Skeleton className="h-16 w-full" />
            <Skeleton className="h-16 w-full" />
            <Skeleton className="h-16 w-full" />
            <Skeleton className="h-16 w-full" />
          </div>
          <div className="flex justify-between items-center">
            <Skeleton className="h-8 w-24" />
            <Skeleton className="h-10 w-20" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default OrdersLoading;

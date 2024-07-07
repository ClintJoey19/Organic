import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { statusItems } from "@/constants";

const bgColorVariants = cva("", {
  variants: {
    variant: {
      default: "bg-slate-200",
      pending: "bg-blue-200",
      shipping: "bg-orange-100",
      delivered: "bg-green-200",
      received: "bg-primary",
      reviewed: "bg-yellow-100",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

const textColorVariants = cva("font-semibold", {
  variants: {
    variant: {
      default: "text-black",
      pending: "text-blue-500",
      shipping: "text-orange-500",
      delivered: "text-primary",
      received: "text-white",
      reviewed: "text-yellow-500",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

type BgColorVariantsProps = VariantProps<typeof bgColorVariants>;
type TextColorVariantsProps = VariantProps<typeof textColorVariants>;

interface OrderStepsProps extends BgColorVariantsProps, TextColorVariantsProps {
  label: "pending" | "shipping" | "delivered" | "received";
}

const OrderSteps = ({ variant, label }: OrderStepsProps) => {
  const step = statusItems.indexOf(label);

  return (
    <div className="w-full flex justify-center items-center relative">
      <div className="w-[90%] h-2 bg-slate-200 absolute z-[-2]">
        <div
          className={`w-[${step * 33}%] h-full ${cn(
            bgColorVariants({ variant })
          )}`}
        ></div>
      </div>

      <div className="w-[90%] flex items-center justify-between">
        {Array.from({ length: 4 }).map((_, i) => (
          <div className="relative" key={i}>
            <div
              className={`${cn(
                step >= i ? bgColorVariants({ variant }) : bgColorVariants()
              )} h-10 w-10 rounded-full flex items-center justify-center`}
            >
              <span
                className={cn(
                  step >= i
                    ? textColorVariants({ variant })
                    : textColorVariants()
                )}
              >
                {i + 1}
              </span>
            </div>
            {i === step && (
              <span className="text-xs md:text-sm font-semibold capitalize absolute -bottom-6 left-[50%] -translate-x-[50%]">
                {label}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderSteps;

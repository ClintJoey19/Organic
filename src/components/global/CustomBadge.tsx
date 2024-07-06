import { Dot } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const bgColorVariants = cva(
  "py-2 pl-2 pr-4 rounded-full flex items-center gap-1",
  {
    variants: {
      variant: {
        pending: "bg-blue-200",
        shipping: "bg-orange-100",
        delivered: "bg-green-200",
        received: "bg-primary",
        reviewed: "bg-yellow-100",
      },
    },
    defaultVariants: {
      variant: "pending",
    },
  }
);

const textColorVariants = cva("text-sm font-medium capitalize", {
  variants: {
    variant: {
      pending: "text-blue-500",
      shipping: "text-orange-500",
      delivered: "text-primary",
      received: "text-white",
      reviewed: "text-yellow-500",
    },
  },
  defaultVariants: {
    variant: "pending",
  },
});

type BgColorVariantsProps = VariantProps<typeof bgColorVariants>;
type TextColorVariantProps = VariantProps<typeof textColorVariants>;

interface CustomBadgeProps
  extends BgColorVariantsProps,
    TextColorVariantProps {}

const CustomBadge = ({ variant }: CustomBadgeProps) => {
  return (
    <div className={cn(bgColorVariants({ variant }))}>
      <Dot className={`${cn(textColorVariants({ variant }))} h-5 w-5`} />
      <span className={cn(textColorVariants({ variant }))}>{variant}</span>
    </div>
  );
};

export default CustomBadge;

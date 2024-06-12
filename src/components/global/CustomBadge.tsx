import { Dot } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const bgColorVariants = cva(
  "py-2 pl-2 pr-4 rounded-full flex items-center gap-1",
  {
    variants: {
      variant: {
        pending: "bg-blue-100",
        shipping: "bg-orange-100",
        delivered: "bg-primary/15",
        received: "bg-primary",
        reviewed: "bg-yellow-100",
      },
    },
    defaultVariants: {},
  }
);

const textColorVariants = cva("", {
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
      <span
        className={`text-sm font-medium ${cn(
          textColorVariants({ variant })
        )} capitalize`}
      >
        {variant}
      </span>
    </div>
  );
};

export default CustomBadge;

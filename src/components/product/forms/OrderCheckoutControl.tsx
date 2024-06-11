"use client";
import { Button } from "@/components/ui/button";
import { createOrder } from "@/lib/actions/order.action";
import { LoaderCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

interface OrderCheckoutControlProps {
  userId: string;
  products: {
    productId: string;
    quantity: number;
  }[];
  total: number;
  payment: string;
  address: string;
  isInCart: boolean;
}

const OrderCheckoutControl = ({
  userId,
  products,
  total,
  payment,
  address,
  isInCart,
}: OrderCheckoutControlProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const onSubmit = async () => {
    try {
      setIsSubmitting(true);
      await createOrder(userId, products, total, payment, address, isInCart);

      toast.success("Checkout successful");
      router.push("/checkout/success");
    } catch (error: any) {
      console.error(error.message);
      toast.error(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const onBack = () => {
    router.back();
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
      <Button variant="outline" onClick={onBack} disabled={isSubmitting}>
        Cancel
      </Button>
      <Button
        className="max-md:order-first"
        onClick={onSubmit}
        disabled={isSubmitting}
      >
        {isSubmitting && <LoaderCircle className="w-4 h-4 mr-2 animate-spin" />}
        Checkout
      </Button>
    </div>
  );
};

export default OrderCheckoutControl;

"use client";
import { useState } from "react";
import { Checkbox } from "../ui/checkbox";
import { updateCartItem } from "@/lib/actions/cart-item.action";
import { usePathname } from "next/navigation";

interface CheckCartItemProps {
  id: string;
  isChecked: boolean;
}

const CheckCartItem = ({ id, isChecked }: CheckCartItemProps) => {
  const [checked, setChecked] = useState<boolean>(isChecked);
  const pathname = usePathname();

  const handleCheckChange = async () => {
    try {
      setChecked(!checked);

      await updateCartItem(id, "isChecked", !checked, pathname);
    } catch (error: any) {
      console.error(error.message);
    }
  };
  return <Checkbox checked={checked} onCheckedChange={handleCheckChange} />;
};

export default CheckCartItem;

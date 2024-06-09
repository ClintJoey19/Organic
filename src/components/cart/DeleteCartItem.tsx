"use client";
import { deleteCartItem } from "@/lib/actions/cart-item.action";
import { Trash } from "lucide-react";
import { usePathname } from "next/navigation";

const DeleteCartItem = ({ id }: { id: string }) => {
  const pathname = usePathname();

  const handleDelete = async () => {
    try {
      await deleteCartItem(id, pathname);
    } catch (error: any) {
      console.error(error.message);
    }
  };
  return (
    <Trash
      className="h-6 w-6 bg-destructive text-white rounded-md p-1 absolute top-1 right-1"
      onClick={handleDelete}
    />
  );
};

export default DeleteCartItem;

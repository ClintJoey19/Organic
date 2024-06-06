"use client";
import { Button } from "@/components/ui/button";
import { editProduct } from "@/lib/actions/product.action";
import { useState } from "react";
import toast from "react-hot-toast";

interface ProductActionsProps {
  id: string;
  isReady: boolean;
  isPublished: boolean;
}

const ProductActions = ({ id, isReady, isPublished }: ProductActionsProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handlePublish = async () => {
    try {
      setIsSubmitting(true);

      await editProduct(id, "isPublished", !isPublished);

      toast.success(
        `Product successfully ${isPublished ? "unpublished" : "published"}`
      );
    } catch (error: any) {
      console.error(error.message);
      toast.error(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <div className="flex items-center gap-2">
      <Button
        variant={isPublished ? "default" : "outline"}
        disabled={isSubmitting || !isReady}
        onClick={handlePublish}
      >
        {isPublished ? "Unpublish" : "Publish"}
      </Button>
    </div>
  );
};

export default ProductActions;

"use client";
import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Camera, Pencil, X } from "lucide-react";
import toast from "react-hot-toast";
import { editProduct } from "@/lib/actions/product.action";
import FileUpload from "@/components/global/FileUpload";
import Image from "next/image";

interface ProductImageFormProps {
  id: string;
  productImg: string;
}

const formSchema = z.object({
  productImg: z.string().min(1, { message: "Product Name field required" }),
});

const ProductImageForm = ({ id, productImg }: ProductImageFormProps) => {
  const [isEditing, setIsEditing] = useState(false);

  const toggleEdit = () => {
    setIsEditing((prev) => !prev);
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await editProduct(id, "productImg", values.productImg);

      toast.success("Product image updated");
      setIsEditing(false);
    } catch (error: any) {
      console.error(error.message);
      toast.error(error.message);
    }
  };

  return (
    <div className="bg-slate-200 p-4 rounded-md">
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <h3 className="text-md">Product Image</h3>
          {isEditing ? (
            <X className="h-4 w-4 cursor-pointer" onClick={toggleEdit} />
          ) : (
            <Pencil
              className="h-4 w-4 cursor-pointer hover:text-primary transition-colors"
              onClick={toggleEdit}
            />
          )}
        </div>
        {!isEditing &&
          (!productImg ? (
            <div className="h-60 flex justify-center items-center">
              <div className="flex flex-col items-center gap-y-2">
                <div className="h-10 w-10 flex justify-center items-center bg-primary/50 rounded-full">
                  <Camera className="text-primary" />
                </div>
                <p className="text-sm text-slate-500">No product image.</p>
              </div>
            </div>
          ) : (
            <div className="relative aspect-video rounded-md overflow-hidden">
              <Image
                src={`https://utfs.io/f/5c9ac917-d8d3-4bac-baea-bc797d1c5860-1jdxsq.webp`}
                alt="product-img"
                fill
              />
            </div>
          ))}
        {isEditing && (
          <FileUpload
            endpoint="productImage"
            onChange={(url) => {
              if (url) {
                onSubmit({ productImg: url });
              }
            }}
          />
        )}
      </div>
    </div>
  );
};

export default ProductImageForm;

"use client";
import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { LoaderCircle, Pencil, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import toast from "react-hot-toast";
import { editProduct } from "@/lib/actions/product.action";
import { formatPrice } from "@/lib/utils";

interface ProductPriceFormProps {
  id: string;
  price: number;
}

const formSchema = z.object({
  price: z.coerce.number(),
});

const ProductPriceForm = ({ id, price }: ProductPriceFormProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      price: price,
    },
  });

  const toggleEdit = () => {
    setIsEditing((prev) => !prev);
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setIsSubmitting(true);

      await editProduct(id, "price", Number(values.price));

      toast.success("Product price updated");
      setIsEditing(false);
    } catch (error: any) {
      console.error(error.message);
      toast.error(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-slate-200 p-4 rounded-md">
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <h3 className="text-md">Product Price</h3>
          {isEditing ? (
            <X className="h-4 w-4 cursor-pointer" onClick={toggleEdit} />
          ) : (
            <Pencil
              className="h-4 w-4 cursor-pointer hover:text-primary transition-colors"
              onClick={toggleEdit}
            />
          )}
        </div>
        {!isEditing ? (
          <div className="text-end">
            <p className={`text-slate-500 text-sm ${!price && "italic"}`}>
              {price ? formatPrice(price) : "No product price."}
            </p>
          </div>
        ) : (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem className="mb-4">
                    <FormControl>
                      <Input
                        type="number"
                        placeholder={`e.g '${formatPrice(40)}'`}
                        disabled={isSubmitting}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="text-end">
                <Button disabled={isSubmitting}>
                  {isSubmitting && (
                    <LoaderCircle className="h-4 w-4 animate-spin mr-2" />
                  )}
                  Submit
                </Button>
              </div>
            </form>
          </Form>
        )}
      </div>
    </div>
  );
};

export default ProductPriceForm;

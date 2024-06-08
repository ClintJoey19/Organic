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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import toast from "react-hot-toast";
import { editProduct } from "@/lib/actions/product.action";

interface ProductCategoryFormProps {
  id: string;
  category: string;
}

const formSchema = z.object({
  category: z.string().min(1, { message: "Product Category field required" }),
});

const ProductCategoryForm = ({ id, category }: ProductCategoryFormProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      category: category || "",
    },
  });

  const toggleEdit = () => {
    setIsEditing((prev) => !prev);
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setIsSubmitting(true);

      await editProduct(id, "category", values.category);

      toast.success("Product category updated");
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
          <h3 className="text-md">Product Category</h3>
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
            <p
              className={`text-slate-500 text-sm ${
                !category ? "italic" : "capitalize"
              }`}
            >
              {category ? category : "Category not set."}
            </p>
          </div>
        ) : (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem className="mb-4">
                    <FormControl>
                      <Select
                        {...field}
                        onValueChange={(value) =>
                          form.setValue("category", value)
                        }
                        disabled={isSubmitting}
                      >
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Categories</SelectLabel>
                            <SelectItem value="vegetables">
                              Vegetables
                            </SelectItem>
                            <SelectItem value="fruits">Fruits</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
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

export default ProductCategoryForm;

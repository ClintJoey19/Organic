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
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import toast from "react-hot-toast";
import { editProduct } from "@/lib/actions/product.action";

interface ProductTitleFormProps {
  id: string;
  name: string;
}

const formSchema = z.object({
  name: z.string().min(1, { message: "Product Name field required" }),
});

const ProductTitleForm = ({ id, name }: ProductTitleFormProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: name,
    },
  });

  const toggleEdit = () => {
    setIsEditing((prev) => !prev);
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setIsSubmitting(true);

      await editProduct(id, "name", values.name);

      toast.success("Product name updated");
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
          <h3 className="text-md">Product Name</h3>
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
            <p className={`text-slate-500 text-sm ${!name && "italic"}`}>
              {name ? name : "No product name."}
            </p>
          </div>
        ) : (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="mb-4">
                    <FormControl>
                      <Input
                        placeholder="e.g 'Apple'"
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

export default ProductTitleForm;

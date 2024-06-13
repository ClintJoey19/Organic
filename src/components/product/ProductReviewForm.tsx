"use client";
import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { LoaderCircle, Star } from "lucide-react";
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
import { Textarea } from "@/components/ui/textarea";
import toast from "react-hot-toast";
import { createReview } from "@/lib/actions/review.action";
import { useUser } from "@clerk/nextjs";

const formSchema = z.object({
  comment: z.string().min(1, { message: "Comment field must be filled out." }),
});

interface ProductReviewFormProps {
  productId: string;
  rating: number;
}

const ProductReviewForm = ({ productId, rating }: ProductReviewFormProps) => {
  const [starred, setStarred] = useState(rating || 0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      comment: "",
    },
  });

  const handleRating = (star: number) => {
    setStarred(star);
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      if (!starred || starred === 0)
        return toast.error("Kindly rate this product");

      setIsSubmitting(true);

      await createReview(
        "666025f1618f8955d4f8e44b",
        productId,
        starred,
        values.comment
      );

      toast.success("Review posted successfully");
    } catch (error: any) {
      console.error(error.message);
      toast.error(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between">
        <h3 className="font-medium">Rate this product</h3>
        <div className="flex gap-x-2">
          {Array.from([1, 2, 3, 4, 5]).map((star) => (
            <Star
              key={star}
              className={`h-5 w-5 ${
                star <= starred ? "text-primary" : "text-slate-700"
              } cursor-pointer`}
              onClick={() => handleRating(star)}
            />
          ))}
        </div>
      </div>
      <div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="comment"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Review</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="e.g 'This product was great.'"
                      disabled={isSubmitting}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="text-end mt-4">
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting && (
                  <LoaderCircle className="h-4 w-4 mr-2 animate-spin" />
                )}
                Submit
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default ProductReviewForm;

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
import { Status } from "@/components/transactions/orders/Orders";
import { updateOrder } from "@/lib/actions/order.action";
import { statusItems } from "@/constants";

const formSchema = z.object({
  status: z.string().min(1, { message: "Status must be selected" }),
});

interface OrderStatusFormProps {
  id: string;
  status: Status;
}

const OrderStatusForm = ({ id, status }: OrderStatusFormProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      status: status || "",
    },
  });

  const onToggle = () => {
    setIsEditing(!isEditing);
  };

  const onSubmit = async (value: z.infer<typeof formSchema>) => {
    try {
      setIsSubmitting(true);

      await updateOrder(id, "status", value.status);

      toast.success("Order status updated successfully");
    } catch (error: any) {
      console.error(error.message);
      toast.error(error.message);
    } finally {
      setIsEditing(false);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full bg-slate-200 rounded-md p-4 space-y-4">
      <div className="w-full flex justify-between items-center">
        <h3>Order Status</h3>
        {isEditing ? (
          <X className="h-4 w-4 cursor-pointer" onClick={onToggle} />
        ) : (
          <Pencil
            className="h-4 w-4 hover:text-primary transition cursor-pointer"
            onClick={onToggle}
          />
        )}
      </div>
      {!isEditing ? (
        <p className="text-end text-slate-500 text-sm capitalize">
          {status ? status : "Status not set"}
        </p>
      ) : (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem className="mb-4">
                  <FormControl>
                    <Select
                      {...field}
                      onValueChange={(value) => form.setValue("status", value)}
                      disabled={isSubmitting}
                    >
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select a status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Status</SelectLabel>
                          <SelectItem value="pending">Pending</SelectItem>
                          <SelectItem value="shipping">Shipping</SelectItem>
                          <SelectItem value="delivered">Delivered</SelectItem>
                          <SelectItem value="received">Received</SelectItem>
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
  );
};

export default OrderStatusForm;

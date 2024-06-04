"use client";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useUser } from "@clerk/nextjs";

const formSchema = z.object({
  firstname: z
    .string()
    .min(1, { message: "First Name field required" })
    .or(z.null()),
  lastname: z
    .string()
    .min(1, { message: "Last Name field required" })
    .or(z.null()),
  username: z.string().or(z.null()),
  email: z.string().min(1, { message: "Email field required" }).or(z.null()),
  password: z.string(),
  profileImg: z.string().or(z.null()),
  role: z.string(),
  baranggay: z.string().min(1, { message: "Baranggay field required" }),
  municipality: z.string().min(1, { message: "Municipality field required" }),
  province: z.string().min(1, { message: "Province field required" }),
  zipcode: z.string().min(1, { message: "Zip Code field required" }),
  phoneNumber: z.string().min(1, { message: "Zip Code field required" }),
});

const UserForm = () => {
  const { user } = useUser();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      role: "user",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          <FormField
            control={form.control}
            name="baranggay"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Baranggay</FormLabel>
                <FormControl>
                  <Input placeholder="Baranggay" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="municipality"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Municipality</FormLabel>
                <FormControl>
                  <Input placeholder="Municipality" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="province"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Province</FormLabel>
              <FormControl>
                <Input placeholder="Province" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="zipcode"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Zip Code</FormLabel>
              <FormControl>
                <Input type="number" placeholder="Zip Code" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phoneNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone Number</FormLabel>
              <FormControl>
                <Input type="number" placeholder="Phone Number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end">
          <Button type="submit">Submit</Button>
        </div>
      </form>
    </Form>
  );
};

export default UserForm;

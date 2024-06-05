"use client";
import { useState } from "react";
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
import toast from "react-hot-toast";
import { IUser, addUser } from "@/lib/actions/onboarding";
import { LoaderCircle } from "lucide-react";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  baranggay: z.string().min(1, { message: "Baranggay field required" }),
  municipality: z.string().min(1, { message: "Municipality field required" }),
  province: z.string().min(1, { message: "Province field required" }),
  zipcode: z.string().min(1, { message: "Zip Code field required" }),
  phoneNumber: z.string().min(1, { message: "Zip Code field required" }),
});

const UserForm = () => {
  const { user } = useUser();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      baranggay: "",
      municipality: "",
      province: "",
      zipcode: "",
      phoneNumber: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setIsSubmitting(true);
      const newUser: IUser = {
        firstname: user?.firstName ?? "",
        lastname: user?.lastName ?? "",
        username: user?.username ?? "",
        email: user?.primaryEmailAddress?.emailAddress ?? "",
        profileImg: user?.imageUrl ?? "",
        role: "user",
        baranggay: values.baranggay,
        municipality: values.municipality,
        province: values.province,
        zipcode: Number(values.zipcode),
        phoneNumber: values.phoneNumber,
      };

      const res = await addUser(newUser);
      toast.success("User added");
      router.push("/");
    } catch (error: any) {
      console.error(error.message);
      toast.error(error.message);
    } finally {
      setIsSubmitting(false);
    }
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
          <Button type="submit">
            {isSubmitting && (
              <LoaderCircle className="h-4 w-4 animate-spin mr-2" />
            )}{" "}
            Submit
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default UserForm;

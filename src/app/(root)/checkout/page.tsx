import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { formatPrice } from "@/lib/utils";
import Image from "next/image";
import React from "react";

interface SearchParams {
  searchParams: {
    productId: string;
    quantity: number;
  };
}

const page = ({ searchParams }: SearchParams) => {
  const { productId, quantity } = searchParams;

  return (
    <section className="container min-h-[86vh] pt-4">
      <h2 className="page-title mb-4">Checkout</h2>
      <div className="grid grid-cols-3 max-md:grid-cols-1 gap-4">
        <div className="md:col-span-2 border border-slate-300 p-4 rounded-md flex flex-col gap-2">
          <div className="w-full flex max-md:flex-col gap-2">
            <h3 className="font-semibold">Address</h3>
            <p className="w-full text-sm text-end">
              Zone 6, Bulawan Jr. Lupi, Camarines Sur
            </p>
          </div>
          <Separator className="my-2" />
          <div className="w-full flex flex-col gap-4">
            <h3 className="font-semibold">Product</h3>
            <div className="border border-slate-300 p-2 rounded-sm flex justify-between items-center gap-2">
              <Image
                src={`/apple.webp`}
                alt="apple"
                height={60}
                width={60}
                objectFit="cover"
              />
              <div className="flex flex-col">
                <p className="text-sm mb-2">Apple</p>
                <div className="flex max-md:flex-col justify-end gap-2">
                  <span className="text-sm">{formatPrice(40)}</span>
                  <span className="text-sm">1 kg</span>
                </div>
              </div>
            </div>
            <div className="border border-slate-300 p-2 rounded-sm flex justify-between items-center gap-2">
              <Image
                src={`/apple.webp`}
                alt="apple"
                height={60}
                width={60}
                objectFit="cover"
              />
              <div className="flex flex-col">
                <p className="text-sm mb-2">Apple</p>
                <div className="flex max-md:flex-col justify-end gap-2">
                  <span className="text-sm">{formatPrice(40)}</span>
                  <span className="text-sm">1 kg</span>
                </div>
              </div>
            </div>
            <div className="border border-slate-300 p-2 rounded-sm flex justify-between items-center gap-2">
              <Image
                src={`/apple.webp`}
                alt="apple"
                height={60}
                width={60}
                objectFit="cover"
              />
              <div className="flex flex-col">
                <p className="text-sm mb-2">Apple</p>
                <div className="flex max-md:flex-col justify-end gap-2">
                  <span className="text-sm">{formatPrice(40)}</span>
                  <span className="text-sm">1 kg</span>
                </div>
              </div>
            </div>
          </div>
          <Separator className="my-4" />
          <div className="w-full flex flex-col gap-4">
            <h3 className="font-semibold">Shipping</h3>
            <div className="border border-slate-300 p-2 rounded-sm flex justify-between items-center">
              <div className="flex gap-1">
                <Image src={"/logo.svg"} alt="logo" height={30} width={30} />
                <p className="text-lg font-medium italic">Organic Express</p>
              </div>
              <span className="text-sm">{formatPrice(50)}</span>
            </div>
          </div>
        </div>
        <div className="">
          <div className="border border-slate-300 p-4 rounded-md">
            <h3 className="font-semibold">Order Summary</h3>
            <Separator className="my-4" />
            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-center">
                <p className="font-medium text-sm">Order Total</p>
                <span className="text-sm">{formatPrice(40)}</span>
              </div>
              <div className="flex justify-between items-center">
                <p className="font-medium text-sm">Shipping Fee</p>
                <span className="text-sm">{formatPrice(50)}</span>
              </div>
              <div className="flex justify-between items-center">
                <p className="font-medium text-sm">Total Amount</p>
                <span className="text-sm">{formatPrice(90)}</span>
              </div>
            </div>
            <Separator className="my-4" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              <Button variant="outline">Cancel</Button>
              <Button className="max-md:order-first">Checkout</Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default page;

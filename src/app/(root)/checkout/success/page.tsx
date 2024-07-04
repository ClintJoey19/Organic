import { Button } from "@/components/ui/button";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export const metadata: Metadata = {
  title: "Purchased Success",
};

const page = () => {
  return (
    <section className="container p-4 flex flex-col gap-4">
      <div className="h-[60vh] w-full relative">
        <Image
          src={"/success.svg"}
          alt="Success"
          fill
          className="object-contain"
        />
      </div>
      <div className="mx-auto text-center">
        <h3 className="text-xl font-bold mb-2">Purchased Success</h3>
        <Button asChild>
          <Link href={`/transactions`}>View Transactions</Link>
        </Button>
      </div>
    </section>
  );
};

export default page;

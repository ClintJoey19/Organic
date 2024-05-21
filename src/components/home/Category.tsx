import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

interface CategoryProps {
  label: string;
  href: string;
  imageUrl: string;
}

const Category = ({ label, href, imageUrl }: CategoryProps) => {
  return (
    <div className="flex-1 flex rounded-md hover:shadow-md transition overflow-hidden relative">
      <div className="w-full h-[300px] relative">
        <Image src={imageUrl} alt={label} fill objectFit="cover" />
      </div>
      <div className="absolute top-0 left-0 h-full w-full flex flex-col gap-2 items-center justify-center bg-black/30 opacity-0 hover:opacity-100 transition">
        <h3 className="text-2xl font-semibold drop-shadow text-white">
          {label}
        </h3>
        <Button asChild>
          <Link href={href}>
            View <ArrowRight className="h-4 w-4 ml-2" />
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default Category;

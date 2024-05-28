import { products } from "@/constants";
import React from "react";
import Product from "../global/Product";
import SeeMoreButton from "../global/SeeMoreButton";
import { Button } from "../ui/button";
import Link from "next/link";

const FeaturedProducts = () => {
  return (
    <section className="container">
      <div className="flex flex-col gap-1 my-4">
        <h2 className="page-title text-center">Featured Products</h2>
        <p className="text-center">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo,
          praesentium?
        </p>
      </div>
      <div className="grid grid-cols-5 max-lg:grid-cols-4 max-md:grid-cols-3 max-sm:grid-cols-2 max-xs:grid-cols-1 gap-2">
        {products.map(
          ({
            id,
            name,
            category,
            price,
            quantity,
            quality,
            imageUrl,
            ratings,
          }) => (
            <Product
              key={id}
              id={id}
              name={name}
              category={category}
              price={price}
              quantity={quantity}
              quality={quality}
              imageUrl={imageUrl}
              ratings={ratings}
            />
          )
        )}
      </div>
      <div className="mt-4 flex justify-center">
        <Button asChild>
          <Link href={"/products"}>See More</Link>
        </Button>
      </div>
    </section>
  );
};

export default FeaturedProducts;

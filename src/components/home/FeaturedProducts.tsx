import React from "react";
import Product from "../global/Product";
import { Button } from "../ui/button";
import Link from "next/link";
import { getProducts } from "@/lib/actions/product.action";
import { ProductClient } from "@/app/(root)/products/page";

const FeaturedProducts = async () => {
  const products = await getProducts({ isPublished: true });
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
        {products.map((product: ProductClient) => (
          <Product
            key={product._id}
            id={product._id}
            name={product.name}
            category={product.category}
            price={product.price}
            stocks={product.stocks}
            productImg={product.productImg}
            ratings={product.ratings}
          />
        ))}
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

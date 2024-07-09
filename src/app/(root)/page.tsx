import Categories from "@/components/home/Categories";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import FeaturedRatings from "@/components/home/FeaturedRatings";
import Hero from "@/components/home/Hero";
import ProductsLoading from "@/components/loading-states/ProductsLoading";
import { Suspense } from "react";

export default function Home() {
  return (
    <div>
      <Hero />
      <Categories />
      <Suspense fallback={<ProductsLoading />}>
        <FeaturedProducts />
      </Suspense>
      {/* <FeaturedRatings /> */}
    </div>
  );
}

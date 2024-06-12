import Categories from "@/components/home/Categories";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import FeaturedRatings from "@/components/home/FeaturedRatings";
import Hero from "@/components/home/Hero";

export default function Home() {
  return (
    <div>
      <Hero />
      <Categories />
      <FeaturedProducts />
      {/* <FeaturedRatings /> */}
    </div>
  );
}

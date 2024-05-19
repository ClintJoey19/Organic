import Categories from "@/components/home/Categories";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import FeaturedStores from "@/components/home/FeaturedStores";
import Hero from "@/components/home/Hero";

export default function Home() {
  return (
    <div>
      <Hero />
      <Categories />
      <FeaturedProducts />
      <FeaturedStores />
    </div>
  );
}

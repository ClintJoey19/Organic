import Categories from "@/components/home/Categories";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import FeaturedRatings from "@/components/home/FeaturedRatings";
import Hero from "@/components/home/Hero";
import { connectToDB } from "@/lib/mongoose";

export default async function Home() {
  await connectToDB();
  return (
    <div>
      <Hero />
      <Categories />
      <FeaturedProducts />
      <FeaturedRatings />
    </div>
  );
}

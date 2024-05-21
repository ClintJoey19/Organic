import Link from "next/link";
import { Button } from "../ui/button";
import Image from "next/image";

const Hero = () => {
  return (
    <section className="h-[80vh] container grid grid-cols-1 md:grid-cols-2 gap-2">
      <div className="h-full flex flex-col justify-center gap-y-4 md:p-4">
        <p className="text-primary">Organic 100% Genuine Product Served</p>
        <h1 className="text-6xl max-md:text-4xl font-bold">
          Organic & <span className="text-primary">Healthy Food</span> Everyday
        </h1>
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Minus
          reiciendis est temporibus at in harum cupiditate modi, earum omnis ut?
        </p>
        <div className="mt-4 flex gap-2">
          <Button asChild>
            <Link href="/products">Shop Now</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/contact">Contact Us</Link>
          </Button>
        </div>
      </div>
      <div className="relative max-md:max-h-[250px] min-h-[150px] overflow-hidden rounded-b-xl max-md:rounded-t-xl">
        <Image src="/hero.jpg" alt="hero" fill objectFit="cover" />
      </div>
    </section>
  );
};

export default Hero;

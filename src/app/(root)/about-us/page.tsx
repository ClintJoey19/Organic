import Image from "next/image";
import React from "react";

const page = () => {
  return (
    <section className="container pt-4">
      <h1 className="page-title mb-4">About Us</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h3 className="font-medium text-lg">
            We Provide Fresh Foods for you
          </h3>
          <p>
            <span className="text-primary font-semibold">Organic</span> was born
            from a passion for nourishing our bodies with the purest, most
            delicious ingredients that nature has to offer. We believe in the
            power of organic, sustainable food to fuel a vibrant life and a
            healthy planet.
          </p>
        </div>
        <div className="relative h-[400px] overflow-hidden rounded-xl">
          <Image
            src={"/about.jpg"}
            alt="food-delivery"
            fill
            objectFit="cover"
          />
        </div>
      </div>
    </section>
  );
};

export default page;

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
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti
            blanditiis rerum, accusamus quo mollitia sunt nihil, qui enim
            laborum nam ad odio, eius quod reprehenderit ut minus. Veritatis
            consequuntur fugiat, in libero optio explicabo. Tenetur impedit illo
            rem quis earum aperiam possimus reprehenderit itaque iusto rerum
            nesciunt maiores sint, quas dicta dolores? Quidem reiciendis tenetur
            quaerat repellat, maxime quasi. Nobis asperiores suscipit fugit
            ducimus molestias tempora accusantium, ipsa repudiandae eum!
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

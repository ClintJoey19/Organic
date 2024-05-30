import ContactForm from "@/components/contact/ContactForm";
import Image from "next/image";
import React from "react";

const page = () => {
  return (
    <section className="container pt-4">
      <h1 className="page-title mb-4">Contact us</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="relative h-[500px] overflow-hidden rounded-xl">
          <Image src={"/contact.jpg"} alt="contact" fill objectFit="cover" />
        </div>
        <div className="">
          <ContactForm />
        </div>
      </div>
    </section>
  );
};

export default page;

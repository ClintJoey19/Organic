import Image from "next/image";
import React from "react";
import Navlinks from "./Navlinks";

const Footer = () => {
  return (
    <footer className="bg-emerald-900 text-white py-4">
      <section className="container grid md:grid-cols-3 sm:grid-cols-2 gap-4 mt-4">
        <div className="flex flex-col gap-y-2">
          <div className="flex gap-x-1 items-center">
            <Image src="/logo.svg" alt="logo" width={35} height={35} />
            <p className="text-xl font-semibold">Organic</p>
          </div>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit.
            Dignissimos, laboriosam.
          </p>
        </div>
        <div>
          <Navlinks direction="vertical" />
        </div>
        <div className="flex flex-col gap-y-2">
          <p>
            Copyrights &copy; {new Date().getFullYear()}. All rights reserved.
          </p>
          <a
            href="mailto:llosalaclintjoey@gmail.com"
            className="hover:underline transition"
          >
            llosalaclintjoey@gmail.com
          </a>
        </div>
      </section>
    </footer>
  );
};

export default Footer;

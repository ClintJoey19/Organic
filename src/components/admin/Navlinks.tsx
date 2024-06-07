"use client";
import { adminLinks } from "@/constants";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Navlinks = () => {
  const pathname = usePathname();
  return (
    <div className="flex flex-col gap-2">
      {adminLinks.map((link) => {
        const isActive =
          (pathname.includes(link.href) && link.href.length > 6) ||
          pathname === link.href;
        return (
          <Link
            key={link.label}
            href={link.href}
            className={`w-full flex justify-start py-2 px-4 ${
              isActive && "bg-primary/25 text-primary"
            } rounded-md`}
          >
            <link.iconLabel className="mr-2" />
            {link.label}
          </Link>
        );
      })}
    </div>
  );
};

export default Navlinks;

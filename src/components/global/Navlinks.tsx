"use client";

import { navlinks } from "@/constants";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavlinksProps {
  direction: "horizontal" | "vertical";
}

const Navlinks = ({ direction }: NavlinksProps) => {
  const pathname = usePathname();

  return (
    <ul
      className={`flex ${
        direction === "horizontal" ? "items-center gap-6" : "flex-col gap-y-4"
      }`}
    >
      {navlinks.map(({ label, href }) => {
        const isActive =
          (pathname.includes(href) && href.length > 1) || pathname === href;
        return (
          <li key={label}>
            <Link
              href={href}
              className={`text-sm font-medium ${isActive && "text-primary"} ${
                direction === "horizontal"
                  ? "hover:text-primary"
                  : "hover:underline"
              } transition`}
            >
              {label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default Navlinks;

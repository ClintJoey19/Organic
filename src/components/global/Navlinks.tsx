"use client";

import { navlinks } from "@/constants";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Navlinks = () => {
  const pathname = usePathname();

  return (
    <ul className="flex items-center gap-x-6">
      {navlinks.map(({ label, href }) => {
        const isActive =
          (pathname.includes(href) && href.length > 1) || pathname === href;
        return (
          <li key={label}>
            <Link
              href={href}
              className={`text-sm font-medium ${isActive && "text-primary"}`}
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

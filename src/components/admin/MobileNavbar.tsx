"use client";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { adminLinks } from "@/constants";
import Link from "next/link";
import { usePathname } from "next/navigation";

const MobileNavbar = () => {
  const pathname = usePathname();
  return (
    <div className="md:hidden">
      <Sheet>
        <SheetTrigger asChild>
          <Button size="icon" variant="ghost">
            <Menu className="w-5 h-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <div className="mt-10 flex flex-col gap-y-2">
            {adminLinks.map(({ label, href }) => {
              const isActive =
                (pathname.includes(href) && href.length > 1) ||
                pathname === href;
              return (
                <SheetClose key={label} asChild>
                  <Link
                    href={href}
                    className={`font-medium ${isActive && "text-primary"}`}
                  >
                    {label}
                  </Link>
                </SheetClose>
              );
            })}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobileNavbar;

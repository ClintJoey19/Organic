"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ClipboardList } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Transactions = () => {
  const pathname = usePathname();
  const isActive = pathname === "/transactions";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        asChild
        className={`hover:text-primary ${
          isActive && "text-primary"
        } cursor-pointer transition`}
      >
        <ClipboardList className="w-6 h-6" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Transactions</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href={"/transactions?page=orders"}>Orders</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href={"/transactions?page=completed"}>Completed Orders</Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Transactions;

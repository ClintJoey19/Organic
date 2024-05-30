"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Button } from "../ui/button";

interface TabProps {
  name: string;
  page: string;
}

const Tab = ({ name, page }: TabProps) => {
  const searchParams = useSearchParams();
  const currentPage = searchParams.get("page") || "orders";
  const isActive = currentPage === page;

  return (
    <Button variant={isActive ? "default" : "outline"} asChild>
      <Link href={`/transactions?page=${page}`}>{name}</Link>
    </Button>
  );
};

export default Tab;

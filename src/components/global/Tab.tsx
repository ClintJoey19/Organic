import Link from "next/link";
import { Button } from "../ui/button";

interface TabProps {
  name: string;
  page: string;
  currentPage: string;
}

const Tab = ({ name, page, currentPage }: TabProps) => {
  const isActive = currentPage === page;
  return (
    <Button variant={isActive ? "default" : "outline"} asChild>
      <Link href={`/transactions?page=${page}`}>{name}</Link>
    </Button>
  );
};

export default Tab;

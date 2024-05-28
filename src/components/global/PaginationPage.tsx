import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";

const PaginationPage = ({ currentPage }: { currentPage: number }) => {
  return (
    <div className="flex justify-between gap-x-4 items-center mt-4">
      {Number.isNaN(currentPage) || currentPage <= 1 ? (
        <Button variant="outline" disabled>
          <ArrowLeft className="h-4 w-4 mr-2" /> Prev
        </Button>
      ) : (
        <Button variant="outline" asChild>
          <Link href={`/products?page=${!currentPage ? 1 : currentPage - 1}`}>
            <ArrowLeft className="h-4 w-4 mr-2" /> Prev
          </Link>
        </Button>
      )}
      <Button variant="outline" asChild>
        <Link href={`/products?page=${!currentPage ? 2 : currentPage + 1}`}>
          Next <ArrowRight className="h-4 w-4 ml-2" />
        </Link>
      </Button>
    </div>
  );
};

export default PaginationPage;

"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { Button } from "../ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";

const PaginationPage = () => {
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;

  const router = useRouter();

  const createQueryString = useCallback(
    (name: string, value: number) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value.toString());

      return params.toString();
    },
    [searchParams]
  );

  const pageNavigate = (value: number) => {
    const query = createQueryString("page", value);
    router.push(`/products?${query}`);
  };

  return (
    <div className="flex justify-between gap-x-4 items-center mt-4">
      {Number.isNaN(currentPage) || currentPage <= 1 ? (
        <Button variant="outline" disabled>
          <ArrowLeft className="h-4 w-4 mr-2" /> Prev
        </Button>
      ) : (
        <Button variant="outline" onClick={() => pageNavigate(currentPage - 1)}>
          <ArrowLeft className="h-4 w-4 mr-2" /> Prev
        </Button>
      )}
      <Button variant="outline" onClick={() => pageNavigate(currentPage + 1)}>
        Next <ArrowRight className="h-4 w-4 ml-2" />
      </Button>
    </div>
  );
};

export default PaginationPage;

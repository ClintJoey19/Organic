"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

interface SelectFilterProps {
  label: string;
  items: {
    label: string;
    value: string;
  }[];
  filter?: string;
}

interface SearchQuery {
  name: string;
  value: string;
}

const SelectFilter = ({ label, items, filter }: SelectFilterProps) => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const createQueryString = useCallback(
    (queries: SearchQuery[]) => {
      const params = new URLSearchParams(searchParams.toString());

      for (const query of queries) {
        params.set(query.name, query.value);
      }

      params.set("page", "1");

      return params.toString();
    },
    [searchParams]
  );

  const filterProducts = (value: string) => {
    let query = "";

    if (label === "sort") {
      const params = value.split("-");
      query = createQueryString([
        {
          name: label,
          value: params[0],
        },
        { name: "dir", value: params[1] },
      ]);
    } else {
      query = createQueryString([
        {
          name: label,
          value,
        },
      ]);
    }

    router.push(`/products?${query}`);
  };

  return (
    <Select value={filter} onValueChange={(value) => filterProducts(value)}>
      <SelectTrigger className="w-[180px] capitalize">
        <SelectValue placeholder={label} />
      </SelectTrigger>
      <SelectContent>
        {items.map(({ label, value }) => (
          <SelectItem key={label} value={value}>
            {label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default SelectFilter;

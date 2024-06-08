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

const SelectFilter = ({ label, items, filter }: SelectFilterProps) => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  const filterProducts = (value: string) => {
    const query = createQueryString(label, value);
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

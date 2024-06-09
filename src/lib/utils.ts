import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const parseJSON = (json: any) => {
  return JSON.parse(JSON.stringify(json));
};

export const setSortQuery = (query: {}, key: string, value: string) => {
  const sortDirection = value === "asc" ? 1 : -1;
  return { ...query, [key]: sortDirection };
};

export const formatPrice = (price: number | null) => {
  return (
    price &&
    price?.toLocaleString("en-US", { style: "currency", currency: "PHP" })
  );
};

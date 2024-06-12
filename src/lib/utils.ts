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

export const getDaysOfMonth = (year: number, month: number, day: number) => {
  return new Date(year, month, day).getDate();
};

export const calculateArrivalDate = (currentDate: Date) => {
  let arrivalDay = currentDate.getDate() + 3;
  let arrivalMonth = currentDate.getMonth();
  let arrivalYear = currentDate.getFullYear();

  while (arrivalDay > getDaysOfMonth(arrivalYear, arrivalMonth - 1, 0)) {
    arrivalMonth++;
    arrivalDay -= getDaysOfMonth(arrivalYear, arrivalMonth - 1, 0);
    if (arrivalMonth > 12) {
      arrivalYear++;
      arrivalMonth = 1;
    }
  }

  return {
    month: arrivalMonth,
    day: arrivalDay,
    year: arrivalYear,
  };
};

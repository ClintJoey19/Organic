import { currentUser } from "@clerk/nextjs/server";
import { type ClassValue, clsx } from "clsx";
import { redirect } from "next/navigation";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const isAdmin = async () => {
  const user = await currentUser();

  if (user?.publicMetadata.role !== "admin") redirect("/");
};

export const parseJSON = (json: any) => {
  return JSON.parse(JSON.stringify(json));
};

export const setSortQuery = (query: {}, key: string, dir: string) => {
  const sortDirection = dir === "asc" ? 1 : -1;
  return { ...query, [key]: sortDirection };
};

export const formatPrice = (price: number | null) => {
  return (
    price &&
    price?.toLocaleString("en-US", { style: "currency", currency: "PHP" })
  );
};

export const formatRating = (ratings: number) => {
  return !ratings ? 0 : ratings.toFixed(1);
};

export const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "June",
  "July",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export const formatDate = (dateString: string) => {
  const date = new Date(dateString);

  const month = date.getMonth() + 1;
  const day = date.getDate();
  const year = date.getFullYear();

  return `${month}/${day}/${year}`;
};

export const formatDate2 = (day: number, month: number, year: number) => {
  const dayFormat = String(day).padStart(2, "0");
  const monthFormat = String(month).padStart(2, "0");

  return `${dayFormat}/${monthFormat}/${year}`;
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

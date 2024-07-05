import { getUsers } from "@/lib/actions/user.action";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Admin | Users",
};

interface SearchParams {
  searchParams: {
    page: number;
  };
}

const page = async ({ searchParams }: SearchParams) => {
  const currentPage = Number(searchParams.page) || 1;
  const users = await getUsers(currentPage);

  return (
    <section className="p-4 w-full">
      <h2 className="page-title">Users</h2>
      <span>{users?.data.toString()}</span>
    </section>
  );
};

export default page;

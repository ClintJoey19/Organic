import UsersTable, { IUsersAdmin } from "@/components/admin/users/UsersTable";
import { getUsers, IUser } from "@/lib/actions/user.action";
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

interface IUsers {
  data: IUsersAdmin[];
  hasNextPage: boolean;
}

const page = async ({ searchParams }: SearchParams) => {
  const currentPage = Number(searchParams.page) || 1;
  const users: IUsers | undefined = await getUsers(currentPage);

  return (
    <section className="p-4 w-full">
      <h2 className="page-title">Users</h2>
      <div className="w-full">
        <UsersTable
          rows={users?.data || []}
          page={currentPage}
          hasNextPage={users?.hasNextPage || false}
        />
      </div>
    </section>
  );
};

export default page;

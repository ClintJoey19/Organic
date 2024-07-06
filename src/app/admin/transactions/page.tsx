import TransactionsTable from "@/components/admin/transactions/TransactionsTable";
import { getOrders } from "@/lib/actions/order.action";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Admin | Transactions",
};

interface SearchParams {
  searchParams: {
    page: number;
  };
}

export type Order = {
  _id: string;
  userId: string;
  status: string;
  total: number;
  payment: string;
  address: string;
  arrival: {
    day: number;
    month: number;
    year: number;
  };
  createdAt: string;
  updatedAt: string;
};

export interface Orders {
  data: Order[];
  hasNextPage: boolean;
}

const page = async ({ searchParams }: SearchParams) => {
  const currentPage = Number(searchParams.page) || 1;
  const orders: Orders | undefined = await getOrders(currentPage);

  return (
    <section className="w-full p-4">
      <h2 className="page-title">Transactions</h2>
      <div className="w-full">
        <TransactionsTable
          rows={orders?.data || []}
          page={currentPage}
          hasNextPage={orders?.hasNextPage || false}
        />
      </div>
    </section>
  );
};

export default page;

import Tab from "@/components/global/Tab";
import OrdersLoading from "@/components/loading-states/OrdersLoading";
import CompletedOrders from "@/components/transactions/completed/CompletedOrders";
import Orders from "@/components/transactions/orders/Orders";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Transactions",
};

interface SearchParams {
  searchParams: {
    page: string;
  };
}

const page = ({ searchParams }: SearchParams) => {
  const currentPage = searchParams.page || "orders";

  return (
    <section className="container min-h-[88vh] pt-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="page-title">Transactions</h2>
        <div className="flex gap-x-2">
          <Tab name="Orders" page="orders" currentPage={currentPage} />
          <Tab name="Completed" page="completed" currentPage={currentPage} />
        </div>
      </div>
      <div>
        {currentPage === "orders" && (
          <Suspense fallback={<OrdersLoading />}>
            <Orders />
          </Suspense>
        )}
        {currentPage === "completed" && (
          <Suspense fallback={<OrdersLoading />}>
            <CompletedOrders />
          </Suspense>
        )}
      </div>
    </section>
  );
};

export default page;

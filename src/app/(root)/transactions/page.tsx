import Tab from "@/components/global/Tab";
import CompletedOrders from "@/components/transactions/completed/CompletedOrders";
import Orders from "@/components/transactions/orders/Orders";
import { auth } from "@clerk/nextjs/server";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Transactions",
};

interface SearchParams {
  searchParams: {
    page: string;
  };
}

const page = async ({ searchParams }: SearchParams) => {
  const { userId } = await auth();

  if (!userId) redirect("/");

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
        {currentPage === "orders" && <Orders userId={userId} />}
        {currentPage === "completed" && <CompletedOrders userId={userId} />}
      </div>
    </section>
  );
};

export default page;

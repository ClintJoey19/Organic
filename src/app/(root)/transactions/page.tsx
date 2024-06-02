import Tab from "@/components/global/Tab";
import CompletedOrders from "@/components/transactions/completed/CompletedOrders";
import Orders from "@/components/transactions/orders/Orders";

interface SearchParams {
  searchParams: {
    page: string;
  };
}

const page = ({ searchParams }: SearchParams) => {
  const currentPage = searchParams.page || "orders";

  return (
    <section className="container min-h-[88vh] pt-4">
      <h2 className="page-title mb-4">Transactions</h2>
      <div className="flex justify-end gap-x-2 mb-4">
        <Tab name="Orders" page="orders" currentPage={currentPage} />
        <Tab name="Completed" page="completed" currentPage={currentPage} />
      </div>
      <div>{currentPage === "orders" ? <Orders /> : <CompletedOrders />}</div>
    </section>
  );
};

export default page;

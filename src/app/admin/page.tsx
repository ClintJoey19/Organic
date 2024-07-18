import CardAnalytics from "@/components/admin/CardAnalytics";
import { isAdmin } from "@/lib/utils";
import { Apple, ClipboardList, DollarSign, Users } from "lucide-react";
import { getUsersCount } from "@/lib/actions/user.action";
import { getProductsCount } from "@/lib/actions/product.action";
import { getOrdersCount, getTotalSales } from "@/lib/actions/order.action";
import MonthlySales from "@/components/admin/MonthlySales";

const page = async () => {
  await isAdmin();

  return (
    <section className="p-4 w-full">
      <h2 className="page-title mb-4">Dashboard</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        <CardAnalytics
          label="Total Products"
          getValue={getProductsCount}
          iconLabel={<Apple className="h-7 xl:h-10 w-7 xl:w-10 text-primary" />}
        />
        <CardAnalytics
          label="Total Sales"
          getValue={getTotalSales}
          isMoney={true}
          iconLabel={
            <DollarSign className="h-7 xl:h-10 w-7 xl:w-10 text-primary" />
          }
        />
        <CardAnalytics
          label="Total Customers"
          getValue={getUsersCount}
          iconLabel={<Users className="h-7 xl:h-10 w-7 xl:w-10 text-primary" />}
        />
        <CardAnalytics
          label="Total Orders"
          getValue={getOrdersCount}
          iconLabel={
            <ClipboardList className="h-7 xl:h-10 w-7 xl:w-10 text-primary" />
          }
        />
      </div>
      <MonthlySales />
    </section>
  );
};

export default page;

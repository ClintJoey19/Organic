import React from "react";
import LineChartDemo from "../charts/LineChartDemo";
import { getDailyMonthSales } from "@/lib/actions/order.action";

const MonthlySales = async () => {
  const date = new Date();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const sales = await getDailyMonthSales(month, year);
  console.log(sales);

  return (
    <div className="w-full">
      <LineChartDemo date={date} />
    </div>
  );
};

export default MonthlySales;

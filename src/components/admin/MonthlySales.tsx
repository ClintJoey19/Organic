import React from "react";
import { ProductsSoldChart } from "../charts/ProductsSoldChart";
import { getHighestSoldProducts } from "@/lib/actions/product.action";
import { Product } from "./products/ProductsTable";

const MonthlySales = async () => {
  const products: Product[] = await getHighestSoldProducts(5);
  const date = new Date();
  const month = date.getMonth();
  const year = date.getFullYear();

  return (
    <div className="w-full">
      <ProductsSoldChart data={products} month={month} year={year} />
    </div>
  );
};

export default MonthlySales;

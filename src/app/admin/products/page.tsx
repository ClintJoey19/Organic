import AddProduct from "@/components/admin/products/AddProduct";
import { ProductsTable } from "@/components/admin/products/ProductsTable";
import React from "react";

const page = () => {
  return (
    <section className="w-full p-4 flex flex-col">
      <div className="flex justify-between items-center">
        <h2 className="page-title">Products</h2>
        <AddProduct />
      </div>
      <div className="w-full">
        <ProductsTable />
      </div>
    </section>
  );
};

export default page;

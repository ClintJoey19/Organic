import Tab from "@/components/global/Tab";
import React from "react";

const page = () => {
  return (
    <section className="container pt-4">
      <h2 className="page-title mb-4">Transactions</h2>
      <div className="flex justify-end gap-x-2 mb-4">
        <Tab name="Orders" page="orders" />
        <Tab name="Completed" page="completed" />
      </div>
      <div>Render the page here</div>
    </section>
  );
};

export default page;

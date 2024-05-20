import React from "react";

const Categories = () => {
  return (
    <section className="container mt-4">
      <h2 className="page-title text-center">Categories</h2>
      <div className="flex max-sm:flex-col gap-2">
        <div className="flex-1">Vegetables</div>
        <div className="flex-1">Fruits</div>
      </div>
    </section>
  );
};

export default Categories;

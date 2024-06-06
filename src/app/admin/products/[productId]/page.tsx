import React from "react";

interface ProductProps {
  params: {
    productId: string;
  };
}

const page = ({ params }: ProductProps) => {
  return (
    <section className="p-4">
      <h2 className="page-title">Product {params.productId}</h2>
      <div className=""></div>
    </section>
  );
};

export default page;

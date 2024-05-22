import React from "react";

interface ProductPageProps {
  params: {
    productId: string;
  };
}

const page = ({ params }: ProductPageProps) => {
  return <div>page {params.productId}</div>;
};

export default page;

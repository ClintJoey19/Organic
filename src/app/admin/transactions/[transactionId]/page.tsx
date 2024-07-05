import React from "react";

const page = ({
  params,
}: {
  params: {
    transactionId: string;
  };
}) => {
  return <div>page {params.transactionId}</div>;
};

export default page;

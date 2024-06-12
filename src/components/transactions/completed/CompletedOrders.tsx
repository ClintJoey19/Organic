import { getUserOrders } from "@/lib/actions/order.action";
import React from "react";
import Order from "../orders/Order";
import { IOrder } from "../orders/Orders";

const CompletedOrders = async () => {
  const completedOrders: IOrder[] = await getUserOrders(
    "666025f1618f8955d4f8e44b",
    true
  );

  return (
    <div className="flex flex-col gap-4">
      {completedOrders.map((order) => (
        <Order
          key={order._id}
          id={order._id}
          userId={order.userId}
          status={order.status}
          total={order.total}
          payment={order.payment}
          address={order.address}
          arrival={order.arrival}
        />
      ))}
    </div>
  );
};

export default CompletedOrders;

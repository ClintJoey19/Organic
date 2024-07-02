import { getUserOrders } from "@/lib/actions/order.action";
import Order from "./Order";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export type Status =
  | "pending"
  | "shipping"
  | "delivered"
  | "received"
  | "reviewed";

export type PaymentMethod = "cod" | "card";

export interface IOrder {
  _id: string;
  userId: string;
  status: Status;
  total: number;
  payment: PaymentMethod;
  address: string;
  arrival: {
    month: number;
    day: number;
    year: number;
  };
}

const Orders = async ({ userId }: { userId: string }) => {
  const orders: IOrder[] = await getUserOrders(userId, false);

  return (
    <div className="flex flex-col gap-4">
      {orders?.map((order) => (
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

export default Orders;

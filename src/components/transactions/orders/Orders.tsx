import { getUserOrders } from "@/lib/actions/order.action";
import Order from "./Order";

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

const Orders = async () => {
  const orders: IOrder[] = await getUserOrders(
    "666025f1618f8955d4f8e44b",
    false
  );

  return (
    <div className="flex flex-col gap-4">
      {orders.map((order) => (
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

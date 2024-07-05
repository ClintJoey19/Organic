import { getUserOrders } from "@/lib/actions/order.action";
import Order from "../orders/Order";
import { IOrder } from "../orders/Orders";

const CompletedOrders = async ({ userId }: { userId: string }) => {
  const completedOrders: IOrder[] = await getUserOrders(userId, true);

  return (
    <div className="flex flex-col gap-4">
      {completedOrders?.map((order) => (
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

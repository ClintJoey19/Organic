import SectionHeader from "@/components/admin/SectionHeader";
import UserInfo from "@/components/admin/transactions/[transactionId]/UserInfo";
import OrderSteps from "@/components/global/OrderSteps";
import { IOrder } from "@/components/transactions/orders/Orders";
import { getOrder } from "@/lib/actions/order.action";
import { formatDate2, formatPrice } from "@/lib/utils";
import { ScrollText, Truck, UserRound } from "lucide-react";
import React from "react";
import OrderStatusForm from "./forms/OrderStatusForm";
import { paymentMode } from "@/constants";
import Image from "next/image";

interface AdminOrder extends IOrder {
  createdAt: string;
  updatedAt: string;
}

const page = async ({
  params,
}: {
  params: {
    transactionId: string;
  };
}) => {
  const id = params.transactionId;
  const transaction: AdminOrder = await getOrder(id);
  const { day, month, year } = transaction.arrival;

  return (
    <section className="w-full flex flex-col gap-4 p-4">
      <h2 className="page-title truncate">
        Order <span className="text-slate-500">#{transaction._id}</span>
      </h2>
      <OrderSteps variant={transaction.status} label={transaction.status} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        <div className="flex flex-col gap-4">
          <SectionHeader label="User Information" iconLabel={<UserRound />} />
          <div className="bg-slate-200 rounded-md p-4">
            <UserInfo userId={transaction.userId} />
          </div>
          <SectionHeader label="Order Details" iconLabel={<ScrollText />} />
          <OrderStatusForm id={id} status={transaction.status} />
          <div className="bg-slate-200 rounded-md p-4">
            <h3>Delivery Arrival</h3>
            <p className="text-end text-slate-500 text-sm">
              {formatDate2(day, month, year)}
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <SectionHeader label="Delivery Shipment" iconLabel={<Truck />} />
          <div className="bg-slate-200 rounded-md p-4">
            <h3>Shipping Courier</h3>
            <div className="flex justify-end gap-1">
              <Image src={"/logo.svg"} alt="logo" height={30} width={30} />
              <p className="text-lg font-medium italic">Organic Express</p>
            </div>
          </div>
          <SectionHeader label="Payment Summary" iconLabel={<ScrollText />} />
          <div className="bg-slate-200 rounded-md p-4">
            <h3>Payment Method</h3>
            <p className="text-end text-slate-500 text-sm">
              {paymentMode[transaction.payment]}
            </p>
          </div>
          <div className="bg-slate-200 rounded-md p-4">
            <h3>Order Total</h3>
            <p className="text-end font-semibold text-sm">
              {formatPrice(transaction.total)}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default page;

import { getOrderItems } from "@/lib/actions/order-item.action";
import React from "react";
import OrderItem from "./OrderItems";
import CustomBadge from "@/components/global/CustomBadge";
import { PaymentMethod, Status } from "./Orders";
import { ArrowBigRight, MapPin, Truck } from "lucide-react";
import Image from "next/image";
import { formatPrice } from "@/lib/utils";
import OrderActions from "./OrderActions";

export interface OrderProps {
  id: string;
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

export type OrderItems = {
  _id: string;
  orderId: string;
  productId: string;
  quantity: number;
};

const Order = async ({
  id,
  userId,
  status,
  total,
  payment,
  address,
  arrival,
}: OrderProps) => {
  const orderItems: OrderItems[] = await getOrderItems(id);
  const date = [
    "Jan",
    "Feb",
    "Mar",
    "May",
    "June",
    "July",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const pendingStatus = ["pending", "shipping", "delivered"];
  const paymentMethod = {
    cod: "Cash on Delivery",
    card: "Card",
  };

  return (
    <div className="flex flex-col gap-4 p-4 border border-slate-300 hover:shadow-md transition rounded-lg">
      <div className="grid grid-cols-2 gap-4">
        <div className="flex items-center">
          <p className="text-md font-semibold truncate">
            Order Id <span className="text-slate-500 font-normal">#{id}</span>
          </p>
        </div>
        <div className="flex justify-end">
          <CustomBadge variant={status} />
        </div>
      </div>
      <div>
        <p>
          Payment Method:{" "}
          <span className="font-semibold">{paymentMethod[payment]}</span>
        </p>
      </div>
      <div
        className={`grid ${
          pendingStatus.includes(status) &&
          "lg:grid-cols-[300px_1fr_300px] md:grid-cols-[200px_1fr_200px]"
        } grid-cols-1 max-md:gap-2`}
      >
        <div
          className={`flex items-center gap-2 ${
            !pendingStatus.includes(status) && "hidden"
          }`}
        >
          <div className="w-10 h-10 rounded-full bg-primary/25 flex items-center justify-center">
            <Truck className="w-6 h-6 text-primary" />
          </div>
          <div className="flex items-center gap-2 border border-slate-300 p-2 rounded-md">
            <Image src={"/logo.svg"} alt="organic" height={20} width={20} />
            <p className="font-medium text-sm">Organic</p>
          </div>
        </div>
        <div
          className={`flex md:justify-center items-center ${
            !pendingStatus.includes(status) && "hidden"
          }`}
        >
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2 max-md:hidden">
              <div className="w-2 h-2 bg-primary rounded-full"></div>
              <div className="w-1 h-1 bg-slate-500 rounded-full"></div>
              <div className="w-1 h-1 bg-slate-500 rounded-full"></div>
              <div className="w-1 h-1 bg-slate-500 rounded-full"></div>
            </div>
            <div className="border border-slate-300 py-2 px-3 rounded-md">
              <p className="text-sm">
                Estimated arrival: {date[arrival.month - 1]} {arrival.day},{" "}
                {arrival.year}
              </p>
            </div>
            <div className="flex items-center gap-2 max-md:hidden">
              <div className="w-1 h-1 bg-slate-500 rounded-full"></div>
              <div className="w-1 h-1 bg-slate-500 rounded-full"></div>
              <div className="w-1 h-1 bg-slate-500 rounded-full"></div>
              <ArrowBigRight className="w-6 h-6 text-primary" />
            </div>
          </div>
        </div>
        <div
          className={`flex md:justify-end items-center gap-2 ${
            pendingStatus.includes(status) &&
            "border border-slate-300 p-2 rounded-md"
          }`}
        >
          <MapPin className="w-6 h-6 text-primary" />
          <p className="text-sm md:truncate">{address}</p>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
        {orderItems.map((item) => (
          <OrderItem
            key={item._id}
            id={item._id}
            productId={item.productId}
            quantity={item.quantity}
          />
        ))}
      </div>
      <div className="flex max-md:flex-col justify-between md:items-center gap-2">
        <div className="">
          <p className="">
            Total: <span className="font-semibold">{formatPrice(total)}</span>
          </p>
        </div>
        <div className="flex flex-col justify-end gap-2">
          <OrderActions id={id} status={status} />
        </div>
      </div>
    </div>
  );
};

export default Order;

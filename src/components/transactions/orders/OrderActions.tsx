"use client";
import { Button } from "@/components/ui/button";
import { Status } from "./Orders";
import CancelAction from "./CancelAction";
import { Pencil, PencilLine } from "lucide-react";
import { updateOrder } from "@/lib/actions/order.action";
import ReviewActions from "./ReviewActions";

interface OrderActionsProps {
  id: string;
  status: Status;
}

const OrderActions = ({ id, status }: OrderActionsProps) => {
  const pendingStatus = ["pending", "shipping"];
  const receivedStatus = ["received", "reviewed"];

  const onReceived = async () => {
    try {
      await updateOrder(id, "status", "received");
    } catch (error: any) {
      console.error(error.message);
    }
  };

  return (
    <>
      {pendingStatus.includes(status) && <CancelAction id={id} />}
      {status === "delivered" && (
        <>
          <Button size="sm" variant="outline" onClick={onReceived}>
            Mark as recieved
          </Button>
          <Button size="sm">Delivered</Button>
        </>
      )}
      {status === "received" && <ReviewActions />}
      {status === "reviewed" && (
        <Button size="sm" variant="outline">
          <Pencil className="w-4 h-4 mr-2" />
          Edit Review
        </Button>
      )}
    </>
  );
};

export default OrderActions;

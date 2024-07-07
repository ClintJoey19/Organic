"use client";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { formatDate2, formatPrice } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { deleteProduct } from "@/lib/actions/product.action";
import toast from "react-hot-toast";
import { Order } from "./page";
import { deleteOrder } from "@/lib/actions/order.action";

export const columns: ColumnDef<Order>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "_id",
    header: "Order Id",
    cell: ({ row }) => <div className="">{row.getValue("_id")}</div>,
  },
  {
    accessorKey: "userId",
    header: "User Id",
    cell: ({ row }) => <div className="">{row.getValue("userId")}</div>,
  },
  {
    accessorKey: "total",
    header: "Total",
    cell: ({ row }) => (
      <div className="">{formatPrice(row.getValue("total") || 0)}</div>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("status")}</div>
    ),
  },
  {
    accessorKey: "payment",
    header: "Payment",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("payment")}</div>
    ),
  },
  {
    accessorKey: "arrival",
    header: "Arrival",
    cell: ({ row }) => {
      const {
        day,
        month,
        year,
      }: {
        day: number;
        month: number;
        year: number;
      } = row.getValue("arrival");

      return <div>{formatDate2(month, day, year)}</div>;
    },
  },
  {
    id: "actions",
    header: "Actions",
    enableHiding: false,
    cell: ({ row }) => {
      const order = row.original;

      const onDelete = async () => {
        try {
          await deleteOrder(order._id);
          toast.success("Order deleted");
        } catch (error: any) {
          console.error(error.message);
          toast.error(error.message);
        }
      };

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem asChild>
              <Link href={`/admin/transactions/${order._id}`}>View</Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={onDelete}>Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

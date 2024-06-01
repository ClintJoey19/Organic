import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatPrice } from "@/lib/utils";
import CancelOrder from "./CancelOrder";

const OrdersTable = () => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Order ID</TableHead>
          <TableHead>Product</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Quantity</TableHead>
          <TableHead>Price</TableHead>
          <TableHead>Total</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell className="font-medium">INV001</TableCell>
          <TableCell>Apple</TableCell>
          <TableCell>Pending</TableCell>
          <TableCell>1 kg</TableCell>
          <TableCell>{formatPrice(40)}</TableCell>
          <TableCell>{formatPrice(40)}</TableCell>
          <TableCell className="text-right">
            <CancelOrder />
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};

export default OrdersTable;

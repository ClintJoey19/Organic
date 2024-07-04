import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "../ui/button";
import { categoryFilters, nameSort } from "@/constants";
import SelectFilter from "../global/SelectFilter";
import { ChevronLeft } from "lucide-react";

interface ProductsControllerProps {
  filterCategory: string;
  sortName: string;
  sortDir: string;
}

const ProductsController = ({
  filterCategory,
  sortName,
  sortDir,
}: ProductsControllerProps) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size="icon">
          <ChevronLeft className="w-4 h-4" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right">
        <SheetHeader>
          <SheetTitle>Controls</SheetTitle>
        </SheetHeader>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <p className="text-slate-500 text-sm">Filter by</p>
            <SelectFilter
              label="category"
              items={categoryFilters}
              filter={filterCategory}
            />
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-slate-500 text-sm">Sort by</p>
            <SelectFilter
              label="sort"
              items={nameSort}
              filter={sortName && sortDir && `${sortName}-${sortDir}`}
            />
          </div>
        </div>
        <SheetFooter></SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default ProductsController;

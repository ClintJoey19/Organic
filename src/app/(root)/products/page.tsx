import SelectFilter from "@/components/global/SelectFilter";
import ProductsLoading from "@/components/loading-states/ProductsLoading";
import Products from "@/components/products/Products";
import ProductsController from "@/components/products/ProductsController";
import { categoryFilters, nameSort } from "@/constants";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Products",
};

interface SearchParams {
  searchParams: {
    page: number;
    category: string;
    sort: string;
    dir: string;
  };
}

export interface ProductClient {
  data: {
    _id: string;
    name: string;
    description: string;
    category: string;
    price: number;
    stocks: number;
    ratings: number;
    sold: number;
    productImg: string;
  }[];
  hasNextPage: boolean;
}

const page = ({ searchParams }: SearchParams) => {
  const currentPage = Number(searchParams.page) || 1;
  const filterCategory = searchParams.category || "";
  const sortName = searchParams.sort || "";
  const sortDir = searchParams.dir || "";

  return (
    <section className="flex relative">
      <div className="md:hidden fixed top-[10vh] right-1 z-10">
        <ProductsController
          filterCategory={filterCategory}
          sortName={sortName}
          sortDir={sortDir}
        />
      </div>
      <div className="w-[250px] max-md:hidden flex flex-col gap-4 p-4 border-r border-slate-200">
        <h2 className="text-lg font-semibold">Controls</h2>
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
      </div>
      <div className="w-full flex flex-col gap-4 p-4">
        <h2 className="page-title">Products</h2>
        <Suspense fallback={<ProductsLoading />}>
          <Products
            currentPage={currentPage}
            filterCategory={filterCategory}
            sortName={sortName}
            sortDir={sortDir}
          />
        </Suspense>
      </div>
    </section>
  );
};

export default page;

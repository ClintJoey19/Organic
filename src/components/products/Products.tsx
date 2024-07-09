import { ProductClient } from "@/app/(root)/products/page";
import React from "react";
import Product from "../global/Product";
import PaginationPage from "../global/PaginationPage";
import { getProducts } from "@/lib/actions/product.action";

interface ProductsProps {
  currentPage: number;
  filterCategory: string;
  sortName: string;
  sortDir: string;
}

const Products = async ({
  currentPage,
  filterCategory,
  sortName,
  sortDir,
}: ProductsProps) => {
  const { data, hasNextPage }: ProductClient = await getProducts({
    page: currentPage,
    isPublished: true,
    category: filterCategory,
    sort: sortName,
    dir: sortDir,
  });
  return (
    <>
      <div className="grid grid-cols-5 max-xl:grid-cols-4 max-lg:grid-cols-3 max-sm:grid-cols-2 max-xs:grid-cols-1 gap-4">
        {data.map((product) => (
          <Product
            key={product._id}
            id={product._id}
            name={product.name}
            category={product.category}
            price={product.price}
            stocks={product.stocks}
            productImg={product.productImg}
            ratings={product.ratings}
          />
        ))}
      </div>
      <PaginationPage hasNextPage={hasNextPage} />
    </>
  );
};

export default Products;

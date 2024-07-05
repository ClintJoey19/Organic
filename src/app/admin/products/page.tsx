import AddProduct from "@/components/admin/products/AddProduct";
import { ProductsTable } from "@/components/admin/products/ProductsTable";
import { getProducts } from "@/lib/actions/product.action";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin | Products",
};

interface SearchParams {
  searchParams: {
    page: number;
  };
}

interface ProductsAdmin {
  data: {
    _id: string;
    name: string;
    description?: string;
    category?: string;
    price?: number;
    stocks?: number;
    ratings?: number;
    sold?: number;
    productImg?: string;
    isPublished: boolean;
    createdAt: string;
    updatedAt: string;
  }[];
  hasNextPage: boolean;
}

const page = async ({ searchParams }: SearchParams) => {
  const page = Number(searchParams.page) || 1;
  const { data, hasNextPage }: ProductsAdmin = await getProducts({ page });

  return (
    <section className="w-full p-4 flex flex-col">
      <div className="flex justify-between items-center">
        <h2 className="page-title">Products</h2>
        <AddProduct />
      </div>
      <div className="w-full">
        <ProductsTable rows={data} page={page} hasNextPage={hasNextPage} />
      </div>
    </section>
  );
};

export default page;

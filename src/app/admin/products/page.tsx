import AddProduct from "@/components/admin/products/AddProduct";
import { ProductsTable } from "@/components/admin/products/ProductsTable";
import { getProducts } from "@/lib/actions/product.action";

const page = async () => {
  const products = await getProducts({});

  return (
    <section className="w-full p-4 flex flex-col">
      <div className="flex justify-between items-center">
        <h2 className="page-title">Products</h2>
        <AddProduct />
      </div>
      <div className="w-full">
        {products && <ProductsTable rows={products} />}
      </div>
    </section>
  );
};

export default page;

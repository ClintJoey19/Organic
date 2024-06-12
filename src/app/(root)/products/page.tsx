import PaginationPage from "@/components/global/PaginationPage";
import Product from "@/components/global/Product";
import SelectFilter from "@/components/global/SelectFilter";
import { categoryFilters, nameSort, priceSort } from "@/constants";
import { getProducts } from "@/lib/actions/product.action";

interface SearchParams {
  searchParams: {
    page: number;
    category: string;
    name: string;
    price: string;
  };
}

export type ProductClient = {
  _id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  stocks: number;
  ratings: number;
  sold: number;
  productImg: string;
};

const page = async ({ searchParams }: SearchParams) => {
  const currentPage = Number(searchParams.page);
  const filterCategory = searchParams.category || "";
  const filterName = searchParams.name || "";
  const filterPrice = searchParams.price || "";

  const products: ProductClient[] = await getProducts({
    page: currentPage || 1,
    isPublished: true,
    category: filterCategory,
    name: filterName,
    price: filterPrice,
  });

  return (
    <section className="container">
      <div className="flex gap-x-4 justify-between pt-4">
        <h2 className="page-title">Products</h2>
        <SelectFilter
          label="category"
          items={categoryFilters}
          filter={filterCategory}
        />
      </div>
      <div className="flex gap-x-4 justify-end my-4">
        <SelectFilter label="name" items={nameSort} filter={filterName} />
        <SelectFilter label="price" items={priceSort} filter={filterPrice} />
      </div>
      <div className="grid grid-cols-5 max-lg:grid-cols-4 max-md:grid-cols-3 max-sm:grid-cols-2 max-xs:grid-cols-1 gap-2">
        {products.map((product) => (
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
      <PaginationPage />
    </section>
  );
};

export default page;

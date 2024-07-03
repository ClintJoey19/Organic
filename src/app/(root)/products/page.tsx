import PaginationPage from "@/components/global/PaginationPage";
import Product from "@/components/global/Product";
import SelectFilter from "@/components/global/SelectFilter";
import { categoryFilters, nameSort, priceSort } from "@/constants";
import { getProducts } from "@/lib/actions/product.action";

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

const page = async ({ searchParams }: SearchParams) => {
  const currentPage = Number(searchParams.page) || 1;
  const filterCategory = searchParams.category || "";
  const sortName = searchParams.sort || "";
  const sortDir = searchParams.dir || "";

  const { data, hasNextPage }: ProductClient = await getProducts({
    page: currentPage,
    isPublished: true,
    category: filterCategory,
    sort: sortName,
    dir: sortDir,
  });

  return (
    <section className="flex">
      <div className="w-[250px] max-xl:hidden flex flex-col gap-4 p-4 border-r border-slate-200">
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
        <div className="grid grid-cols-5 max-lg:grid-cols-4 max-md:grid-cols-3 max-sm:grid-cols-2 max-xs:grid-cols-1 gap-4">
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
      </div>
    </section>
  );
};

export default page;

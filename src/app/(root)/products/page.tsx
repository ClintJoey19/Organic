import PaginationPage from "@/components/global/PaginationPage";
import Product from "@/components/global/Product";
import SelectFilter from "@/components/global/SelectFilter";
import { categoryFilters, nameSort, priceSort, products } from "@/constants";

interface SearchParams {
  searchParams: {
    page: number;
    category: string;
  };
}

const page = ({ searchParams }: SearchParams) => {
  const currentPage = Number(searchParams.page);

  return (
    <section className="container">
      <div className="flex gap-x-4 justify-between pt-4">
        <h2 className="page-title">Products</h2>
        <SelectFilter name="Category" items={categoryFilters} />
      </div>
      <div className="flex gap-x-4 justify-end my-4">
        <SelectFilter name="Name" items={nameSort} />
        <SelectFilter name="Price" items={priceSort} />
      </div>
      <div className="grid grid-cols-5 max-lg:grid-cols-4 max-md:grid-cols-3 max-sm:grid-cols-2 max-xs:grid-cols-1 gap-2">
        {products.map(
          ({
            id,
            name,
            category,
            price,
            quantity,
            quality,
            imageUrl,
            ratings,
          }) => (
            <Product
              key={id}
              id={id}
              name={name}
              category={category}
              price={price}
              quantity={quantity}
              quality={quality}
              imageUrl={imageUrl}
              ratings={ratings}
            />
          )
        )}
      </div>
      <PaginationPage currentPage={currentPage} />
    </section>
  );
};

export default page;

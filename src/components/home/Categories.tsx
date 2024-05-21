import Category from "./Category";
import { categories } from "@/constants";

const Categories = () => {
  return (
    <section className="container">
      <div className="flex flex-col gap-1 my-4">
        <h2 className="page-title text-center">Categories</h2>
        <p className="text-center">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo,
          praesentium?
        </p>
      </div>
      <div className="flex max-sm:flex-col gap-4">
        {categories.map(({ label, href, imageUrl }) => (
          <Category key={label} label={label} href={href} imageUrl={imageUrl} />
        ))}
      </div>
    </section>
  );
};

export default Categories;

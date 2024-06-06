import SectionHeader from "@/components/admin/SectionHeader";
import ProductActions from "@/components/admin/products/forms/ProductActions";
import ProductDescriptionForm from "@/components/admin/products/forms/ProductDescriptionForm";
import ProductTitleForm from "@/components/admin/products/forms/ProductTitleForm";
import { Button } from "@/components/ui/button";
import { getProduct } from "@/lib/actions/product.action";

interface ProductProps {
  params: {
    productId: string;
  };
}

const page = async ({ params }: ProductProps) => {
  const product = await getProduct(params.productId);

  const requiredFields = [
    product.name,
    product.description,
    product.price,
    product.stocks,
    product.productImg,
  ];

  const totalFields = requiredFields.length;
  const completedFields = requiredFields.filter((field) =>
    Boolean(field)
  ).length;

  return (
    <section className="w-full p-4">
      <div className="w-full mb-6">
        <div className="w-full flex justify-between items-center">
          <h2 className="page-title">{product.name}</h2>
          <ProductActions
            id={params.productId}
            isReady={completedFields === totalFields}
            isPublished={product.isPublished}
          />
        </div>
        <p>
          Completed Fields:{" "}
          <span>
            {completedFields}/{totalFields}
          </span>
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col gap-y-4">
          <div className="flex flex-col gap-y-4">
            <SectionHeader label="Product Details" />
            <ProductTitleForm id={params.productId} name={product.name} />
            <ProductDescriptionForm
              id={params.productId}
              description={product.description}
            />
          </div>
        </div>
        <div className="">haha</div>
      </div>
    </section>
  );
};

export default page;

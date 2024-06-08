import SectionHeader from "@/components/admin/SectionHeader";
import ProductActions from "@/components/admin/products/forms/ProductActions";
import ProductCategoryForm from "@/components/admin/products/forms/ProductCategoryForm";
import ProductDescriptionForm from "@/components/admin/products/forms/ProductDescriptionForm";
import ProductImageForm from "@/components/admin/products/forms/ProductImageForm";
import ProductPriceForm from "@/components/admin/products/forms/ProductPriceForm";
import ProductStocksForm from "@/components/admin/products/forms/ProductStocksForm";
import ProductTitleForm from "@/components/admin/products/forms/ProductTitleForm";
import { Button } from "@/components/ui/button";
import { getProduct } from "@/lib/actions/product.action";
import { ArrowLeft, DollarSign, Image, Sprout } from "lucide-react";
import Link from "next/link";

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
    product.category,
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
      <Button variant="outline" asChild>
        <Link href={"/admin/products"} className="flex items-center gap-2 mb-2">
          <ArrowLeft className="h-4 w-4" />
          Back
        </Link>
      </Button>
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
            <SectionHeader label="Product Details" iconLabel={<Sprout />} />
            <ProductTitleForm id={params.productId} name={product.name} />
            <ProductDescriptionForm
              id={params.productId}
              description={product.description}
            />
            <ProductCategoryForm
              id={params.productId}
              category={product.category}
            />
            <SectionHeader
              label="Stocks and Pricing"
              iconLabel={<DollarSign />}
            />
            <ProductPriceForm id={params.productId} price={product.price} />
            <ProductStocksForm id={params.productId} stocks={product.stocks} />
          </div>
        </div>
        <div className="flex flex-col gap-y-4">
          <div className="flex flex-col gap-y-4">
            <SectionHeader label="Product Image" iconLabel={<Image />} />
            <ProductImageForm
              id={params.productId}
              productImg={product.productImg}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default page;

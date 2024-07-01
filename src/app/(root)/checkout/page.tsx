import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { formatPrice } from "@/lib/utils";
import Image from "next/image";
import { CreditCard, HandCoins } from "lucide-react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { auth, currentUser } from "@clerk/nextjs/server";
import CheckoutItem from "@/components/checkout/CheckoutItem";
import { getCheckedItems } from "@/lib/actions/cart-item.action";
import OrderCheckoutControl from "@/components/product/forms/OrderCheckoutControl";
import { redirect } from "next/navigation";
import { getUser } from "@/lib/actions/user.action";
import { log } from "console";

interface SearchParams {
  searchParams: {
    productId: string;
    price: number;
    quantity: number;
    cart: string;
  };
}

const shippingFee = 50;
const paymentMethod = "cod";

const page = async ({ searchParams }: SearchParams) => {
  const { productId, price, quantity, cart } = searchParams;
  const current = await currentUser();

  if (!current) redirect("/");

  const email = current?.emailAddresses[0].emailAddress;

  const { _id, baranggay, municipality, province, zipcode, phoneNumber } =
    await getUser(email);

  const cartItems = await getCheckedItems(cart);
  const products =
    productId && price && quantity
      ? [{ productId, price, quantity }, ...cartItems]
      : [...cartItems];
  const orderTotal = products.reduce(
    (accumulator, product) => accumulator + product.price * product.quantity,
    0
  );

  const totalAmount = orderTotal + shippingFee;

  const address = `${zipcode}, ${baranggay}, ${municipality}, ${province}`;

  return (
    <section className="container min-h-[86vh] pt-4">
      <h2 className="page-title mb-4">Checkout</h2>
      <div className="grid grid-cols-3 max-md:grid-cols-1 gap-4">
        <div className="md:col-span-2 border border-slate-300 p-4 rounded-md flex flex-col gap-2">
          <div className="w-full flex max-md:flex-col gap-2">
            <h3 className="font-semibold">Address</h3>
            <p className="w-full text-sm text-end">
              4403, Zone 6, Bulawan Jr. Lupi, Camarines Sur
            </p>
          </div>
          <Separator className="my-2" />
          <div className="w-full flex flex-col gap-4">
            <h3 className="font-semibold">Products</h3>
            {products.map((product) => (
              <CheckoutItem
                key={product.productId}
                productId={product.productId}
                quantity={product.quantity}
              />
            ))}
          </div>

          <Separator className="my-4" />
          <div className="w-full flex flex-col gap-4">
            <h3 className="font-semibold">Shipping</h3>
            <div className="border border-slate-300 p-2 rounded-sm flex justify-between items-center">
              <div className="flex gap-1">
                <Image src={"/logo.svg"} alt="logo" height={30} width={30} />
                <p className="text-lg font-medium italic">Organic Express</p>
              </div>
              <span className="text-sm">{formatPrice(shippingFee)}</span>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <div className="border border-slate-300 p-4 rounded-md">
            <h3 className="font-semibold">Payment Method</h3>
            <Separator className="my-4" />
            <RadioGroup defaultValue={paymentMethod}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="cod" id="cod" />
                <Label
                  htmlFor="cod"
                  className="flex items-center gap-x-2 text-md"
                >
                  <HandCoins className="text-primary h-5 w-5" /> Cash on
                  Delivery
                </Label>
              </div>
              {/* <div className="flex items-center space-x-2">
                <RadioGroupItem value="card" id="card" />
                <Label
                  htmlFor="card"
                  className="flex items-center gap-x-2 text-md"
                >
                  <CreditCard className="h-5 w-5 text-primary" /> Credit Card
                </Label>
              </div> */}
            </RadioGroup>
          </div>
          <div className="border border-slate-300 p-4 rounded-md">
            <h3 className="font-semibold">Order Summary</h3>
            <Separator className="my-4" />
            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-center">
                <p className="font-medium text-sm">Order Total</p>
                <span className="text-sm">{formatPrice(orderTotal)}</span>
              </div>
              <div className="flex justify-between items-center">
                <p className="font-medium text-sm">Shipping Fee</p>
                <span className="text-sm">{formatPrice(shippingFee)}</span>
              </div>
              <div className="flex justify-between items-center">
                <p className="font-medium text-sm">Total Amount</p>
                <span className="text-sm">{formatPrice(totalAmount)}</span>
              </div>
            </div>
            <Separator className="my-4" />
            <OrderCheckoutControl
              userId={_id}
              products={products}
              total={totalAmount}
              payment={paymentMethod}
              address={address}
              isInCart={cart ? true : false}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default page;

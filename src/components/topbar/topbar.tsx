import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { CiChat1 } from "react-icons/ci";
import { SidebarTrigger } from "../ui/sidebar";
import { ModeToggle } from "../theme/theme-toggle";
import TopbarBreadcrumb from "./topbar-breadcrumb";
import { ShoppingBag } from "lucide-react";
import { Badge } from "../ui/badge";
import { cookies } from "next/headers";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { ItemCard } from "@/shopping-cart";
import { products, type Product } from "@/products/data/products";
import { SummaryCard } from "./widget-item";
import { ScrollArea } from "../ui/scroll-area";

interface ProductInCart {
  product: Product;
  quantity: number;
}

const getTotalCount = (cart: { [id: string]: number }) => {
  let items = 0;
  Object.values(cart).forEach((value) => {
    items += value as number;
  });

  return items;
};

const getProductsInCart = (cart: { [id: string]: number }) => {
  const productsInCart: ProductInCart[] = [];

  for (const id of Object.keys(cart)) {
    const product = products.find((prod) => prod.id === id);
    if (product) {
      productsInCart.push({ product: product, quantity: cart[id] });
    }
  }

  return productsInCart;
};

export async function Topbar() {
  const cookieStore = await cookies();
  const cart = JSON.parse(cookieStore.get("cart")?.value ?? "{}");
  const totalItems = getTotalCount(cart);
  const productsInCart = getProductsInCart(cart);
  const totalToPay = productsInCart.reduce(
    (prev, curr) => curr.product.price * curr.quantity + prev,
    0
  );

  return (
    <div className="flex items-center justify-between w-full">
      <div className="flex items-center gap-2">
        <SidebarTrigger />
        <TopbarBreadcrumb />
      </div>
      <div className="flex items-center gap-2">
        <Input type="search" placeholder="Buscar..." />
        <Button size={"icon"}>
          <CiChat1 />
        </Button>
        <Sheet>
          <SheetTrigger asChild>
            <Button size={"icon"} className="relative">
              <ShoppingBag />
              {totalItems ? (
                <Badge
                  className="absolute -top-1 -right-1 h-4 w-4 flex items-center justify-center rounded-full p-0 text-[10px] font-medium"
                  variant={"destructive"}
                >
                  {totalItems}
                </Badge>
              ) : null}
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Products added to your cart</SheetTitle>
              <SheetDescription>
                View your shopping cart before buying. You can add or remove
                products
              </SheetDescription>
            </SheetHeader>
            <ScrollArea className="w-full h-full px-4">
              <div className="flex flex-col gap-4 flex-1">
                {productsInCart.length > 0 ? (
                  productsInCart.map(({ product, quantity }) => (
                    <ItemCard
                      key={product.id}
                      product={product}
                      quantity={quantity}
                    />
                  ))
                ) : (
                  <div className="flex items-center justify-center h-full w-full">
                    <p>Your cart is empty</p>
                  </div>
                )}
              </div>
            </ScrollArea>
            <SummaryCard
              subtotal={totalToPay}
              tax={(totalToPay * 0.15)}
            />
            <SheetFooter>
              <Button type="submit">Pay</Button>
              <SheetClose asChild>
                <Button variant="outline">Close</Button>
              </SheetClose>
            </SheetFooter>
          </SheetContent>
        </Sheet>
        <ModeToggle />
      </div>
    </div>
  );
}

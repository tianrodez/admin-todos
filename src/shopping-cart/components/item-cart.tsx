"use client";

import type { Product } from "@/products/data/products";
import Image from "next/image";
import { IoAdd } from "react-icons/io5";
import { addProductToCart, removeSingleItemFromCart } from "../actions/actions";

import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AiOutlineMinus } from "react-icons/ai";

interface Props {
  product: Product;
  quantity: number;
}

export const ItemCard = ({ product, quantity }: Props) => {
  const router = useRouter();

  const onAddToCart = () => {
    addProductToCart(product.id);
    router.refresh();
  };

  const onRemoveItem = () => {
    removeSingleItemFromCart(product.id);
    router.refresh();
  };

  return (
    <Card className="w-full">
      <CardContent className="flex items-center justify-between gap-4">
        <Image
          width={50}
          height={50}
          src={product.image}
          alt={product.title}
          className="object-cover aspect-square rounded-xl"
        />
        <div className="min-w-0 flex-1">
          <p className="text-base font-medium truncate">{product.title}</p>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mt-1">
            <div className="space-y-1">
              <p className="text-sm">Price: ${product.price}</p>
              <p className="text-sm font-bold">Total: ${product.price * quantity}</p>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant={"default"}
                size={"icon"}
                className="cursor-pointer"
                onClick={onAddToCart}
              >
                <IoAdd />
              </Button>
              <span className="text-sm min-w-[60px] text-center">{quantity} unit{quantity !== 1 ? 's' : ''}</span>
              <Button
                variant={"destructive"}
                size={"icon"}
                className="cursor-pointer"
                onClick={onRemoveItem}
              >
                <AiOutlineMinus />
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

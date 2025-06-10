"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { IoAdd } from "react-icons/io5";
import { AiOutlineMinus } from "react-icons/ai";
import {
  addProductToCart,
  removeProductFromCart,
} from "@/shopping-cart/actions/actions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface ProductCardProps {
  id: string;
  title: string;
  description: string;
  price: number;
  rating: number;
  image: string;
}

export function ProductCard({
  id,
  title,
  description,
  price,
  rating,
  image,
}: ProductCardProps) {
  const router = useRouter();

  const onAddToCart = () => {
    addProductToCart(id);
    toast.info("Products", {
      description: "Product added to cart",
    });
    router.refresh();
  };

  const onRemoveItemFromCart = () => {
    const { status, message } = removeProductFromCart(id);
    toast[status === 'success' ? 'success' : 'error']("Products", {
      description: message,
    });
    router.refresh();
  };

  return (
    <Card className="overflow-hidden max-w-sm">
      <CardHeader className="px-0">
        <div className="flex items-center justify-center mb-3">
          <Image
            width={150}
            height={150}
            src={image}
            alt={title}
            className="object-cover aspect-square rounded-xl"
          />
        </div>
        <div className="px-6 overflow-hidden">
          <CardTitle className="text-xl line-clamp-2 overflow-ellipsis">{title}</CardTitle>
          <div className="flex items-center mt-2">
            {Array(5)
              .fill(0)
              .map((_, i) => (
                <svg
                  key={i}
                  className={`w-4 h-4 ${
                    i < Math.round(rating) ? "text-yellow-500" : "text-gray-300"
                  }`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z" />
                </svg>
              ))}
            <span className="ml-2 text-sm">({rating.toFixed(1)})</span>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p>{description}</p>
      </CardContent>
      <CardFooter className="flex justify-between items-center">
        <p className="text-xl font-bold">${price}</p>
        <div className="flex gap-2">
          <Button
            variant={"default"}
            size={"icon"}
            className="cursor-pointer"
            onClick={onAddToCart}
          >
            <IoAdd />
          </Button>
          <Button
            variant={"destructive"}
            size={"icon"}
            className="cursor-pointer"
            onClick={onRemoveItemFromCart}
          >
            <AiOutlineMinus />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}

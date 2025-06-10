import { ProductCard } from "@/products";
import { products } from "@/products/data/products";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Products List",
  description: "Find the product that you like in our products list page"
}

export default function ProductsPage() {
  return (
    <div className="flex gap-4 flex-wrap">
      {products.map((product) => (
      <ProductCard key={product.id} {...product} />
      ))}
    </div>
  );
}

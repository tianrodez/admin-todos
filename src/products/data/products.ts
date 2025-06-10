export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  rating: number;
  image: string;
}

export const products: Product[] = [
  {
    id: "UUID-ABC-1",
    title: "Premium Wireless Headphones",
    description:
      "High-quality wireless headphones with noise cancellation and superior sound quality for an immersive audio experience.",
    price: 15,
    rating: 5,
    image:
      "https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  },
  {
    id: "UUID-ABC-2",
    title: "Vintage Baseball Cap",
    description:
      "Classic cotton cap with adjustable strap, perfect for casual outings or sports activities with stylish embroidered logo.",
    price: 25,
    rating: 3,
    image:
      "https://images.pexels.com/photos/1124465/pexels-photo-1124465.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  },
  {
    id: "UUID-ABC-3",
    title: "Summer Graphic T-Shirt",
    description:
      "Lightweight cotton t-shirt with vibrant sunshine design, perfect for warm weather and beach days with breathable fabric.",
    price: 36,
    rating: 2,
    image:
      "https://images.pexels.com/photos/6311387/pexels-photo-6311387.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  },
  {
    id: "UUID-ABC-4",
    title: "Modern Tech Hoodie",
    description:
      "Premium heavyweight hoodie with futuristic design elements, featuring kangaroo pocket and soft inner lining for ultimate comfort.",
    price: 45,
    rating: 5,
    image:
      "https://images.pexels.com/photos/6046183/pexels-photo-6046183.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  },
];

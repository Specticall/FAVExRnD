type TProduct = {
  id: string;
  name: string;
  img: string;
  description: string;
  price: number;
  stock: number;
  category: string[];
  discount?: number;
};

const IMAGE_PATH = "/assets/products";

export const productList: TProduct[] = [
  {
    id: "1",
    name: "Classic Polo Shirt",
    img: `${IMAGE_PATH}/image 1-1.png`,
    description: "A classic polo shirt made from premium cotton.",
    price: 599000,
    stock: 20,
    category: ["Polo Shirts", "Men"],
    discount: 0.5,
  },
  {
    id: "2",
    name: "Casual Trousers",
    img: `${IMAGE_PATH}/image 1-2.png`,
    description: "Casual trousers perfect for both work and play.",
    price: 1399000,
    stock: 15,
    category: ["Trousers", "Men"],
  },
  {
    id: "3",
    name: "Knitted Sweater",
    img: `${IMAGE_PATH}/image 1-3.png`,
    description: "A warm, knitted sweater for cold days.",
    price: 899000,
    stock: 10,
    category: ["Knitwear", "Women"],
  },
  {
    id: "4",
    name: "Stylish Hat",
    img: `${IMAGE_PATH}/image 1-4.png`,
    description: "A stylish hat to complete your outfit.",
    price: 899000,
    stock: 30,
    category: ["Hats", "Unisex"],
  },
];
export const API_URL = "http://127.0.0.1:8000";
export type APIError = { status: number; data: unknown };

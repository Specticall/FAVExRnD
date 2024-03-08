export type TProduct = {
  id: string;
  name: string;
  img: string;
  desc: string;
  price: number;
  stock: number;
  categories: string[];
  discount?: number;
};

const IMAGE_PATH = "/assets/products";

export const productList: TProduct[] = [
  {
    id: "1",
    name: "Classic Polo Shirt",
    img: `${IMAGE_PATH}/image 1-1.png`,
    desc: "A classic polo shirt made from premium cotton.",
    price: 599000,
    stock: 20,
    categories: ["Polo Shirts", "Men"],
    discount: 0.75,
  },
  {
    id: "2",
    name: "Casual Trousers",
    img: `${IMAGE_PATH}/image 1-2.png`,
    desc: "Casual trousers perfect for both work and play.",
    price: 1399000,
    stock: 15,
    categories: ["Trousers", "Men"],
  },
  {
    id: "3",
    name: "Knitted Sweater",
    img: `${IMAGE_PATH}/image 1-3.png`,
    desc: "A warm, knitted sweater for cold days.",
    price: 899000,
    stock: 10,
    categories: ["Knitwear", "Women"],
  },
  {
    id: "4",
    name: "Stylish Hat",
    img: `${IMAGE_PATH}/image 1-4.png`,
    desc: "A stylish hat to complete your outfit.",
    price: 899000,
    stock: 30,
    categories: ["Hats", "Unisex"],
  },
  {
    id: "5",
    name: "Stylish Hat",
    img: `${IMAGE_PATH}/image 1-4.png`,
    desc: "A stylish hat to complete your outfit.",
    price: 899000,
    stock: 30,
    categories: ["Hats", "Unisex"],
  },
];
export const API_URL = "http://127.0.0.1:8000";
export type APIError = { status: number; data: unknown };
export type TUserData = {
  name: string;
  email: string;
  address: string;
  phone: string;
  birthData: string;
  id: string;
  role: "Admin" | "Basic";
};
export type TAPIResponse = { status: number; data: unknown };
export const productType = [
  "Sweatshirts",
  "Knitwear",
  "Polo Shirts",
  "T-shirt",
  "Shirts",
  "Trousers",
  "Hats",
];

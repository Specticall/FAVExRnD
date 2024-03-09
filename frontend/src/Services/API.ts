import axios from "axios";
import { TCategory } from "../Context/DashboardContext";

export type TProduct = {
  id: string;
  name: string;
  img: string;
  desc: string;
  price: number;
  stock: number;
  categories: { label: string; id: number }[];
  discount?: number;
};

// const IMAGE_PATH = "/assets/products";

// export const productList: TProduct[] = [
//   {
//     id: "1",
//     name: "Classic Polo Shirt",
//     img: `${IMAGE_PATH}/image 1-1.png`,
//     desc: "A classic polo shirt made from premium cotton.",
//     price: 599000,
//     stock: 20,
//     categories: ["Polo Shirts", "Men"],
//     discount: 0.75,
//   },
//   {
//     id: "2",
//     name: "Casual Trousers",
//     img: `${IMAGE_PATH}/image 1-2.png`,
//     desc: "Casual trousers perfect for both work and play.",
//     price: 1399000,
//     stock: 15,
//     categories: ["Trousers", "Men"],
//   },
//   {
//     id: "3",
//     name: "Knitted Sweater",
//     img: `${IMAGE_PATH}/image 1-3.png`,
//     desc: "A warm, knitted sweater for cold days.",
//     price: 899000,
//     stock: 10,
//     categories: ["Knitwear", "Women"],
//   },
//   {
//     id: "4",
//     name: "Stylish Hat",
//     img: `${IMAGE_PATH}/image 1-4.png`,
//     desc: "A stylish hat to complete your outfit.",
//     price: 899000,
//     stock: 30,
//     categories: ["Hats", "Unisex"],
//   },
//   {
//     id: "5",
//     name: "Stylish Hat",
//     img: `${IMAGE_PATH}/image 1-4.png`,
//     desc: "A stylish hat to complete your outfit.",
//     price: 899000,
//     stock: 30,
//     categories: ["Hats", "Unisex"],
//   },
// ];
export const API_URL = "http://127.0.0.1:8000";
export type APIError = {
  status: number;
  data: {
    msg: string;
  };
};
export type TUserData = {
  name: string;
  email: string;
  address: string;
  phone: string;
  birthData: string;
  id: string;
  role: "Admin" | "Basic";
};
export type TAllDataResponse = {
  userData: TUserData;
  productData: (TProduct & { user: TUserData })[];
  categoryData: TCategory[];
};
export type TAPIResponse = { status: number; data: unknown };
export const productType = [
  { id: 1, label: "Sweatshirts" },
  { id: 2, label: "Knitwear" },
  { id: 3, label: "Polo Shirts" },
  { id: 4, label: "T-shirt" },
  { id: 5, label: "Shirts" },
  { id: 6, label: "Trousers" },
  { id: 7, label: "Hats" },
];

export const getAllData = async () => {
  const userRequest = axios.get(`${API_URL}/api/user`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
    },
  });

  const productRequest = axios.get(`${API_URL}/api/products`);

  const categoryRequest = axios.get(`${API_URL}/api/categories`);

  const dataResponse = await Promise.allSettled([
    productRequest,
    userRequest,
    categoryRequest,
  ]);

  const data = dataResponse
    .map((data) => {
      return data.status === "fulfilled" ? data.value.data : undefined;
    })
    .reduce((data, current) => {
      if (!current) return data;
      if (current.name) return { ...data, userData: current };
      if (current?.data?.products)
        return { ...data, productData: current?.data?.products };
      if (current?.data?.categories)
        return { ...data, categoryData: current.data.categories };
      return data;
    }, {});

  return data;
};

import axios from "axios";
import { API_URL } from "../Services/API";
import { Outlet, redirect } from "react-router-dom";
import { DashboardProvider, useDashboard } from "../Context/DashboardContext";
import { useMemo } from "react";
import { convertToRupiah } from "../utils/helper";

export const loader = async () => {
  try {
    const userRequest = axios.get(`${API_URL}/api/user`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
      },
    });

    const productRequest = axios.get(`${API_URL}/api/products`);

    const dataResponse = await Promise.allSettled([
      productRequest,
      userRequest,
    ]);

    const data = dataResponse
      .map((data) => {
        return data.status === "fulfilled" ? data.value.data : undefined;
      })
      .reduce((data, current) => {
        if (current.name) return { ...data, userData: current };
        if (current?.data?.products)
          return { ...data, productData: current?.data?.products };
        return data;
      }, {});

    type TODO = any;
    console.log(
      "EVERY USER CAN STILL LOG IN, ADMIN ROLE SPECIFICATION NOT YET ADDED"
    );
    return data;
  } catch (err) {
    return redirect("/home");
  }
};

export default function Dashboard() {
  return (
    <DashboardProvider>
      <main className="max-w-[80rem] mx-auto py-12 font-body px-8">
        <Heading />
        <Statistics />
        <Outlet />
      </main>
    </DashboardProvider>
  );
}

function Heading() {
  const { userData } = useDashboard();

  return (
    <div className="mb-8">
      <h1 className="text-title text-light">
        Welcome,
        <span className="font-semibold text-main"> {userData.name}</span>
      </h1>
    </div>
  );
}

function Statistics() {
  const { productData, userData } = useDashboard();
  const statistics = useMemo(
    () => [
      {
        title: "Total Products Sold",
        content: `${productData.length} units`,
        style: {
          backgroundColor: "#FFD5A5",
          color: "#392A2A",
        },
      },
      {
        title: "Most Recent Product",
        content: productData[productData.length - 1].name || "No Products Yet",
        style: { backgroundColor: "#392A2A", color: "white" },
      },
      {
        title: "Total Sales",
        content: convertToRupiah(19250000),
        style: { backgroundColor: "#6F6758", color: "white" },
      },
    ],
    [productData, userData.name]
  );

  return (
    <div>
      <p className="mb-4 font-semibold text-main">Statistics</p>
      <ul className="grid grid-cols-3 gap-8">
        {statistics.map(({ title, content, style }) => (
          <article className="px-8 py-6 rounded-xl" style={style}>
            <p className="text-small">{title}</p>
            <h3 className="text-medium font-semibold tracking-wide">
              {content}
            </h3>
          </article>
        ))}
      </ul>
    </div>
  );
}

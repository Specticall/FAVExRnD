import { getAllData } from "../Services/API";
import { Outlet, redirect } from "react-router-dom";
import { DashboardProvider, useDashboard } from "../Context/DashboardContext";
import { useMemo } from "react";
import { convertToRupiah } from "../utils/helper";
import Button from "../Components/Button";

export const loader = async () => {
  try {
    const data = await getAllData();
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
    <div className="mb-8 flex items-center justify-between gap-8">
      <h1 className="text-title text-light">
        Welcome,
        <span className="font-semibold text-main"> {userData?.name}</span>
      </h1>{" "}
      <Button
        className="font-body flex items-center justify-center gap-2 hover:text-light"
        to="/home"
      >
        <i className="bx bx-left-arrow-alt text-heading"></i>
        <p>Back</p>
      </Button>
    </div>
  );
}

function Statistics() {
  const { productData } = useDashboard();
  const statistics = useMemo(
    () => [
      {
        title: "Total Products Sold",
        content: `${productData?.length} units`,
        style: {
          backgroundColor: "#FFD5A5",
          color: "#392A2A",
        },
      },
      {
        title: "Most Recent Product",
        content:
          productData?.[productData?.length - 1]?.name || "No Products Yet",
        style: { backgroundColor: "#392A2A", color: "white" },
      },
      {
        title: "Total Sales",
        content: convertToRupiah(19250000),
        style: { backgroundColor: "#6F6758", color: "white" },
      },
    ],
    [productData]
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

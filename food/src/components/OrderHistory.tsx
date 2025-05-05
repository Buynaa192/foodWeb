"use client";

import { Food } from "@/assets/food";
import { Map } from "@/assets/map";
import { Time } from "@/assets/time";
import axios from "axios";
import { useEffect, useState } from "react";
type order = {
  totalPrice: number;
  status: string;
  createdAt: string;
  user: { address: string };
  foodOrderItems: [
    {
      food: { foodName: string };
      quantity: number;
    }
  ];
};
export const OrderHistory = () => {
  const [order, setOrder] = useState<order[]>([]);
  useEffect(() => {
    getCategory();
  }, []);

  const getCategory = async () => {
    const response = await axios.get(
      "http://localhost:3001/order?userId=6800b35d039f8894d38c7516"
    );
    setOrder(response.data.order);
  };
  console.log("buynaa", order);

  return (
    <div className="w-full h-full rounded-[20px] bg-white p-4 flex flex-col gap-5">
      <p>Order history</p>
      {order.map((item, index) => {
        return (
          <div key={index} className=" flex flex-col gap-2.5">
            <div className="flex justify-between">
              <p className="font-bold">${item.totalPrice}</p>
              <p
                className={`border-2 rounded-full mt-2 p-1 ${
                  item.status === "pending"
                    ? "border-red-500"
                    : item.status === "delivered"
                    ? "border-green-500"
                    : "border-gray-300"
                }`}
              >
                {item.status}
              </p>
            </div>
            <div className="flex gap-2.5 text-[#71717A]  min-h-4 flex-col">
              {item.foodOrderItems.map((or, index) => {
                return (
                  <div key={index} className="flex justify-between ">
                    <div className="flex gap-2 items-center ">
                      <Food />
                      <p>{or.food.foodName}</p>
                    </div>
                    <p className="text-black">x {or.quantity}</p>
                  </div>
                );
              })}
            </div>
            <p className="flex gap-2 items-center text-[#71717A]">
              <Time />
              {item.createdAt}
            </p>
            <p className="flex gap-2 items-center text-[#71717A]">
              <Map />
              {item.user.address}
            </p>
            <div className="border-1 w-full border-dashed mt-2.5"></div>
          </div>
        );
      })}
    </div>
  );
};

/* <p>foodname</p> */

//   <p>x too</p>

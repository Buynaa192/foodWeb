"use client";

import { Food } from "@/assets/food";
import { Map } from "@/assets/map";
import { Time } from "@/assets/time";
import axios from "axios";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useAuth } from "./userProvider";
import { Loader } from "lucide-react";
type order = {
  totalPrice: number;
  _id: string;
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
type open = {
  setOpen: Dispatch<SetStateAction<boolean>>;
};
export const OrderHistory = ({ setOpen }: open) => {
  const [order, setOrder] = useState<order[]>([]);
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    getOrder();
  }, []);

  const getOrder = async () => {
    if (!user) return;
    setLoading(true);
    const response = await axios.get(
      `http://localhost:3001/order?userId=${user?._id}`
    );
    setOrder(response.data.order);
    setLoading(false);
  };

  return (
    <div className="w-full h-full rounded-[20px] bg-white p-4 flex flex-col gap-5 overflow-scroll items-center">
      <p className="font-bold text-[20px]">Order history</p>
      {loading ? (
        <Loader size={40} className="animate-spin" />
      ) : (
        <div className="w-full">
          {order.length > 0 ? (
            <div className="flex flex-col">
              {order.map((item, index) => {
                return (
                  <div key={index} className=" flex flex-col gap-2.5 ">
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
          ) : (
            <div className="flex flex-col gap-5">
              <div className=" w-full h-50 rounded-xl bg-[#F4F4F5] flex flex-col items-center justify-center">
                <img src="/images/logo.png" className="w-15 h-[50px]"></img>
                <p className="font-bold ">No Orders Yet? </p>
                <p className="text-[#71717A] flex text-center">
                  🍕 "You haven't placed any orders yet. Start exploring our
                  menu and satisfy your cravings!"
                </p>
              </div>
              <div
                onClick={() => setOpen(false)}
                className="border-red-500 border-1 rounded-full w-full h-11 flex justify-center items-center text-red-500"
              >
                add food
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

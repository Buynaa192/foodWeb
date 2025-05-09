"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Chevdown } from "@/assets/chevronDown";

type ordersType = {
  createdAt: string;
  totalPrice: number;
  status: string;
  email: string;
  address: string;
  index: number;
  orderId: string;
  foodOrderItems: {
    quantity: number;
    food: { foodName: string; image: string };
  }[];
};

export const OneOrder = ({
  createdAt,
  totalPrice,
  status,
  email,
  address,
  index,
  foodOrderItems,
  orderId,
}: ordersType) => {
  const [open, setOpen] = useState(false);
  const [put, setPut] = useState(status);

  useEffect(() => {
    const updateOrder = async () => {
      try {
        await axios.put("http://localhost:3001/order/put", {
          id: orderId,
          newStatus: put,
        });
      } catch (error) {
        console.error("Failed to update order status:", error);
      }
    };

    if (put !== status) {
      updateOrder();
    }
  }, [put, orderId, status]);

  return (
    <div className="w-full h-full flex border border-[#E4E4E7] hover:bg-[#F4F4F5CC]">
      <div className="w-12 flex items-center justify-center">
        <input type="checkbox" />
      </div>
      <p className="w-[56px] flex items-center justify-center">{index}</p>
      <p className="w-[214px] flex items-center justify-center">{email}</p>
      <div
        onClick={() => setOpen((prev) => !prev)}
        className="relative flex w-40 items-center justify-between p-4 cursor-pointer"
      >
        <div className="flex flex-col">
          {foodOrderItems.length} foods
          {open && (
            <div className="absolute z-10 top-12 min-h-13 w-[263px] bg-white p-3 border border-[#0000001A] rounded-md shadow">
              <div className="flex flex-col gap-3">
                {foodOrderItems.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex gap-2.5 justify-between items-center"
                  >
                    <div className="flex gap-2.5 items-center">
                      <div className="w-8 h-8 border-2 overflow-hidden">
                        <img
                          className="w-8 h-8 object-cover"
                          src={item.food.image}
                          // alt={item.food.image}
                        />
                      </div>
                      <div className="text-[12px]">{item.food.foodName}</div>
                    </div>
                    <div>x {item.quantity}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        <Chevdown />
      </div>
      <div className="w-40 flex items-center justify-between p-4">
        <p>{createdAt}</p>
      </div>
      <p className="w-40 flex items-center justify-center">
        ${totalPrice.toFixed(2)}
      </p>
      <p className="w-[250px] flex items-center justify-center">{address}</p>

      <Select onValueChange={(value) => setPut(value)} defaultValue={status}>
        <SelectTrigger
          className={`border-2 rounded-full mt-2 ${
            put === "pending"
              ? "border-red-500"
              : put === "delivered"
              ? "border-green-500"
              : "border-gray-300"
          }`}
        >
          <SelectValue placeholder={status} />
        </SelectTrigger>
        <SelectContent className="bg-white">
          <SelectItem value="pending">pending</SelectItem>
          <SelectItem value="delivered">delivered</SelectItem>
          <SelectItem value="cancelled">cancelled</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

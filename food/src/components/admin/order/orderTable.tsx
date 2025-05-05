"use client";
import { useEffect, useState } from "react";
import { OneOrder } from "../oneOrder";
import { Tablex } from "../table";
import { DatePickerWithRange } from "../uzjin";
import axios from "axios";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

type orderType = {
  createdAt: string;
  totalPrice: number;
  status: string;
  _id: string;
  user: {
    address: string;
    email: string;
  };
  foodOrderItems: [
    { quantity: number; food: { foodName: string; image: string } }
  ];
};

export const OrderTable = () => {
  const [orders, setOrders] = useState<orderType[]>([]);

  useEffect(() => {
    getOrders();
  }, []);
  const getOrders = async () => {
    const response = await axios.get("http://localhost:3001/order");
    setOrders(response.data.order);
  };

  return (
    <div className="2 w-full h-200">
      <div className=" h-[76px] flex justify-between items-center">
        <div className="  m-4 w-[486px] h-11 flex flex-col">
          <p className="font-bold text-[20px]">Orders</p>
          <p className="text-[12px]">{orders.length} items</p>
        </div>
        <div className=" h-9 w-[491px] m-4 flex gap-3 items-center">
          <DatePickerWithRange />
          <Dialog>
            <DialogTrigger>
              <div className="h-9 border-2 w-[179px] rounded-full flex items-center justify-center ">
                Change delivery state
              </div>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Change delivery state</DialogTitle>
              </DialogHeader>
              <div className="w-80 h-25  mt-6 flex flex-col gap-6">
                <div className="flex gap-4 ">
                  <div className="w-[94px] h-8 rounded-full bg-[#F4F4F5] flex justify-center items-center">
                    delivered
                  </div>
                  <div className="w-[94px] h-8 rounded-full bg-[#F4F4F5] flex justify-center items-center">
                    pending
                  </div>
                  <div className="w-[94px] h-8 rounded-full bg-[#F4F4F5] flex justify-center items-center">
                    cancelled
                  </div>
                </div>
                <div className="bg-black rounded-full flex items-center justify-center text-white h-9">
                  save
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <div className=" w-full h-[690px] grid grid-rows-13">
        <Tablex />
        {orders.map((item, index) => {
          return (
            <div key={index}>
              <OneOrder
                totalPrice={item.totalPrice}
                createdAt={item.createdAt}
                status={item.status}
                address={item.user.address}
                email={item.user.email}
                index={index + 1}
                foodOrderItems={item.foodOrderItems}
                orderId={item._id}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};
<Dialog>
  <DialogTrigger>
    <div className="h-full border-2 w-[179px] rounded-full flex items-center justify-center ">
      Change delivery state
    </div>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Are you absolutely sure?</DialogTitle>
      <DialogDescription>
        This action cannot be undone. This will permanently delete your account
        and remove your data from our servers.
      </DialogDescription>
    </DialogHeader>
  </DialogContent>
</Dialog>;

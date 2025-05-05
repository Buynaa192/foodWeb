"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import axios from "axios";
import { Dispatch, SetStateAction, useState } from "react";
type food = {
  foodName: string;
  ingredients: string;
  price: number;
  id: string;
  setCartItems: Dispatch<SetStateAction<food[]>>;
  quantity: number;
  image: string;
};
type cartItemsType = {
  cartItems: food[];
};
export const Payment = ({ cartItems }: cartItemsType) => {
  const [open, setOpen] = useState(false);
  const TOTAL = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const addOrder = async () => {
    try {
      const formattedItems = cartItems.map((item) => ({
        food: item.id,
        quantity: item.quantity,
      }));

      const res = await axios.post("http://localhost:3001/order/post", {
        user: "6800b35d039f8894d38c7516",
        foodOrderItems: formattedItems,
      });
    } catch (error) {
      console.error("error adding food", error);
    }
  };

  return (
    <div className="border-2 min-h-[276px] rounded-[20px] bg-white p-4 flex flex-col gap-5">
      <p className="font-bold text-[20px]">Payment info</p>
      <div>
        {cartItems.map((item, index) => {
          return (
            <div key={index} className="flex justify-between">
              <p>{item.foodName}</p>
              <p className="font-bold">
                ${item.price} X {item.quantity}
              </p>
            </div>
          );
        })}
      </div>
      <div className="border-1 border-dashed"></div>
      <div className="flex justify-between">
        <p>total </p>
        <p className="font-bold">${TOTAL}</p>
      </div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger>
          <div
            className="h-11 rounded-full bg-red-500 text-white flex justify-center items-center"
            onClick={() => addOrder()}
          >
            Checkout
          </div>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-center">
              Your order has been successfully placed !
            </DialogTitle>
          </DialogHeader>
          <div className="w-150 h-100  flex justify-center items-center flex-col gap-12">
            <img src="/images/illustration.png"></img>
            <button
              onClick={() => setOpen(false)}
              className="bg-[#F4F4F5] w-[134px] h-11 rounded-full"
            >
              close
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

// if (index > -1) {
//   stored[index].quantity += quantity;

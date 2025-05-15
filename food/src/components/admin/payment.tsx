"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Dispatch, SetStateAction, useState } from "react";
import { useAuth } from "../userProvider";

import { api } from "@/axios";
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
  setCartItems: Dispatch<SetStateAction<food[]>>;
  swtich: number;
  setSwitch: Dispatch<SetStateAction<number>>;
};
export const Payment = ({
  cartItems,

  swtich,
  setSwitch,
}: cartItemsType) => {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");
  const { user } = useAuth();
  const TOTAL = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const addOrder = async () => {
    try {
      if (!user) {
        setError("newtrene uu");
        return;
      }
      if (cartItems.length == 0) {
        setError("zahialga ugnu uu");
        return;
      }

      const formattedItems = cartItems.map((item) => ({
        food: item.id,
        quantity: item.quantity,
      }));

      await api.post("/order/post", {
        user: user?._id,
        foodOrderItems: formattedItems,
      });
    } catch (error) {
      console.error("error adding food", error);
    } finally {
      localStorage.removeItem("foods");
    }
  };
  const close = () => {
    // localStorage.removeItem("foods");
    // window.location.reload();
    setSwitch(swtich + 1);
  };

  return (
    <div className="border-2 min-h-[276px] rounded-[20px] bg-white p-4 flex flex-col gap-5">
      <p className="font-bold text-[20px]">Payment info</p>
      <div className="">
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
          {user && cartItems.length !== 0 ? (
            <div>
              <DialogHeader>
                <DialogTitle className="text-center">
                  Your order has been successfully placed !
                </DialogTitle>
              </DialogHeader>
              <div className="w-150 h-100  flex justify-center items-center flex-col gap-12">
                <img src="/images/illustration.png"></img>
                <button
                  onClick={() => close()}
                  className="bg-[#F4F4F5] w-[134px] h-11 rounded-full"
                >
                  close
                </button>
              </div>
            </div>
          ) : (
            <div>
              <DialogHeader>
                <DialogTitle className="text-center">{error}!</DialogTitle>
              </DialogHeader>
              <div className=" w-100 h-30 flex justify-center items-center flex-col gap-12">
                <button
                  onClick={() => setOpen(false)}
                  className="bg-[#F4F4F5] w-[134px] h-11 rounded-full"
                >
                  close
                </button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

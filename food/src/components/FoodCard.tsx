"use client";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Loader } from "lucide-react";
import { Dispatch, SetStateAction, useState } from "react";
import { toast } from "sonner";

import { DialogTitle } from "@radix-ui/react-dialog";
import { useAuth } from "./userProvider";

type card = {
  foodName: string;
  ingredients: string;
  price: number;
  _id: string;
  setCartItems: Dispatch<SetStateAction<food[]>>;
  cartItems: food[];
  image: string;
};
type food = {
  foodName: string;
  ingredients: string;
  price: number;
  id: string;
  setCartItems: Dispatch<SetStateAction<food[]>>;
  quantity: number;
  image: string;
};
type local = {
  foodName: string;
  ingredients: string;
  price: number;
  id: string;
  quantity: number;
  image: string;
};
export const FoodCard = ({
  _id,
  foodName,
  price,
  ingredients,
  image,
  setCartItems,
}: card) => {
  const [quantity, setQuantity] = useState(0);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isAddressEmpty, SetIsAddressEmpty] = useState<boolean>(false);
  const { user } = useAuth();

  const handleAddCart = () => {
    if (user?.address === "") {
      SetIsAddressEmpty(true);
      return;
    }

    try {
      setLoading(true);
      const stored = JSON.parse(localStorage.getItem("foods") || "[]");
      const index = stored.findIndex((item: local) => item.id === _id);

      if (index > -1) {
        stored[index].quantity += quantity;
      } else {
        stored.push({ id: _id, foodName, quantity, price, ingredients, image });
      }

      setCartItems(stored);
      localStorage.setItem("foods", JSON.stringify(stored));
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
      setOpen(false);
      toast.success("Food is being added to the cart!");
    }
  };
  const nemeh = () => setQuantity((q) => q + 1);
  const hasah = () => setQuantity((q) => (q > 0 ? q - 1 : 0));
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <div key={_id} className="bg-white rounded-[20px] flex flex-col gap-5">
          <div className=" m-4 h-52 mb-0 ">
            <img className="w-full h-full rounded-md" src={image}></img>
          </div>
          <div className=" m-4 h-20 mt-0 flex flex-col gap-2">
            <div className="flex justify-between ">
              <p className="font-bold text-[24px] text-red-500">{foodName}</p>
              <p className="font-bold text-[18px]">{price}$</p>
            </div>
            <p className="text-[14px]">{ingredients}</p>
          </div>
        </div>
      </DialogTrigger>

      <DialogContent className="w-[826px] h-[412px]">
        <div className="bg-white rounded-[20px] flex  gap-4  w-[826px] h-[412px] absolute">
          <div className="  ">
            <img
              className="m-6 w-[377px] h-[364px] rounded-md"
              src={image}
            ></img>
          </div>
          <div className="  h-[364px] w-[377px] m-6 ml-0 flex flex-col justify-around  ">
            <div className="flex flex-col mt-9 ">
              <p className="font-bold text-[30px] text-red-500">{foodName}</p>
              <p className="">{ingredients}</p>
            </div>
            <div className=" w-full h-[124px] flex flex-col gap-6 ">
              <div className=" h-14 flex justify-between ">
                <div className="flex flex-col ">
                  <p>Total price</p>
                  <p className="font-bold">{price}$</p>
                </div>
                <div className=" w-[121px] flex  items-center justify-between">
                  <div
                    onClick={hasah}
                    className="w-10 h-10 rounded-full border-1 flex items-center justify-center"
                  >
                    -
                  </div>
                  <div className="font-bold ">{quantity}</div>
                  <div
                    onClick={nemeh}
                    className="w-10 h-10 rounded-full border-1 flex items-center justify-center"
                  >
                    +
                  </div>
                </div>
              </div>
              <button
                onClick={handleAddCart}
                disabled={quantity === 0}
                className="bg-black rounded-full h-11 flex items-center justify-center text-white mb-4"
              >
                {loading ? (
                  <Loader size={16} className="animate-spin" />
                ) : (
                  "Add to cart"
                )}
              </button>
            </div>
          </div>
        </div>

        {isAddressEmpty && (
          <div className="w-full h-96 gap-10 flex flex-col items-center pt-6 z-50 bg-white">
            <p className="font-bold text-[24px]">
              Please select your delivery address!
            </p>
            <img className="w-[142px] h-[116px]" src="/images/logo.png"></img>

            <button
              onClick={() => {
                setOpen(false);
              }}
              className="w-[134px] h-11 rounded-full bg-[#F4F4F5]"
            >
              close
            </button>
          </div>
        )}

        <DialogTitle></DialogTitle>
      </DialogContent>
    </Dialog>
  );
};

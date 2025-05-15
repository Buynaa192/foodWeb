import { ChevronRigth } from "@/assets/chevronrigth";
import { Loc } from "@/assets/loc";
import { Logo } from "@/assets/logo";
import { Shopping } from "@/assets/shopping";
import { User } from "@/assets/user";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import Link from "next/link";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { CartCard } from "./cartCard";
import { Shop } from "@/assets/shop";
import { Dispatch, SetStateAction, useState } from "react";
import { Payment } from "./admin/payment";

import { OrderHistory } from "./OrderHistory";

import { useAuth } from "./userProvider";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
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
type cartType = {
  setCartItems: Dispatch<SetStateAction<food[]>>;
  cartItems: food[];
  swtich: number;
  setSwitch: Dispatch<SetStateAction<number>>;
};

export const Header = ({
  setCartItems,
  cartItems,
  swtich,
  setSwitch,
}: cartType) => {
  const [open, setOpen] = useState(false);
  const [address, setAddress] = useState("");
  const { user, signOut, getUser } = useAuth();

  const UpdateUser = async () => {
    if (!user) return;
    if (!address.trim()) {
      return;
    }
    try {
      await api.put("/user/put", {
        id: user?._id,
        newAddress: address,
      });
      const token = localStorage.getItem("token");
      if (!token) return;
      getUser(token);
      // window.location.reload();
      console.log(user);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className=" w-full h-18 flex  justify-around bg-black text-white">
      <div className="flex border-2 border-black gap-3">
        <Logo />
        <div className="flex border-black border-2 flex-col">
          <div className="flex">
            <p>Nom</p>
            <p className="text-red-500">Nom</p>
          </div>
          <p>Swift delivery</p>
        </div>
      </div>
      <div className=" flex gap-3 items-center">
        <div className="border-2 bg-white rounded-full w-[251px] h-9 flex gap-2 items-center justify-center">
          <Loc />
          <p className="text-red-500 text-[12px] w-40">Delivery address:</p>
          <div className=" w-40">
            <AlertDialog>
              <AlertDialogTrigger className="text-black text-[14px] w-full  ">
                Add Location
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Delivery address</AlertDialogTitle>
                  <AlertDialogDescription></AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter></AlertDialogFooter>
                <div className="border-1 border-[#E4E4E7] w-110 h-[112px] flex items-end rounded-md">
                  <textarea
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Please provide specific address details such as building number, entrance, and apartment number"
                    className="w-full border-2 h-[112px] rounded-md"
                  ></textarea>
                </div>
                <div className="flex gap-4 justify-end mr-5">
                  <AlertDialogCancel className="w-20">Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={UpdateUser}
                    className="bg-black text-white w-30"
                  >
                    Deliver Here
                  </AlertDialogAction>
                </div>
              </AlertDialogContent>
            </AlertDialog>
          </div>

          <ChevronRigth />
        </div>
        <div className="rounded-full w-9 h-9  flex items-center justify-center bg-white">
          <Sheet onOpenChange={setOpen} open={open}>
            <SheetTrigger>
              <div className="w-9 h-9 flex items-center justify-center">
                <Shopping />
                {cartItems.length > 0 && (
                  <div className="bg-red-500 w-5 h-5 rounded-full absolute ml-7 mb-7 flex justify-center items-center text-[12px]">
                    {cartItems.length}
                  </div>
                )}
              </div>
            </SheetTrigger>
            <SheetContent className="bg-[#404040] text-white">
              <SheetHeader>
                <SheetTitle className="text-[20px] flex gap-3">
                  <Shop />
                  Order detail
                </SheetTitle>
              </SheetHeader>

              <div className="h-full m-8 mt-0 flex flex-col gap-6 text-black overflow-hidden ">
                <div className=" h-11 rounded-full bg-white p-[4px] flex gap-2">
                  <div
                    onClick={() => {
                      setSwitch(1);
                    }}
                    className={
                      swtich === 2
                        ? " rounded-full w-1/2 flex items-center justify-center"
                        : " rounded-full w-1/2 flex items-center justify-center bg-red-500"
                    }
                  >
                    cart
                  </div>
                  <div
                    onClick={() => {
                      setSwitch(2);
                    }}
                    className={
                      swtich === 1
                        ? " rounded-full w-1/2 flex items-center justify-center"
                        : " rounded-full w-1/2 flex items-center justify-center bg-red-500"
                    }
                  >
                    order
                  </div>
                </div>
                {swtich === 1 && (
                  <div className=" h-[540px] rounded-[20px] flex gap-5  flex-col bg-white p-4 overflow-scroll">
                    <p className="text-[20px] font-bold">My cart</p>
                    {cartItems.map((item, index) => {
                      return (
                        <CartCard
                          key={index}
                          ingredients={item.ingredients}
                          price={item.price}
                          foodName={item.foodName}
                          id={item.id}
                          quantity={item.quantity}
                          setCartItems={setCartItems}
                          image={item.image}
                        />
                      );
                    })}

                    <div
                      onClick={() => setOpen(false)}
                      className="border-2 border-red-500 h-11 rounded-full text-red-500 flex justify-center items-center"
                    >
                      add food
                    </div>
                  </div>
                )}
                {swtich === 1 && (
                  <Payment
                    cartItems={cartItems}
                    setCartItems={setCartItems}
                    swtich={swtich}
                    setSwitch={setSwitch}
                  />
                )}
                {swtich === 2 && <OrderHistory setOpen={setOpen} />}
              </div>
            </SheetContent>
          </Sheet>
        </div>
        {user ? (
          <Popover>
            <PopoverTrigger>
              <div className="rounded-full w-9 h-9  bg-red-500 flex items-center justify-center">
                <User />
              </div>
            </PopoverTrigger>
            <PopoverContent className="bg-white w-50">
              <div className="w-full h-full text-black flex flex-col items-center justify-center gap-4">
                <p className="font-bold text-min-[20px] ">{user.email}</p>
                <button
                  onClick={signOut}
                  className="w-20 h-9 bg-[#F4F4F5] rounded-full"
                >
                  Log Out
                </button>
              </div>
            </PopoverContent>
          </Popover>
        ) : (
          <div className="flex gap-4">
            <Link href={"/login"}>
              <button className="border-2 rounded-full h-10 w-20 flex items-center justify-center">
                Login
              </button>
            </Link>
            <Link href={"/login"}>
              <button className="border-2 rounded-full h-10 w-20 flex items-center justify-center">
                Sign up
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

import { Chevdown } from "@/assets/chevronDown";
import { Chevronud } from "@/assets/chevronud";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";

export const Tablex = () => {
  return (
    <div className="w-full h-full flex border-1 border-[#E4E4E7] hover:bg-[#F4F4F5CC] ">
      <div className="w-12 flex items-center justify-center ">
        <input type="checkbox"></input>
      </div>
      <p className=" w-[56px] flex items-center justify-center">№</p>
      <p className=" w-[214px] flex items-center justify-center">Customer</p>
      <div className="flex w-40  items-center justify-between p-4 ">
        <p>Food</p>
      </div>
      <div className=" w-40 flex items-center justify-between p-4">
        <p>Date</p>
        <Chevronud />
      </div>
      <p className=" w-40 flex items-center justify-center">Total </p>
      <p className=" w-[250px] flex items-center justify-center">
        Delivery Address
      </p>
      <div className="w-29  flex justify-center items-center gap-2">
        <p className="text-[14px]">Delivery state</p>
        <Chevronud />
      </div>
    </div>
  );
};

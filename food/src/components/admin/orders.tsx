"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { OrderTable } from "./order/orderTable";
import { PaginationB } from "./pagination";

export const Orders = () => {
  return (
    <div className=" w-[1171px] h-[948px] m-6 flex flex-col gap-6 bg-white">
      <div className=" h-19 w-full flex items-center justify-end bg-[#F4F4F5]">
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
      <OrderTable />
      <PaginationB />
    </div>
  );
};

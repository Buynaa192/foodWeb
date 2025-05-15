"use client";

import { useEffect, useState } from "react";

import { api } from "@/axios";

export type categoryName = {
  categoryName: string;
  catid: string;
  sellected: string;
};

export const CategoryBtn = ({
  categoryName,
  catid,
  sellected,
}: categoryName) => {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    getcount();
  }, []);

  const getcount = async () => {
    const response = await api.get(`/category/count?categoryId=${catid}`);
    setCount(response.data);
  };
  return (
    <div
      className={
        sellected == catid
          ? "border-1 border-red-600  rounded-full h-9 flex gap-2 items-center justify-center p-4"
          : "border-[#E4E4E7] rounded-full h-9 flex gap-2 items-center justify-center p-4 border-1"
      }
    >
      <p className="text-[14px]">{categoryName}</p>
      <div className="bg-black text-white rounded-full">
        <p className="text-[12px] ml-[10px] mr-[10px]">{count}</p>
      </div>
    </div>
  );
};

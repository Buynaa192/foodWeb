"use client";
import { Logo } from "@/assets/logo";
import { categoryType } from "./admin/adminCategorys/adminCategoties";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { api } from "@/axios";

export const Footer = () => {
  const [category, setCategory] = useState<categoryType[]>([]);
  useEffect(() => {
    getCategory();
  }, []);

  const getCategory = async () => {
    const response = await api.get("/category");
    setCategory(response.data.categories);
  };
  return (
    <div className="w-full h-200 bg-black pt-15 flex flex-col items-center">
      <div className="w-full overflow-hidden whitespace-nowrap bg-red-500 h-16 flex items-center">
        <motion.div
          className="flex text-white font-bold text-[30px] gap-8"
          animate={{ x: ["100%", "-100%"] }}
          transition={{
            repeat: Infinity,
            duration: 10,
            ease: "linear",
          }}
        >
          <span>Fresh fast delivered</span>
          <span>Fresh fast delivered</span>
          <span>Fresh fast delivered</span>
          <span>Fresh fast delivered</span>
        </motion.div>
      </div>
      <div className="w-[calc(100%-196px)] h-57 flex  mt-19">
        <div className="">
          <div className="flex flex-col  items-center gap-3">
            <Logo />
            <div className="flex flex-col">
              <div className="flex font-bold text-[20px]">
                <p className="text-white">Nom</p>
                <p className="text-red-500">Nom</p>
              </div>
              <p className="text-white">Swift delivery</p>
            </div>
          </div>
        </div>
        <div className=" ml-50 w-[788px] flex gap-[112px] text-white">
          <div className=" w-[112px] h-[148px] flex flex-col gap-4 ">
            <p className="text-[#71717A] font-bold">NOMNOM </p>
            <p>Home </p>
            <p>Contact us</p>
            <p>Delivery zone</p>
          </div>
          <div className=" w-[320px] h-full flex gap-4 flex-col ">
            <p className="text-[#71717A] font-bold">Menu</p>
            <div className="grid grid-cols-2  gap-3">
              {category.map((item) => {
                return <p key={item._id}>{item.categoryName}</p>;
              })}
            </div>
          </div>
          <div className=" w-[122px] flex  flex-col gap-[21px] ">
            <p className="text-[#71717A] font-bold">FOLLOW US</p>
            <div className="flex gap-4">
              <img src="/images/fb.png"></img>
              <img src="/images/ig.png"></img>
            </div>
          </div>
        </div>
      </div>
      <div className="border-[#F4F4F566] border-t-1 w-[calc(100%-196px)] h-21 mt-26 flex gap-12 text-[#71717A] items-center">
        <p>Copy right 2024 © Nomnom LLC</p>
        <p>Privacy policy </p>
        <p>Terms and conditoin</p>
        <p>Cookie policy</p>
      </div>
    </div>
  );
};

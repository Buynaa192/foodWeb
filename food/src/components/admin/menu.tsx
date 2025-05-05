"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { AdminAppentizers } from "./adminCategorys/adminAppentizers";
import {
  AdminCategories,
  categoryType,
} from "./adminCategorys/adminCategoties";
import { useEffect, useState } from "react";
import axios from "axios";
export type catType = {
  categoryName: string;
  _id: string;
};

export const FoodMenu = () => {
  const [category, setCategory] = useState<catType[]>([]);
  const [sellected, setSellected] = useState("");
  useEffect(() => {
    getCategory();
  }, []);

  const getCategory = async () => {
    const response = await axios.get("http://localhost:3001/category");
    setCategory(response.data.categories);
  };
  const filteredCategory = category.filter((item) => {
    if (sellected == "") {
      return item;
    } else {
      return item._id == sellected;
    }
  });
  return (
    <div className=" w-[1171px] min-h-[236px] m-6 flex flex-col gap-6 bg-[#F4F4F5] ">
      <div className=" min-h-[300px] flex flex-col gap-6 ">
        <div className=" h-19 w-full flex items-start justify-end bg-[#F4F4F5]">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
        <AdminCategories setSellected={setSellected} sellected={sellected} />
      </div>
      {filteredCategory.map((item) => {
        return (
          <div key={item._id}>
            <AdminAppentizers _id={item._id} categoryName={item.categoryName} />
          </div>
        );
      })}
    </div>
  );
};
// http://localhost:3001/food?categoryId=

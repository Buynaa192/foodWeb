import { ChevronLeft } from "@/assets/chevronleft";
import { Card, CardContent } from "./ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import { ChevronRigth } from "@/assets/chevronrigth";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import axios from "axios";
type categoryType = {
  _id: string;
  categoryName: string;
};
type sellect = {
  setSellected: Dispatch<SetStateAction<string>>;
  sellected: string;
};
export const Menu = ({ setSellected, sellected }: sellect) => {
  const [category, setCategory] = useState<categoryType[]>([]);

  useEffect(() => {
    const getCategory = async () => {
      const response = await axios.get("http://localhost:3001/category");
      setCategory(response.data.categories);
    };
    getCategory();
  }, []);

  return (
    <div className="w-[1280px] h-45  flex flex-col justify-center items-center gap-9 bg-[#404040] ">
      <p className="font-bold text-[30px] flex justify-start w-[calc(100%-96px)] text-white">
        Categories
      </p>
      <div className=" w-[calc(100%-96px)] h-13 flex items-center">
        <div className="w-10 h-10 flex items-center justify-center">
          <ChevronLeft />
        </div>
        <div className=" w-full h-full overflow-scroll ">
          <div className="h-full min-w-350 flex gap-2  ">
            <div
              onClick={() => {
                setSellected("");
              }}
              className={
                sellected
                  ? "rounded-full  flex items-center justify-center   bg-white text-black p-5"
                  : "rounded-full  flex items-center justify-center   bg-red-500 text-white p-5"
              }
            >
              All Dishes
            </div>
            {category.map((item, index) => {
              return (
                <div
                  key={index}
                  onClick={() => setSellected(item._id)}
                  className={
                    sellected == item._id
                      ? "rounded-full  flex items-center justify-center   bg-red-500 text-white p-5"
                      : "rounded-full  flex items-center justify-center   bg-white text-black p-5"
                  }
                >
                  {item.categoryName}
                </div>
              );
            })}
          </div>
        </div>
        <div className="w-10 h-10 flex items-center justify-center">
          <ChevronRigth />
        </div>
      </div>
    </div>
  );
};
// className={
//   sellected == catid
//     ? "border-1 border-red-600  rounded-full h-9 flex gap-2 items-center justify-center p-4"
//     : "border-[#E4E4E7] rounded-full h-9 flex gap-2 items-center justify-center p-4 border-1"
// }

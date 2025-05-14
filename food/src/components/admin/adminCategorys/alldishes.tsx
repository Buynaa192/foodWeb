import axios from "axios";
import { useEffect, useState } from "react";
import { catType } from "../menu";
import { api } from "@/axios";
type handle = {
  handleClickAllDishes: () => void;
  sellected: string;
};
export const Alldishes = ({ handleClickAllDishes, sellected }: handle) => {
  const [food, setFood] = useState("");
  useEffect(() => {
    getFoods();
  }, [food.length]);
  const getFoods = async () => {
    const res = await api.get("/food");
    setFood(res.data);
  };
  return (
    <div
      className={
        sellected
          ? "border-[#E4E4E7] rounded-full h-9 flex gap-2 items-center justify-center p-4 border-1"
          : "border-1 border-red-600  rounded-full h-9 flex gap-2 items-center justify-center p-4"
      }
      onClick={handleClickAllDishes}
    >
      <p className="text-[14px]">All Dishes</p>
      <div className="bg-black text-white rounded-full">
        <p className="text-[12px] ml-[10px] mr-[10px]">{food.length}</p>
      </div>
    </div>
  );
};

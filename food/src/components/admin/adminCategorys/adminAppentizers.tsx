"use client";
import { useEffect, useState } from "react";
import { AdminFoodCard } from "../adminFoodCard";
import { categoryType } from "./adminCategoties";
import axios from "axios";
import { categoryName } from "../categoryBtn";
import { AddFood } from "./addFood";
import { catType } from "../menu";
type Foods = {
  price: number;
  ingredients: string;
  foodName: string;
  _id: string;
  category: { categoryName: string };
  image: string;
};
export const AdminAppentizers = ({ categoryName, _id }: catType) => {
  const [categoryFood, setCategoryFood] = useState<Foods[]>([]);
  const [count, setCount] = useState<number | null>(null);
  useEffect(() => {
    getcount();
    getCategoryFood();
  }, []);

  const getCategoryFood = async () => {
    const response = await axios.get(
      `http://localhost:3001/food?categoryId=${_id}`
    );
    setCategoryFood(response.data);
  };

  const getcount = async () => {
    const response = await axios.get(
      `http://localhost:3001/category/count?categoryId=${_id}`
    );
    setCount(response.data);
  };

  return (
    <div className="bg-white rounded-xl w-full  flex flex-col gap-4 p-5">
      <p className="font-bold text-[20px]">
        {categoryName} ({count})
      </p>
      <div className=" grid grid-cols-4 gap-4">
        <AddFood
          categoryName={categoryName}
          categoryId={_id}
          getFoods={getCategoryFood}
          count={getcount}
        />
        {categoryFood.map((item) => {
          return (
            <div key={item._id}>
              <AdminFoodCard
                getFoods={getCategoryFood}
                count={getcount}
                price={item.price}
                ingredients={item.ingredients}
                foodName={item.foodName}
                categoryName={item.category.categoryName}
                foodId={item._id}
                image={item.image}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

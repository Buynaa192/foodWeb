import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { FoodCard } from "./FoodCard";

import { api } from "@/axios";
export type foodType = {
  _id: string;
  foodName: string;
  price: number;

  ingredients: string;
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
type category = {
  id: string;
  categoryName: string;
  setCartItems: Dispatch<SetStateAction<food[]>>;
  cartItems: food[];
};
export const Appetizers = ({
  id,
  categoryName,
  setCartItems,
  cartItems,
}: category) => {
  const [food, setFood] = useState<foodType[]>([]);
  useEffect(() => {
    const getFoods = async () => {
      const response = await api.get(`/food?categoryId=${id}`);

      setFood(response.data);
    };
    getFoods();
  }, []);

  return (
    <>
      {food.length > 0 && (
        <div className="w-[1280px] min-h-[270px] flex flex-col gap-13 p-10">
          <p className="font-bold text-[30px] text-white w-[1280px]">
            {categoryName}
          </p>
          <div className="h-full grid grid-cols-3 gap-9">
            {food.slice(0, 6).map((item) => (
              <FoodCard
                key={item._id}
                foodName={item.foodName}
                price={item.price}
                _id={item._id}
                ingredients={item.ingredients}
                setCartItems={setCartItems}
                cartItems={cartItems}
                image={item.image}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
};

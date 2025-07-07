"use client";
import { Dispatch, SetStateAction } from "react";

type Food = {
  foodName: string;
  ingredients: string;
  price: number;
  id: string;
  setCartItems: Dispatch<SetStateAction<Food[]>>;
  quantity: number;
  image: string;
};
type local = {
  foodName: string;
  ingredients: string;
  price: number;
  id: string;
  quantity: number;
  image: string;
};

export const CartCard = ({
  foodName,
  ingredients,
  price,
  id,
  setCartItems,
  quantity,
  image,
}: Food) => {
  // Local storage-ээс мэдээллийг шинэчлэх функц
  const updateLocalStorage = (updatedCart: Food[]) => {
    localStorage.setItem("foods", JSON.stringify(updatedCart));
    setCartItems(updatedCart);
  };

  // Хоол устгах
  const deleteLocal = (idRemove: string) => {
    const stored = JSON.parse(localStorage.getItem("foods") || "[]");
    const updated = stored.filter((item: local) => item.id !== idRemove);
    updateLocalStorage(updated);
  };

  // Тоо хэмжээг нэмэх
  const increaseQuantity = () => {
    const stored = JSON.parse(localStorage.getItem("foods") || "[]");
    const updated = stored.map((item: Food) => {
      if (item.id === id) {
        return { ...item, quantity: item.quantity + 1 };
      }
      return item;
    });
    updateLocalStorage(updated);
  };

  const decreaseQuantity = () => {
    const stored = JSON.parse(localStorage.getItem("foods") || "[]");
    const updated = stored.map((item: Food) => {
      if (item.id === id && item.quantity > 1) {
        return { ...item, quantity: item.quantity - 1 };
      }
      return item;
    });
    updateLocalStorage(updated);
  };

  return (
    <div className="min-h-[130px] w-full items-center flex gap-[10px] border-b-1 border-dashed">
      <img className="w-22 h-30 rounded-xl" src={image} alt={foodName}></img>
      <div className="w-full h-full flex flex-col justify-between">
        <div className="w-full h-15 flex justify-between">
          <div className="w-40">
            <p className="text-red-500 font-bold">{foodName}</p>
            <p className="text-[12px]">{ingredients}</p>
          </div>
          <button
            onClick={() => deleteLocal(id)}
            className="h-9 w-9 border-1 border-red-500 text-red-500 flex items-center justify-center rounded-full"
          >
            x
          </button>
        </div>
        <div className="h-9 flex justify-between items-center">
          <div className="w-[105px] flex gap-3">
            <button onClick={decreaseQuantity}>-</button>
            <p className="text-[18px] font-bold">{quantity}</p>
            <button onClick={increaseQuantity}>+</button>
          </div>
          <p className="font-bold">${price}</p>
        </div>
      </div>
    </div>
  );
};

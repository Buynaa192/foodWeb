"use client";
import { Appetizers } from "@/components/Appetizers";
import { Bg } from "@/components/bg";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Menu } from "@/components/menu";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import axios from "axios";
import { categoryType } from "@/components/admin/adminCategorys/adminCategoties";
import { Loader2 } from "lucide-react";
import { api } from "@/axios";

type food = {
  foodName: string;
  ingredients: string;
  price: number;
  id: string;
  setCartItems: Dispatch<SetStateAction<food[]>>;
  quantity: number;
  image: string;
};
export default function Home() {
  const [category, setCategory] = useState<categoryType[]>([]);
  const [sellected, setSellected] = useState("");
  const [cartItems, setCartItems] = useState<food[]>([]);
  const [loading, setLoading] = useState(false);
  const [swtich, setSwitch] = useState(1);
  useEffect(() => {
    setLoading(true);
    const stored = JSON.parse(localStorage.getItem("foods") || "[]");
    setCartItems(stored);
  }, [swtich]);

  useEffect(() => {
    getCategory();
  }, []);

  const getCategory = async () => {
    try {
      setLoading(true);
      const response = await api.get("/category");
      setCategory(response.data.categories);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  const filteredCategory = category.filter((item) => {
    if (sellected == "") {
      return item;
    } else {
      return item._id == sellected;
    }
  });

  return (
    <div className="border-4 w-screen min-h-500 justify-center flex bg-[#232323]">
      <div className="w-[1440px] max-h-[5000px] ">
        <Header
          cartItems={cartItems}
          setCartItems={setCartItems}
          swtich={swtich}
          setSwitch={setSwitch}
        />
        <Bg />
        <div className="flex flex-col bg-[#404040] gap-[54px] items-center">
          <Menu setSellected={setSellected} sellected={sellected} />
          {filteredCategory.map((item) => {
            return (
              <div key={item._id}>
                <Appetizers
                  id={item._id}
                  categoryName={item.categoryName}
                  setCartItems={setCartItems}
                  cartItems={cartItems}
                />
              </div>
            );
          })}
          {loading ? <Loader2 size={40} className="animate-spin" /> : ""}
        </div>
        <Footer />
      </div>
    </div>
  );
}

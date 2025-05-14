"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CategoryBtn } from "../categoryBtn";
import axios from "axios";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { count } from "console";
import { toast } from "sonner";
import { Alldishes } from "./alldishes";
import { catType } from "../menu";
import { api } from "@/axios";
export type categoryType = {
  categoryName: string;
  _id: string;
};
type sellect = {
  setSellected: Dispatch<SetStateAction<string>>;
  sellected: string;
};
export const AdminCategories = ({ setSellected, sellected }: sellect) => {
  const [category, setCategory] = useState<categoryType[]>([]);
  const [newCategory, setNewCategory] = useState("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    getCategory();
  }, []);

  const getCategory = async () => {
    const response = await api.get("/category");
    setCategory(response.data.categories);
  };

  const addCategory = async () => {
    if (!newCategory.trim()) return;
    try {
      const res = await api.post<categoryType>("/category/post", {
        categoryName: newCategory,
      });

      setCategory([...category, res.data]);
      setNewCategory("");
      toast.success("New Category is being added to the menu");
      setOpen(false);
    } catch (error) {
      console.error("error adding category", error);
    }
  };
  const handleClickAllDishes = () => {
    setSellected("");
  };
  return (
    <div className=" w-full h-[calc(100%-76px)] flex flex-col gap-4 rounded-xl bg-white">
      <p className=" m-6 font-bold text-[20px] mb-0">Dishes category</p>
      <div className="m-6  h-21 mt-0 flex gap-3 bg-white flex-wrap ">
        <Alldishes
          handleClickAllDishes={handleClickAllDishes}
          sellected={sellected}
        />
        {category.map((item, index) => {
          return (
            <div key={index} onClick={() => setSellected(item._id)}>
              <CategoryBtn
                categoryName={item.categoryName}
                catid={item._id}
                sellected={sellected}
              />
            </div>
          );
        })}
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger>
            <p
              className="h-9 w-9 bg-red-500 rounded-full flex items-center justify-center text-white"
              onClick={() => setOpen(true)}
            >
              +
            </p>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add new category</DialogTitle>
            </DialogHeader>
            <div className=" w-103 h-38 ">
              <div className="m-6 flex flex-col gap-2 ">
                <p>Category name</p>
                <input
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  placeholder="Type category name..."
                  className="border-1 border-[#E4E4E7] w-full"
                ></input>
              </div>
              <div className=" h-16 flex items-end justify-end">
                <button
                  onClick={addCategory}
                  className="w-[123px] h-10 bg-black text-white rounded-md"
                >
                  Add category
                </button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};
// {genres.map(({ id, name }) => (
//   <Link key={id} href={`/genres?genre=${id}`}>
//     <Badge
//       variant={genre === id.toString() ? "default" : "outline"}
//       className="flex items-center gap-2"
//     >
//       {name}

//       <Baruun />
//     </Badge>
//   </Link>
// ))}

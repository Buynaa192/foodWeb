"use client";
import { DeleteBtn } from "@/assets/deleteBtn";
import { Edit } from "@/assets/edit";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import axios from "axios";
import { ChangeEvent, useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { catType } from "./menu";
import { Loader } from "lucide-react";
import { toast } from "sonner";
import { Toaster } from "../ui/sonner";
import { api } from "@/axios";

type foodType = {
  price: number;
  ingredients: string;
  foodName: string;
  categoryName: string;
  foodId: string;
  getFoods: () => Promise<void>;
  count: () => Promise<void>;
  image: string;
};
const UPLOAD_PRESENT = "foodWeb";
const CLOUD_NAME = "dhamxqczz";
export const AdminFoodCard = ({
  price,
  ingredients,
  foodName,
  categoryName,
  foodId,
  getFoods,
  count,
  image,
}: foodType) => {
  const [category, setCategory] = useState<catType[]>([]);
  const [open, setOpen] = useState(false);
  const [name, setName] = useState(foodName);
  const [une, setUne] = useState(price);
  const [orts, setOrts] = useState(ingredients);
  const [url, setUrl] = useState<File | undefined>();
  const [loading, setLoading] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>("");

  const uploadImage = async (
    file: File | undefined
  ): Promise<string | null> => {
    if (!file) return image;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", UPLOAD_PRESENT);

    try {
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response.data.url;
    } catch (error) {
      console.error("Image upload failed:", error);
      return null;
    }
  };

  useEffect(() => {
    const getCategory = async () => {
      const response = await api.get("/category");
      setCategory(response.data.categories);

      const matched = response.data.categories.find(
        (c: catType) => c.categoryName === categoryName
      );
      if (matched) {
        setSelectedCategoryId(matched._id); // Set initial ID
      }
    };
    getCategory();
  }, []);

  const deleteFood = async () => {
    try {
      setLoading(true);
      const res = await api.delete("/food/delete", {
        data: { foodName },
      });

      await getFoods();
      await count();
      toast.success("Dish successfully deleted.");
      setOpen(false);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const UpdateFood = async () => {
    const imageUrl = await uploadImage(url);
    if (!imageUrl) {
      toast.error("Failed to upload image.");
      return;
    }
    try {
      setLoading(true);
      const res = await api.put("/food/put", {
        id: foodId,
        newFoodName: name,
        newPrice: une,
        newIngredients: orts,
        newImage: imageUrl,
        newCategory: selectedCategoryId,
      });
      await count();
      await getFoods();
      toast.success("Dish successfully updated.");
      setOpen(false);
    } catch (error: any) {
      toast.error("failed");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-[270px] h-[241px] border-1 border-[#E4E4E7] rounded-[20px] flex flex-col gap-5">
      <div className="m-4 mb-0 h-[129px] flex justify-end items-end">
        <img
          className="h-[129px] w-[239px] absolute rounded-xl "
          defaultValue={image}
          src={image}
        ></img>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger className="z-10">
            <div
              onClick={() => setOpen(true)}
              className="bg-white h-9 w-9 rounded-full text-red-500 z-10 m-5 flex justify-center items-center"
            >
              <Edit />
            </div>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Dishes info</DialogTitle>
            </DialogHeader>
            <div className="h-125 w-[472px]  flex flex-col gap-3">
              <div className="">
                <div className="h-15  flex justify-between ">
                  <p className="text-[#71717A]">Dish name</p>
                  <input
                    onChange={(e) => setName(e.target.value)}
                    defaultValue={foodName}
                    className="m-3 w-[288px] border-1 border-[#E4E4E7] rounded-md"
                  ></input>
                </div>
                <div className="h-15  flex justify-between ">
                  <p className="text-[#71717A]">Dish category</p>
                  <div className="m-3 w-[288px]  border-1 border-[#E4E4E7] rounded-md">
                    <div className="bg-[#F4F4F5E5] h-5 w-[116px] rounded-full m-2 flex items-center pl-2.5">
                      <Select
                        onValueChange={(value) => {
                          setSelectedCategoryId(value);
                        }}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder={categoryName} />
                        </SelectTrigger>
                        <SelectContent className="bg-white">
                          <div className="w-[140px] h-[268px] flex flex-col bg-white">
                            <p className="bg-[#F4F4F5] m-2 rounded-full">
                              all category
                            </p>
                            {category.map((item) => (
                              <SelectItem
                                className="bg-[#F4F4F5] m-2 rounded-full"
                                key={item._id}
                                value={item._id}
                              >
                                {item.categoryName}
                              </SelectItem>
                            ))}
                          </div>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
                <div className="h-[104px]  flex justify-between ">
                  <p className="text-[#71717A]">Ingredients</p>
                  <input
                    onChange={(e) => setOrts(e.target.value)}
                    defaultValue={ingredients}
                    className="m-3 flex-wrap w-[288px] flex h-20 pb-10 border-1 border-[#E4E4E7] rounded-md "
                  ></input>
                </div>
                <div className="h-15  flex justify-between">
                  <p className="text-[#71717A]">price</p>
                  <input
                    type="number"
                    onChange={(e) => setUne(Number(e.target.value))}
                    defaultValue={price}
                    className="m-3 w-[288px] border-1 border-[#E4E4E7] rounded-md"
                  ></input>
                </div>
                <div className="h-[140px]  flex justify-between">
                  <p className="text-[#71717A]">image</p>
                  <div className="m-3 w-[288px]  rounded-md flex justify-end ">
                    <input
                      type="file"
                      onChange={(e) => setUrl(e.target.files?.[0])}
                      className=" w-9 h-9 border-1 border-[#E4E4E7] rounded-full absolute bg-white m-2 mt-4"
                    ></input>
                    {!url && (
                      <img
                        defaultValue={image}
                        src={image}
                        className="w-full  h-full mt-2  rounded-md "
                      ></img>
                    )}
                    {url && (
                      <img
                        defaultValue={image}
                        src={URL.createObjectURL(url)}
                        alt="Preview"
                        className="w-full  h-full mt-2  rounded-md "
                      />
                    )}
                  </div>
                </div>
              </div>
              <div className="h-16 flex items-end justify-between">
                <button
                  disabled={loading}
                  onClick={deleteFood}
                  className="flex justify-center items-center w-10 h-10 border-1 border-red-500 rounded-md"
                >
                  {loading ? (
                    <Loader size={16} className="animate-spin" />
                  ) : (
                    <DeleteBtn />
                  )}
                </button>
                <button
                  disabled={loading}
                  onClick={UpdateFood}
                  className="h-10 w-32 bg-black text-white flex justify-center items-center rounded-md"
                >
                  {loading ? (
                    <Loader size={16} className="animate-spin" />
                  ) : (
                    "Save changes"
                  )}
                </button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
      <div className="flex flex-col  m-4 mt-0 gap-2">
        <div className="flex justify-between ">
          <p className="text-[14px] text-red-500">{foodName}</p>
          <p className="text-[12px]">${price}</p>
        </div>
        <p className="text-[12px]">{ingredients}</p>
      </div>
    </div>
  );
};

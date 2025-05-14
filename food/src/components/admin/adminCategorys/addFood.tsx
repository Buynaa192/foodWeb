"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import axios from "axios";
import { Loader } from "lucide-react";
import { ChangeEvent, useState } from "react";
import { toast } from "sonner";

type Name = {
  categoryName: string;
  categoryId: string;
  getFoods: () => Promise<void>;
  count: () => Promise<void>;
};

type FoodType = {
  foodName: string;
  price: number;
  ingredients: string;
};

const UPLOAD_PRESENT = "foodWeb";
const CLOUD_NAME = "dhamxqczz";

export const AddFood = ({
  categoryName,
  categoryId,
  getFoods,
  count,
}: Name) => {
  const [foodName, setFoodName] = useState("");
  const [price, setPrice] = useState(0);
  const [orts, setOrts] = useState("");
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<File | undefined>();

  const uploadImage = async (
    file: File | undefined
  ): Promise<string | null> => {
    if (!file) return null;

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

  const onFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUploadedImage(event.target.files?.[0]);
  };

  const addFood = async () => {
    if (!foodName.trim() || !uploadedImage) {
      toast.error("Please fill in all fields and upload an image.");
      return;
    }

    try {
      setLoading(true);

      const imageUrl = await uploadImage(uploadedImage);
      if (!imageUrl) {
        toast.error("Failed to upload image.");
        return;
      }
      if (foodName && orts === "") {
        toast.error("orts food name buglugnu uu");
        return;
      }
      if (price == 0) {
        toast.error("unee oruulna uu");
        return;
      }

      await axios.post<FoodType>("http://localhost:3001/food/post", {
        foodName: foodName,
        price: price,
        ingredients: orts,
        image: imageUrl,
        category: categoryId,
      });

      await getFoods();
      await count();
      toast.success("New dish added to the menu!");
      setOpen(false);
    } catch (error) {
      console.error("Error adding food:", error);
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
      setFoodName("");
      setPrice(0);
      setOrts("");
      setUploadedImage(undefined);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <div
          onClick={() => setOpen(true)}
          className="w-[270px] h-[241px] border border-dashed border-red-500 rounded-[20px] flex flex-col gap-6 justify-center items-center"
        >
          <p className="h-9 w-9 bg-red-500 rounded-full flex items-center justify-center text-white">
            +
          </p>
          <p>Add new Dish to {categoryName}</p>
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add new Dish to {categoryName}</DialogTitle>
        </DialogHeader>
        <div className="w-full mt-6 flex flex-col gap-6">
          <div className="w-full flex gap-6">
            <div className="w-full">
              <p className="text-[14px] font-medium">Food name</p>
              <input
                value={foodName}
                placeholder="Type food name"
                onChange={(e) => setFoodName(e.target.value)}
                className="w-full border border-[#E4E4E7] rounded-md px-2 py-1"
              />
            </div>
            <div className="w-full">
              <p className="text-[14px] font-medium">Food price</p>
              <input
                type="number"
                // value={price}
                placeholder="Enter price..."
                onChange={(e) => setPrice(Number(e.target.value))}
                className="w-full border border-[#E4E4E7] rounded-md px-2 py-1"
              />
            </div>
          </div>

          <div className="w-full">
            <p className="font-medium text-[14px]">Ingredients</p>
            <input
              value={orts}
              placeholder="List ingredients..."
              onChange={(e) => setOrts(e.target.value)}
              className="w-full h-24 border border-[#E4E4E7] rounded-md px-2 py-1"
            />
          </div>

          <div className="w-full">
            <p className="font-medium text-[14px]">Food image</p>
            <input
              type="file"
              accept="image/*"
              onChange={onFileChange}
              className="w-full border border-dashed border-blue-300 bg-blue-100 rounded-md px-2 py-2"
            />
            {uploadedImage && (
              <img
                src={URL.createObjectURL(uploadedImage)}
                alt="Preview"
                className="w-32 h-32 mt-2 object-cover rounded-md"
              />
            )}
          </div>

          <div className="w-full flex justify-end">
            <button
              disabled={loading}
              onClick={addFood}
              className="rounded-md h-10 px-6 text-white bg-black flex justify-center items-center"
            >
              {loading ? (
                <Loader size={16} className="animate-spin" />
              ) : (
                "Add Dish"
              )}
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

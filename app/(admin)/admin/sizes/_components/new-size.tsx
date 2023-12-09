"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type initialState = {
  sizes: string[];
  categoryId: string;
};

const NewSize = () => {
  const router = useRouter();

  const [formData, setFormData] = useState<initialState>({
    categoryId: "",
    sizes: [],
  });

  const [availableCategories, setAvailableCategories] = useState([]);

  const addSize = () => {
    const newSize = prompt("Enter a size");

    if (newSize) {
      setFormData((prevData) => ({
        ...prevData,
        sizes: [...prevData.sizes, newSize],
      }));
    }
  };

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/sizes", {
        categoryId: formData.categoryId,
        sizes: formData.sizes,
      });
      toast.success("Sizes added for the category.");
      router.push("/admin/sizes");
    } catch (error) {
      console.error(error);
      toast.error("Error occurred.");
    }
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("/api/categories");
        setAvailableCategories(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <>
      <form onSubmit={submitHandler}>
        <div className="flex gap-4 max-md:flex-col">
          <div>
            <label htmlFor="category" className="font-semibold">
              Choose a Category
            </label>
            <select
              className="flex h-10 w-64 max-md:w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              name="category"
              id="category"
              value={formData.categoryId}
              onChange={(e) =>
                setFormData({ ...formData, categoryId: e.target.value })
              }
            >
              <option value="">Select a category</option>
              {availableCategories?.map((category: any) => (
                <option key={category.id} value={category.id}>
                  {category.category}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div>
          <label htmlFor="sizes" className="font-semibold">
            Sizes
          </label>
          <div className="flex gap-2">
            {formData.sizes.map((size, index) => (
              <div key={index}>{size}</div>
            ))}
            <button
              type="button"
              onClick={addSize}
              className="bg-blue-500 text-white p-2 rounded"
            >
              Add Size
            </button>
          </div>
        </div>
        <Button
          type="submit"
          className="mt-4 px-7 bg-green-600"
          variant="default"
        >
          Add Sizes
        </Button>
      </form>
    </>
  );
};

export default NewSize;

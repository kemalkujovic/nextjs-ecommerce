"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";

type initialState = {
  sizes: string[];
  categoryId: string;
  newSize: string;
};

const NewSize = () => {
  const router = useRouter();

  const [formData, setFormData] = useState<initialState>({
    categoryId: "",
    sizes: [],
    newSize: "",
  });

  const [errors, setErrors] = useState({
    sizes: "",
  });

  const [availableCategories, setAvailableCategories] = useState([]);

  const addSize = () => {
    if (formData.newSize.trim() !== "") {
      setFormData((prevData) => ({
        ...prevData,
        sizes: [...prevData.sizes, formData.newSize],
        newSize: "",
      }));
    }
  };

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({
      sizes: "",
    });

    if (formData.sizes.length < 1) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        sizes: formData.sizes.length < 2 ? "Must be at least 1 size" : "",
      }));

      return;
    }

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
      <form onSubmit={submitHandler} className="max-w-md">
        <div className="mb-4">
          <label htmlFor="category" className="block text-sm font-semibold">
            Choose a Category
          </label>
          <select
            className="w-full h-10 border rounded-md bg-background px-3 py-2 text-sm"
            name="category"
            id="category"
            required
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
        <div className="mb-4 ">
          <label htmlFor="sizes" className="block text-sm font-semibold">
            Sizes
          </label>
          <div className="flex gap-2">
            <div>
              <input
                type="text"
                placeholder="Enter a size"
                value={formData.newSize}
                onChange={(e) =>
                  setFormData({ ...formData, newSize: e.target.value })
                }
                className="w-full h-10 border rounded-md px-3"
              />
            </div>
            <div>
              <button
                type="button"
                onClick={addSize}
                className="bg-blue-500 text-white h-10 px-4 rounded"
              >
                Add Size
              </button>
            </div>
          </div>
          <div className="flex items-center flex-wrap mt-3 gap-2">
            {formData.sizes.map((size, index) => (
              <div key={index} className="bg-gray-200 p-2 rounded">
                {size}
              </div>
            ))}
          </div>
          {errors.sizes && <p className="text-red-500">{errors.sizes}</p>}
        </div>
        <Button type="submit" className="w-full bg-green-600">
          Add Sizes
        </Button>
      </form>
    </>
  );
};

export default NewSize;

"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

type initialState = {
  category: string;
  billboard: string;
};

const NewCategorie = () => {
  const router = useRouter();
  const paramas = useParams();
  const categoryId = paramas.categoryId as string;

  const initialState: initialState = {
    category: "",
    billboard: "",
  };

  const [errors, setErrors] = useState<initialState>({
    category: "",
    billboard: "",
  });

  const [formData, setFormData] = useState<initialState>(initialState);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (categoryId) {
      axios
        .get(`/api/categories/edit/${categoryId}`)
        .then((response) => {
          const categoryData = response.data;

          setFormData(categoryData);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [categoryId]);

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({
      category: "",
      billboard: "",
    });

    if (
      !formData.category ||
      formData.category.length < 2 ||
      !formData.billboard ||
      formData.billboard.length < 4
    ) {
      setIsLoading(false);
      setErrors((prevErrors) => ({
        ...prevErrors,
        category:
          formData.category.length < 2
            ? "Category must be at least 3 characters"
            : "",
        billboard:
          formData.billboard.length < 4
            ? "Billboard must be at least 4 characters"
            : "",
      }));

      return;
    }

    setIsLoading(true);
    try {
      if (categoryId) {
        const res = await axios.put(
          `/api/categories/edit/${categoryId}`,
          formData
        );
        setIsLoading(false);
        toast.success("Category succesfully edited.");
        router.push("/admin/categories");
      } else {
        const res = await axios.post("/api/categories", formData);
        setIsLoading(false);
        toast.success("Category created.");
        router.push("/admin/categories");
      }
    } catch (error) {
      console.log(error);
      toast.error("Error occurred.");
    }
  };

  return (
    <>
      <form onSubmit={submitHandler}>
        <div className="flex gap-4">
          <div>
            <label htmlFor="category" className="font-semibold">
              Name
            </label>
            <Input
              value={formData.category}
              type="text"
              name="category"
              size={30}
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
              }
            />
            {errors.category && (
              <p className="text-red-500">{errors.category}</p>
            )}
          </div>
          <div>
            <label htmlFor="category" className="font-semibold">
              Billboard
            </label>
            <Input
              type="text"
              name="category"
              value={formData.billboard}
              size={30}
              onChange={(e) =>
                setFormData({ ...formData, billboard: e.target.value })
              }
            />
            {errors.billboard && (
              <p className="text-red-500">{errors.billboard}</p>
            )}
          </div>
        </div>
        <Button
          disabled={isLoading}
          type="submit"
          className="mt-4 px-7 bg-green-600"
          variant="default"
        >
          {categoryId ? "Edit" : "Create"}
        </Button>
      </form>
    </>
  );
};

export default NewCategorie;

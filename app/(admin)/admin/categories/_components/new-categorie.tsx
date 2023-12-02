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

  const [formData, setFormData] = useState<initialState>(initialState);

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

    if (formData.category.length < 2 || formData.billboard.length < 2) {
      return;
    }

    try {
      if (categoryId) {
        const res = await axios.put(
          `/api/categories/edit/${categoryId}`,
          formData
        );
        toast.success("Category succesfully edited.");
        router.push("/admin/categories");
      } else {
        const res = await axios.post("/api/categories", formData);
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
          </div>
          <div>
            <label htmlFor="category" className="font-semibold">
              Bilboard
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
          </div>
        </div>
        <Button type="submit" className="mt-4 bg-green-600" variant="default">
          Create
        </Button>
      </form>
    </>
  );
};

export default NewCategorie;

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
  billboardId: string;
};

type Billboard = {
  id: string;
  billboard: string;
  imageURL: string;
};

const NewCategorie = () => {
  const router = useRouter();
  const paramas = useParams();
  const categoryId = paramas.categoryId as string;

  const initialState: initialState = {
    category: "",
    billboard: "",
    billboardId: "",
  };

  const [errors, setErrors] = useState<initialState>({
    category: "",
    billboard: "",
    billboardId: "",
  });

  const [formData, setFormData] = useState<initialState>(initialState);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [billboards, setBillboards] = useState<Billboard[]>([]);

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

  useEffect(() => {
    const fetchBillboards = async () => {
      try {
        const res = await axios.get("/api/billboards");
        const data = res.data;
        setBillboards(data);
      } catch (error) {
        console.log("Error getting categories", error);
      }
    };

    fetchBillboards();
  }, []);

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({
      category: "",
      billboard: "",
      billboardId: "",
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
      toast.error("Error occurred.");
    }
  };

  return (
    <>
      <form onSubmit={submitHandler}>
        <div className="flex gap-4 max-md:flex-col">
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
            <label htmlFor="billboard" className="font-semibold">
              Choose a billboard
            </label>
            <select
              className="flex h-10 w-64 max-md:w-full  rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              name="billboard"
              id="billboard"
              value={formData.billboard}
              required
              onChange={(e) =>
                setFormData({
                  ...formData,
                  billboard: e.target.value,
                  billboardId:
                    e.target.options[e.target.selectedIndex].getAttribute(
                      "data-billboard-id"
                    )!,
                })
              }
            >
              <option value="">Select a billboard</option>
              {billboards.length > 0 &&
                billboards?.map((board) => {
                  return (
                    <option
                      key={board.id}
                      value={board.billboard}
                      data-billboard-id={board.id}
                    >
                      {board.billboard}
                    </option>
                  );
                })}
              {errors.billboard && (
                <p className="text-red-500">{errors.billboard}</p>
              )}
            </select>
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

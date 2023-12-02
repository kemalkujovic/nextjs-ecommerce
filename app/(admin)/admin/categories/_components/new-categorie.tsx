"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

type initialState = {
  name: string;
  billboard: string;
};

const NewCategorie = () => {
  const initialState: initialState = {
    name: "",
    billboard: "",
  };

  const [formData, setFormData] = useState<initialState>(initialState);

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (formData.name.length < 2 || formData.billboard.length < 2) {
      return;
    }

    try {
      const res = await axios.post("/api/categories", formData);
      console.log(res);
      toast.success("Category created.");
    } catch (error) {
      console.log(error);
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
              value={formData.name}
              type="text"
              name="category"
              size={30}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
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

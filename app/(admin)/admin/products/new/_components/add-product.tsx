"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

const AddProduct = () => {
  const initialState = {
    title: "",
    description: "",
    price: "",
    category: "MAN",
    file: null,
  };

  const [dataForm, setDataForm] = useState(initialState);

  const handleFileChange = (e: any) => {
    const selectedFile = e.target.files[0];
    setDataForm((prevData) => ({ ...prevData, file: selectedFile || "" }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (
      !dataForm.title ||
      dataForm.title.length < 2 ||
      !dataForm.description ||
      dataForm.description.length < 2 ||
      !dataForm.price ||
      !dataForm.file ||
      !dataForm.category
    ) {
      console.log("Something went wrong");
      return;
    }

    const convPrice = +dataForm.price;

    const requestData = {
      title: dataForm.title,
      description: dataForm.description,
      price: convPrice,
      file: dataForm.file,
      featured: false,
      category: dataForm.category,
    };

    const formData = new FormData();

    formData.append("file", dataForm.file!);
    formData.append("requestData", JSON.stringify(requestData));

    try {
      const res = await axios.post("/api/product", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("Product created successfully");
      setDataForm(initialState);

      console.log(res);
    } catch (error) {
      toast.error("Something went wrong!");
      console.log(error);
    }
  };

  return (
    <div className="flex justify-center items-center mt-5  ">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-y-2 min-w-[700px] border p-4 "
      >
        <label htmlFor="name">Enter Product Name</label>
        <Input
          value={dataForm.title}
          type="text"
          id="name"
          name="name"
          required
          placeholder="Enter Product name"
          onChange={(e) => setDataForm({ ...dataForm, title: e.target.value })}
        />
        <label htmlFor="price">Enter Product Price</label>
        <Input
          value={dataForm.price}
          type="number"
          id="price"
          name="price"
          required
          placeholder="Enter Product price"
          onChange={(e) => setDataForm({ ...dataForm, price: e.target.value })}
        />
        <label htmlFor="description">Enter Product Description</label>
        <Input
          value={dataForm.description}
          type="text"
          id="description"
          name="description"
          required
          placeholder="Enter Product description"
          onChange={(e) =>
            setDataForm({ ...dataForm, description: e.target.value })
          }
        />
        <label htmlFor="category">Choose a category</label>
        <select
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          name="category"
          id="category"
          value={dataForm.category}
          onChange={(e) =>
            setDataForm({ ...dataForm, category: e.target.value })
          }
        >
          <option value="MAN">MAN</option>
          <option value="WOMEN">WOMEN</option>
        </select>
        <label htmlFor="image">Add Product Image</label>
        <Input
          type="file"
          id="image"
          name="image"
          required
          placeholder="Enter Product image"
          onChange={handleFileChange}
        />
        <Button className="mt-2 bg-green-600">Add Product</Button>
      </form>
    </div>
  );
};

export default AddProduct;

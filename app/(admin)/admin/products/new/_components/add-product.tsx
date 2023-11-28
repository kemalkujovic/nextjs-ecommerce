"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { useState } from "react";

const AddProduct = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [file, setFile] = useState(null);

  const handleFileChange = (e: any) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!title || !description || !price || !file) {
      console.log("Something went wrong");
    }

    const convPrice = +price;

    const requestData = {
      title,
      description,
      price: convPrice,
      file,
      featured: false,
    };

    try {
      const res = await axios.post("/api/product", requestData);
    } catch (error) {
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
          value={title}
          type="text"
          id="name"
          name="name"
          required
          placeholder="Enter Product name"
          onChange={(e) => setTitle(e.target.value)}
        />
        <label htmlFor="price">Enter Product Price</label>
        <Input
          value={price}
          type="number"
          id="price"
          name="price"
          required
          placeholder="Enter Product price"
          onChange={(e) => setPrice(e.target.value)}
        />
        <label htmlFor="description">Enter Product Description</label>
        <Input
          value={description}
          type="text"
          id="description"
          name="description"
          required
          placeholder="Enter Product description"
          onChange={(e) => setDescription(e.target.value)}
        />
        <label htmlFor="category">Choose a category</label>
        <select
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          name="category"
          id="category"
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

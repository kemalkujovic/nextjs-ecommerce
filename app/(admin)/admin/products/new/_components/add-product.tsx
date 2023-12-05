"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";

type Category = {
  id: string;
  name: string;
  billboard: string;
  category: string;
};

type initialState = {
  title: string;
  description: string;
  price: string;
  category: string;
  files: File[];
  isFeatured: boolean;
};

const AddProduct = () => {
  const initialState = {
    title: "",
    description: "",
    price: "",
    category: "MAN",
    files: [], // Promenjeno
    isFeatured: false,
  };

  const [category, setCategory] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [dataForm, setDataForm] = useState<initialState>(initialState);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]); // Dodato
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [errors, setErrors] = useState({
    title: "",
    description: "",
    price: "",
    files: "", // Promenjeno
    category: "",
  });

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const resCategory = await axios.get("/api/categories");
        const data = resCategory.data;
        setCategory(data);
      } catch (error) {
        console.log("Error getting categories", error);
      }
    };

    fetchCategories();
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files as FileList;
    setDataForm((prevData) => ({
      ...prevData,
      files: [...prevData.files, ...Array.from(selectedFiles)],
    }));

    if (selectedFiles.length > 0) {
      const imagePreviews: string[] = Array.from(selectedFiles).map(
        (file) => URL.createObjectURL(file) as string
      );
      setImagePreviews(imagePreviews);
    } else {
      setImagePreviews([]);
    }
  };
  const handleCheckboxChange = (isChecked: boolean) => {
    setDataForm((prevData) => ({ ...prevData, isFeatured: isChecked }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({
      title: "",
      description: "",
      price: "",
      files: "",
      category: "",
    });

    if (
      !dataForm.title ||
      dataForm.title.length < 4 ||
      !dataForm.description ||
      dataForm.description.length < 4 ||
      !dataForm.price ||
      dataForm.files.length === 0 ||
      !dataForm.category
    ) {
      setIsLoading(false);
      setErrors((prevErrors) => ({
        ...prevErrors,
        title:
          dataForm.title.length < 4
            ? "Title must be at least 4 characters"
            : "",
        description:
          dataForm.description.length < 4
            ? "Description must be at least 4 characters"
            : "",
        price: !dataForm.price ? "Please enter a price" : "",
        files:
          dataForm.files.length === 0 ? "Please select at least one file" : "",
        category: !dataForm.category ? "Please select a category" : "",
      }));

      return;
    }

    const convPrice = +dataForm.price;

    const requestData = {
      title: dataForm.title,
      description: dataForm.description,
      price: convPrice,
      files: dataForm.files,
      featured: dataForm.isFeatured,
      category: dataForm.category,
    };

    const formData = new FormData();

    Array.from(dataForm.files).forEach((file) => {
      formData.append("files", file);
    });

    formData.append("requestData", JSON.stringify(requestData));

    try {
      const res = await axios.post("/api/product", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("Product created successfully");

      setDataForm(initialState);
      setIsLoading(false);
      setImagePreviews([]); // Dodato
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (error) {
      setIsLoading(false);
      toast.error("Something went wrong!");
      console.log(error);
    }
  };

  return (
    <div className="flex justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-y-2 max-md:min-w-[90%] min-w-[70%] border p-4 "
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
        {errors.title && <p className="text-red-500">{errors.title}</p>}
        <label htmlFor="price">Enter Product Price</label>
        <Input
          value={dataForm.price}
          type="number"
          id="price"
          min={1}
          name="price"
          required
          placeholder="Enter Product price"
          onChange={(e) => setDataForm({ ...dataForm, price: e.target.value })}
        />
        {errors.price && <p className="text-red-500">{errors.price}</p>}
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
        {errors.description && (
          <p className="text-red-500">{errors.description}</p>
        )}
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
          {category.length > 0 &&
            category?.map((category) => {
              return (
                <option key={category.id} value={category.category}>
                  {category.category}
                </option>
              );
            })}
        </select>
        <div className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
          <div>
            <input
              type="checkbox"
              id="isFeatured"
              name="isFeatured"
              checked={dataForm.isFeatured}
              onChange={(e) => handleCheckboxChange(e.target.checked)}
            />
          </div>
          <div className="space-y-1 leading-none">
            <p className="font-semibold">Featured</p>
            <div>This product will appear on the home page</div>
          </div>
        </div>
        <label htmlFor="image">Add Product Image</label>
        <Input
          type="file"
          id="image"
          name="image"
          required
          onChange={handleFileChange}
          ref={fileInputRef}
          multiple
        />
        {errors.files && <p className="text-red-500">{errors.files}</p>}
        {imagePreviews.map((preview, index) => (
          <Image
            key={index}
            src={preview}
            alt={`Preview ${index}`}
            width={100}
            height={100}
            className="rounded-sm"
          />
        ))}
        <Button disabled={isLoading} className="mt-2 bg-green-600">
          Add Product
        </Button>
      </form>
    </div>
  );
};

export default AddProduct;

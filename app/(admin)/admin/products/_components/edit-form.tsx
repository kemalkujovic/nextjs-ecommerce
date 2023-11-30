import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useEffect, useState } from "react";
import { type createData } from "./edit-product";
import Image from "next/image";

type EditFormProps = {
  data: createData;
  onSubmit: (formData: FormData) => void;
};

const EditForm = ({ data, onSubmit }: EditFormProps) => {
  const { title, description, imageURL, category, price, featured } = data;
  const baseUrl = "https://kemal-web-storage.s3.eu-north-1.amazonaws.com";

  const initialState = {
    title,
    description,
    price,
    category,
    file: null,
    isFeatured: featured,
  };

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [checkbox, setCheckBox] = useState<boolean>(featured);
  const [previewImage, setPreviewImage] = useState<string | undefined>(
    `${baseUrl}/${imageURL}`
  );
  const [dataForm, setDataForm] = useState(initialState);

  const handleCheckboxChange = () => {
    setCheckBox((prevCheck) => !prevCheck);
  };

  useEffect(() => {
    setCheckBox(featured);
  }, [featured]);

  useEffect(() => {
    setPreviewImage(`${baseUrl}/${imageURL}`);
  }, [imageURL]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData(e.currentTarget);
    formData.append("isFeatured", checkbox.toString());

    await onSubmit(formData);

    setIsLoading(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-y-2 max-md:min-w-[90%] min-w-[70%] border p-4"
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
        min={1}
        name="price"
        required
        placeholder="Enter Product price"
        onChange={(e) => setDataForm({ ...dataForm, price: +e.target.value })}
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
        onChange={(e) => setDataForm({ ...dataForm, category: e.target.value })}
      >
        <option value="MAN">MAN</option>
        <option value="WOMEN">WOMEN</option>
      </select>
      <div className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
        <div>
          <input
            type="checkbox"
            id="isFeatured"
            name="isFeatured"
            checked={checkbox}
            onChange={handleCheckboxChange}
          />
        </div>
        <div className="space-y-1 leading-none">
          <p className="font-semibold">Featured</p>
          <div>This product will appear on the home page</div>
        </div>
      </div>
      <label htmlFor="image">Change Product Image</label>
      <Input type="file" id="image" name="image" onChange={handleImageChange} />
      {previewImage && (
        <Image
          src={previewImage}
          alt="Product Image"
          width={100}
          height={100}
          className="rounded-sm"
        />
      )}
      <Button disabled={isLoading} type="submit" className="mt-2 bg-green-600">
        Save Changes
      </Button>
    </form>
  );
};

export default EditForm;

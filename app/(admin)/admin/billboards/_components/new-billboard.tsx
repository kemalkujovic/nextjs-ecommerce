"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const NewBillboard = () => {
  const router = useRouter();
  const params = useParams();
  const { id } = params;

  const initialState = {
    billboard: "",
    file: null,
  };

  const [dataForm, setDataForm] = useState(initialState);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [errors, setErrors] = useState({
    billboard: "",
    image: "",
  });

  const baseUrl = "https://kemal-web-storage.s3.eu-north-1.amazonaws.com";

  const { data } = useQuery({
    queryKey: ["billboard"],
    queryFn: async () => {
      const { data } = await axios.get(`/api/billboards/edit/${id}`);
      if (id) setDataForm(data);
      return data;
    },
  });

  useEffect(() => {
    if (id) setImagePreview(`${baseUrl}/${data?.imageURL}`);
  }, [id, data?.imageURL]);

  const handleFileChange = (e: any) => {
    const selectedFile = e.target.files[0];
    setDataForm((prevData) => ({ ...prevData, file: selectedFile || "" }));

    if (selectedFile) {
      const imageUrl = URL.createObjectURL(selectedFile);
      setImagePreview(imageUrl);
    } else {
      setImagePreview(null);
    }
  };

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({
      billboard: "",
      image: "",
    });

    if (
      (!dataForm.file && !id) ||
      !dataForm.billboard ||
      dataForm.billboard.length < 3
    ) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        image: !dataForm.file && !id ? "File is required" : "",
        billboard:
          dataForm.billboard.length < 4
            ? "Billboard must be at least 4 characters"
            : "",
      }));
      return;
    }

    const formData = new FormData();
    formData.append("file", dataForm.file!);
    formData.append("billboard", JSON.stringify(dataForm.billboard));

    setIsLoading(true);
    try {
      if (id) {
        const res = await axios.put(`/api/billboards/edit/${id}`, formData);
        toast.success("Product edit successfully");
        router.push("/admin/billboards");
      } else {
        const res = await axios.post("/api/billboards", formData);
        setIsLoading(false);
        toast.success("Billboard created.");
        router.push("/admin/billboards");
      }
    } catch (error) {
      console.log(error);
      toast.error("Error occurred.");
    }
  };

  return (
    <>
      <form onSubmit={submitHandler}>
        <div className="flex gap-4 flex-col">
          <div className="flex gap-y-2 flex-col">
            <label htmlFor="file" className="font-semibold">
              Background Image
            </label>
            {imagePreview && (
              <Image
                src={imagePreview}
                alt="Preview"
                width={100}
                height={100}
                className="rounded-sm"
              />
            )}
            <Input
              type="file"
              id="file"
              name="file"
              onChange={handleFileChange}
              className="w-2/6 max-md:w-full"
            />
            {errors.image && <p className="text-red-500">{errors.image}</p>}
          </div>
          <div className="flex flex-col gap-y-2">
            <label htmlFor="bilboard" className="font-semibold">
              Bilboard
            </label>
            <Input
              type="text"
              name="bilboard"
              value={dataForm?.billboard}
              size={30}
              onChange={(e) =>
                setDataForm({ ...dataForm, billboard: e.target.value })
              }
              className="w-2/6 max-md:w-full"
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
          {id ? "Edit" : "Create"}
        </Button>
      </form>
    </>
  );
};

export default NewBillboard;

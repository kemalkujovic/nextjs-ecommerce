"use client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import EditForm from "./edit-form";
import Spinner from "@/components/Spinner";
import toast from "react-hot-toast";

export type createData = {
  title: string;
  description: string;
  price: number;
  id: string;
  imageURLs: string[];
  category: string;
  featured: boolean;
};
const EditProduct = () => {
  const params = useParams();
  const router = useRouter();

  const { productId } = params;

  const { data, isLoading } = useQuery({
    queryKey: ["product"],
    queryFn: async () => {
      const { data } = await axios.get(`/api/product/edit/${productId}`);
      return data as createData;
    },
  });
  if (isLoading || !data) {
    return (
      <div>
        <Spinner />
      </div>
    );
  }

  if (!data) {
    return <div>Product not found</div>;
  }

  const handleFormSubmit = async (formData: FormData) => {
    try {
      const res = await axios.put(`/api/product/edit/${productId}`, formData);

      toast.success("Product edit successfully");
      router.push("/admin/products");
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="flex justify-center items-center max-md:justify-start">
      <EditForm onSubmit={handleFormSubmit} data={data} />
    </div>
  );
};

export default EditProduct;

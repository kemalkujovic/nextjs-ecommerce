"use client";
import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import Spinner from "@/app/components/Spinner";
import Image from "next/image";
import toast from "react-hot-toast";
import Link from "next/link";

type createData = {
  title: string;
  description: string;
  price: number;
  id: string;
  imageURL: string;
  category: string;
};

export default function ProductTable() {
  const queryClient = useQueryClient();
  const baseUrl = "https://kemal-web-storage.s3.eu-north-1.amazonaws.com";

  const { error, data, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const { data } = await axios.get("/api/product");
      return data as createData[];
    },
  });

  const deleteTask = async (id: string) => {
    try {
      const res = await axios.delete(`/api/product/${id}`);
      queryClient.invalidateQueries({ queryKey: ["products"] });
      toast.success("Task deleted");
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  console.log(data);
  if (isLoading) {
    return <Spinner />;
  }

  if (error) {
    return <p>Something went wrong!</p>;
  }

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Image</TableCell>
            <TableCell>Name</TableCell>
            <TableCell align="center">Categories</TableCell>
            <TableCell align="center">Price</TableCell>
            <TableCell align="center">Description</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.map((product: createData) => (
            <TableRow
              key={product.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                <Image
                  src={`${baseUrl}/${product.imageURL}`}
                  alt="Product Image"
                  width={50}
                  height={50}
                />
              </TableCell>
              <TableCell align="left">{product.title}</TableCell>
              <TableCell align="center">{product.category}</TableCell>
              <TableCell align="center">${product.price}</TableCell>
              <TableCell align="center">{product.description}</TableCell>
              <TableCell align="right">
                <button>
                  <DeleteIcon
                    onClick={() => deleteTask(product.id)}
                    className="text-red-600"
                  />
                </button>
                <Link href={`/admin/products/${product.id}`}>
                  <EditIcon />
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

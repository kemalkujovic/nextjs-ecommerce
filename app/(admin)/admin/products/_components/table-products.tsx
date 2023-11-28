"use client";
import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Spinner from "@/app/components/Spinner";
import Image from "next/image";

type createData = {
  title: string;
  description: string;
  price: number;
  id: string;
  imageURL: string;
};

export default function ProductTable() {
  const baseUrl = "https://kemal-web-storage.s3.eu-north-1.amazonaws.com";
  const { error, data, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const { data } = await axios.get("/api/product");
      return data as createData[];
    },
  });
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
              <TableCell align="center">{product.price}</TableCell>
              <TableCell align="center">{product.description}</TableCell>
              <TableCell align="center">{product.id}</TableCell>
              <TableCell align="right">
                <button>
                  <DeleteIcon className="text-red-600" />
                </button>
                <button>
                  <EditIcon />
                </button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

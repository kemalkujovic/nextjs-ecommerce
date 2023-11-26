"use client";
import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import axios from "axios";
import { useEffect, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

type createData = {
  title: string;
  description: string;
  price: number;
  id: string;
};

export default function ProductTable() {
  const [products, setProducts] = useState<createData[] | []>([]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const data = await axios.get("/api/product");
        setProducts(data.data);
      } catch (error) {
        console.log(error);
      }
    };

    return () => {
      getProducts();
    };
  }, []);

  console.log(products);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Image</TableCell>
            <TableCell>Name</TableCell>
            <TableCell align="right">Categories</TableCell>
            <TableCell align="center">Price</TableCell>
            <TableCell align="center">Status</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products?.map((product: createData) => (
            <TableRow
              key={product.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {product.title}
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

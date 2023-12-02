"use client";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Link from "next/link";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import Spinner from "@/app/components/Spinner";
import TitleHeader from "@/app/(admin)/_components/title-header";
import formatDate from "@/app/utils/formateDate";

type Category = {
  id: string;
  name: string;
  billboard: string;
  category: string;
  createdAt: string;
};

const TableCategories = () => {
  const { error, data, isLoading } = useQuery({
    queryKey: ["category"],
    queryFn: async () => {
      const { data } = await axios.get("/api/categories");

      const sortedData = data.sort((a: Category, b: Category) => {
        return (
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      });
      return sortedData as Category[];
    },
  });

  if (isLoading) {
    return <Spinner />;
  }

  if (error) {
    return <p>Something went wrong!</p>;
  }

  return (
    <>
      <TitleHeader
        title="Categories"
        count={data?.length}
        description="Manage categories for your store"
        url="/admin/categories/new"
      />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>
                <p className="text-gray-700">Name</p>
              </TableCell>
              <TableCell>
                <p className="text-gray-700">Billboard</p>
              </TableCell>
              <TableCell align="center">
                <p className="text-gray-700">Date</p>
              </TableCell>
              <TableCell align="center">
                <p className="text-gray-700">Actions</p>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.map((category) => (
              <TableRow
                key={category.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {category.category}
                </TableCell>
                <TableCell align="left">{category.billboard}</TableCell>
                <TableCell align="center">
                  {formatDate(category.createdAt)}
                </TableCell>

                <TableCell align="center">
                  <button>
                    <DeleteIcon className="text-red-600" />
                  </button>
                  <Link href={`/admin/categories/edit/${category.id}`}>
                    <EditIcon />
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default TableCategories;

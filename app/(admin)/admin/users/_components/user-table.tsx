"use client";
import TitleHeader from "@/app/(admin)/_components/title-header";
import axios from "axios";
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
import Image from "next/image";
import Link from "next/link";
import formatDate from "@/app/utils/formateDate";
import Spinner from "@/app/components/Spinner";

const UserTable = () => {
  const { error, data, isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const { data } = await axios.get("/api/clerk/addAdmin");

      return data;
    },
  });

  if (isLoading) {
    return <Spinner />;
  }

  if (error) {
    return <p>Something went wrong!</p>;
  }

  console.log(data);

  return (
    <>
      <TitleHeader
        title="Manage user"
        description="Manage admin users"
        url="/admin/users/new"
      />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell width={5}>
                <p className="text-gray-700">Image</p>
              </TableCell>

              <TableCell>
                <p className="text-gray-700">Name</p>
              </TableCell>
              <TableCell align="center">
                <p className="text-gray-700">Role</p>
              </TableCell>
              <TableCell align="center">
                <p className="text-gray-700">Email</p>
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
            {data?.user?.map((user: any) => {
              const timestamp = user.createdAt;
              const date = new Date(timestamp);
              console.log(date);
              return (
                <TableRow
                  key={user.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    <Image
                      src={`${user?.imageUrl}`}
                      alt="Product Image"
                      className="border rounded-full"
                      width={60}
                      height={60}
                    />
                  </TableCell>
                  <TableCell align="left">
                    {user.username
                      ? user.username
                      : `${user?.firstName} ${user?.lastName}`}
                  </TableCell>
                  <TableCell align="center">
                    {user.unsafeMetadata.isAdmin ? "Admin" : "User"}
                  </TableCell>
                  <TableCell align="center">
                    {user.emailAddresses[0].emailAddress}
                  </TableCell>
                  <TableCell align="center">
                    <p>{formatDate(date.toString())}</p>
                  </TableCell>
                  <TableCell align="center">
                    <button>
                      <DeleteIcon className="text-red-600" />
                    </button>
                    <Link href={`/admin/users/edit`}>
                      <EditIcon />
                    </Link>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default UserTable;

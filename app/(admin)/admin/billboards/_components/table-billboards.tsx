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
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Spinner from "@/app/components/Spinner";
import TitleHeader from "@/app/(admin)/_components/title-header";
import formatDate from "@/app/utils/formateDate";
import ReactPaginate from "react-paginate";
import { useState } from "react";
import toast from "react-hot-toast";

type Billboards = {
  id: string;
  billboard: string;
  imageURL: string;
  createdAt: string;
};

const TableBillboards = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const productsPerPage = 5;
  const queryClient = useQueryClient();

  const { error, data, isLoading } = useQuery({
    queryKey: ["billboards"],
    queryFn: async () => {
      const { data } = await axios.get("/api/billboards");

      const sortedData = data.sort((a: Billboards, b: Billboards) => {
        return (
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      });
      return sortedData as Billboards[];
    },
  });

  const deleteTask = async (id: string) => {
    console.log(id);
    try {
      const res = await axios.delete(`/api/billboards/edit/${id}`);
      console.log(res);
      queryClient.invalidateQueries({ queryKey: ["billboards"] });
      toast.success("Billboards deleted");
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  const offset = currentPage * productsPerPage;
  const currentProducts = data?.slice(offset, offset + productsPerPage);

  const handlePageClick = (selectedPage: { selected: number }) => {
    setCurrentPage(selectedPage.selected);
  };

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
        title="Billboards"
        count={data?.length}
        description="Manage billboards for your store"
        url="/admin/billboards/new"
      />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
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
            {currentProducts?.map((billboard) => (
              <TableRow
                key={billboard.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {billboard.billboard}
                </TableCell>
                <TableCell align="center">
                  {formatDate(billboard.createdAt)}
                </TableCell>

                <TableCell align="center">
                  <button>
                    <DeleteIcon
                      className="text-red-600"
                      onClick={() => deleteTask(billboard.id)}
                    />
                  </button>
                  <Link href={`/admin/billboards/edit/${billboard.id}`}>
                    <EditIcon />
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {data && (
        <ReactPaginate
          previousLabel={"Previous"}
          nextLabel={"Next"}
          breakLabel={"..."}
          pageCount={Math.ceil(data?.length / productsPerPage)}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={handlePageClick}
          containerClassName={"pagination flex space-x-2 justify-end mt-4"}
          previousLinkClassName={"bg-neutral-800 px-4 py-2 rounded text-white"}
          nextLinkClassName={"bg-neutral-800 px-4 py-2 rounded text-white"}
          disabledClassName={"opacity-50 cursor-not-allowed"}
          activeClassName={"bg-blue-700"}
          pageClassName="hidden"
        />
      )}
    </>
  );
};

export default TableBillboards;

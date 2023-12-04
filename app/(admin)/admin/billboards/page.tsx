import React from "react";
import TitleHeader from "../../_components/title-header";
import TableBillboards from "./_components/table-billboards";

const BillboardsPage = () => {
  return (
    <div className="p-4 mt-2 w-3/4 max-md:w-full mx-auto">
      <TableBillboards />
    </div>
  );
};

export default BillboardsPage;

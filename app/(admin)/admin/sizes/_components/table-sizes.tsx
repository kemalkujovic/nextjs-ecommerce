import TitleHeader from "@/app/(admin)/_components/title-header";

const TableSizes = () => {
  return (
    <div>
      <TitleHeader
        title="Sizes"
        count={0}
        description="Manage sizes for store"
        url="/admin/sizes/new"
      />
    </div>
  );
};

export default TableSizes;

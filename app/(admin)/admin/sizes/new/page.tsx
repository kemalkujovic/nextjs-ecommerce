import TitleHeader from "@/app/(admin)/_components/title-header";
import NewSize from "../_components/new-size";

const NewSizePage = () => {
  return (
    <div className="p-4 mt-2 w-3/4 max-md:w-full mx-auto">
      <TitleHeader title="Create size" description="Add a new size" />
      <NewSize />
    </div>
  );
};

export default NewSizePage;

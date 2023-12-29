import Link from "next/link";

type TitleHeaderProps = {
  title: string;
  url: string;
};

const TitleHeader = ({ title, url }: TitleHeaderProps) => {
  return (
    <div className="flex justify-between items-center font-semibold px-4 py-6">
      <h1 className="font-semibold text-2xl">{title}</h1>
      <Link className="text-xl underline" href={url}>
        See All
      </Link>
    </div>
  );
};

export default TitleHeader;

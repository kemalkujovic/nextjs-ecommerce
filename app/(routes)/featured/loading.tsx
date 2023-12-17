import Skeleton from "@/components/ui/skeleton";

const Loading = () => {
  return (
    <div className="w-full h-full">
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <Skeleton className="aspect-square rounded-xl" />
        <Skeleton className="aspect-square rounded-xl" />
        <Skeleton className="aspect-square rounded-xl" />
        <Skeleton className="aspect-square rounded-xl" />
        <Skeleton className="aspect-square rounded-xl" />
        <Skeleton className="aspect-square rounded-xl" />
        <Skeleton className="aspect-square rounded-xl" />
        <Skeleton className="aspect-square rounded-xl" />
      </div>
    </div>
  );
};

export default Loading;

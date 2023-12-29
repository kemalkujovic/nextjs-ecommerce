import Skeleton from "@/components/ui/skeleton";

const LoadingSkeleton = () => {
  return (
    <div className="w-full h-full">
      <div className="grid grid-cols-1">
        <Skeleton className="aspect-square rounded-xl" />
      </div>
    </div>
  );
};

export default LoadingSkeleton;

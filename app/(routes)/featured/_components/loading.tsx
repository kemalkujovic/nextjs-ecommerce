import Container from "@/components/ui/container";
import Skeleton from "@/components/ui/skeleton";

const Loading = () => {
  return (
    <div className="w-full h-full p-8">
      <div className="lg:grid lg:grid-cols-5 lg:gap-x-8 mt-8 h-full">
        <div className="hidden lg:block">
          <Skeleton className="w-full h-[500px] rounded-xl" />
        </div>
        <div className="mt-6 lg:col-span-4 lg:mt-0">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <Skeleton className="aspect-square rounded-xl" />
            <Skeleton className="aspect-square rounded-xl" />
            <Skeleton className="aspect-square rounded-xl" />
            <Skeleton className="aspect-square rounded-xl" />
            <Skeleton className="aspect-square rounded-xl" />
            <Skeleton className="aspect-square rounded-xl" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loading;

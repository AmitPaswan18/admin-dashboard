import { Skeleton } from "@/components/ui/skeleton";

export default function SkeletonCard() {
  return (
    <div className="flex flex-col  w-screen h-screen justify-center space-y-3">
      <Skeleton className="h-[500px] w-[500px] rounded-xl" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[500px]" />
        <Skeleton className="h-4 w-[500px]" />
      </div>
    </div>
  );
}

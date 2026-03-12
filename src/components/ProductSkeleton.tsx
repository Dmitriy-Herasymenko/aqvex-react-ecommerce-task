export const ProductSkeleton = () => (
  <div className="w-full max-w-[347px] p-4 border border-gray-100 rounded-lg animate-pulse">
    <div className="w-full aspect-square bg-gray-200 rounded-md mb-4" />
    <div className="h-6 w-1/3 bg-gray-200 rounded mb-4" />
    <div className="h-4 w-full bg-gray-200 rounded mb-2" />
    <div className="h-4 w-2/3 bg-gray-200 rounded mb-6" />
    <div className="flex gap-2">
      <div className="h-10 flex-1 bg-gray-200 rounded" />
      <div className="h-10 w-12 bg-gray-200 rounded" />
    </div>
  </div>
);
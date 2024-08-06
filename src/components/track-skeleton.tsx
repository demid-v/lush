import Image from "next/image";

const TrackSkeleton = () => (
  <div className="flex h-12 w-full flex-col justify-center border-t border-gray-200 p-[5px] last:border-b">
    <div className="flex gap-2">
      <div className="relative aspect-square h-full overflow-hidden">
        <Image
          src="/assets/logos/logo32.png"
          alt="Galaxy - Lush logo"
          width={32}
          height={32}
          className="absolute bottom-0 left-0 right-0 top-0 m-auto w-4/5"
        />
      </div>
      <div className="flex flex-grow animate-pulse gap-24">
        <div className="flex-grow">
          <div className="mb-1.5 h-4 w-2/5 rounded-md bg-gray-300"></div>
          <div className="h-3 w-32 rounded-md bg-gray-300"></div>
        </div>
        <div className="flex gap-1">
          <div className="h-3 w-24 rounded-md bg-gray-300"></div>
          <div className="h-3 w-24 rounded-md bg-gray-300"></div>
        </div>
      </div>
    </div>
  </div>
);

export default TrackSkeleton;

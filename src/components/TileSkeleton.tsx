import Image from "next/image";

const TileSkeleton = ({ image }: { image: string }) => {
  return (
    <li>
      <div>
        <div className="relative mb-3 pb-[100%]">
          <Image
            src={image}
            alt=""
            width={256}
            height={256}
            className="absolute bottom-0 left-0 right-0 top-0 m-auto w-[45%]"
          />
        </div>
        <div className="mb-3 h-3 w-32 animate-pulse rounded-md bg-gray-300"></div>
      </div>
    </li>
  );
};

export default TileSkeleton;

import { type FC } from "react";
import Image from "next/image";

const FaultTolerantImage: FC<{
  image: {
    url: string | undefined;
    alt: string;
    width: number;
    height: number;
  };
  defaultImage: {
    url: string;
    alt?: string;
    width?: number;
    height?: number;
    w: string;
  };
}> = ({ image }) => {
  return (
    <>
      {image.url && (
        <Image
          src={image.url}
          alt={image.alt}
          width={image.width}
          height={image.height}
          className={"absolute h-full w-full object-cover"}
        />
      )}
    </>
  );
};

export default FaultTolerantImage;

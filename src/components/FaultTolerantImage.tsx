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
}> = ({ image, defaultImage }) => {
  return (
    <>
      {image.url !== undefined ? (
        <Image
          src={image.url}
          alt={image.alt}
          width={image.width}
          height={image.height}
          className={"absolute h-full w-full object-cover"}
        />
      ) : (
        <Image
          src={defaultImage.url}
          alt={defaultImage.alt ?? ""}
          width={defaultImage.width ?? image.width}
          height={defaultImage.width ?? image.width}
          className={
            "absolute bottom-0 left-0 right-0 top-0 m-auto " + defaultImage.w
          }
        />
      )}
    </>
  );
};

export default FaultTolerantImage;

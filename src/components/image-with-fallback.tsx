"use client";

import Image from "next/image";
import type { ImageProps } from "next/image";
import { useState } from "react";
import { cn } from "~/lib/utils";

const ImageWithFallback = ({
  src,
  alt,
  width,
  height,
  defaultImageSrc,
  defaultImageStyle,
}: Pick<ImageProps, "alt" | "width" | "height"> & {
  src: ImageProps["src"] | undefined;
  defaultImageSrc: string;
  defaultImageStyle: string;
}) => {
  const [isFallback, setIsFallback] = useState(false);

  return (
    <>
      {src && !isFallback ? (
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          className="absolute h-full w-full object-cover"
          onError={() => setIsFallback(true)}
        />
      ) : (
        <Image
          src={defaultImageSrc}
          alt=""
          width={width}
          height={height}
          className={cn(
            "absolute bottom-0 left-0 right-0 top-0 m-auto",
            defaultImageStyle,
          )}
        />
      )}
    </>
  );
};

export default ImageWithFallback;

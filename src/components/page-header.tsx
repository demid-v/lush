"use client";

import Image from "next/image";
import { useLayoutEffect, useState } from "react";
import { DOMAIN_MID_PATH } from "~/utils/globals";
import { useTheme } from "~/utils/hooks";
import type { AttachedImage } from "~/utils/types";

const PageHeader = ({
  name,
  image,
}: {
  name?: string | undefined;
  image?: AttachedImage | null | undefined;
}) => {
  const { theme, setColor } = useTheme();

  const [imageLoaded, setImageLoaded] = useState(false);

  const { r = 255, g = 255, b = 255 } = image ?? {};

  const imageUrl =
    image &&
    image.domain.name + "/" + DOMAIN_MID_PATH[image.domain.id] + image.image_id;

  useLayoutEffect(() => {
    setColor(r, g, b);

    return () => setColor(255, 255, 255);
  }, [r, g, b, setColor]);

  return (
    <div className="relative mb-10 h-[25rem]">
      <title>{name}</title>
      {imageUrl && (
        <Image
          src={imageUrl}
          alt={"Image of " + name}
          unoptimized={true}
          width={1920}
          height={400}
          className="h-full w-full object-cover object-[0%_25%]"
          onLoad={() => setImageLoaded(true)}
        />
      )}
      <div
        className="absolute right-0 top-0 h-full w-full"
        style={{
          background: `linear-gradient(rgba(${r}, ${g}, ${b}, 1), rgba(${r}, ${g}, ${b}, ${
            imageLoaded ? "0" : "1"
          }))`,
        }}
      ></div>

      <div className="absolute top-14 w-full">
        <div className="mx-auto box-content max-w-[95rem] px-20">
          <div className="w-1/2">
            <div
              className={
                "mb-7 text-[2.5rem] font-bold" +
                (theme === "dark" ? " text-white" : "")
              }
            >
              {name}
            </div>
          </div>
          <button className="h-10 w-44 border border-gray-400 bg-white">
            <div className="flex justify-center">
              <Image
                src="/assets/play.svg"
                alt="Play tracks"
                width={54}
                height={54}
                className="mr-2.5 w-3.5"
              />
              <div className="text-xs font-bold uppercase tracking-wider">
                Play tracks
              </div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PageHeader;

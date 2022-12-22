import Link from "next/link";
import type { FC } from "react";
import { constructLink } from "../utils/functions";
import Image from "next/image";
import type { AttachedImage } from "../utils/trpc";
import { DOMAIN_MID_PATH } from "../utils/globals";

const Tile: FC<{
  data: {
    id: number;
    dir: "artists" | "albums" | "playlists";
    name: string | null;
    image: AttachedImage | undefined;
    fallbackImage: string;
  };
}> = ({ data: { id, dir, name, image, fallbackImage } }) => {
  const imageUrl = image
    ? image.domain.name +
      "/" +
      DOMAIN_MID_PATH[image.domain.id] +
      image.image_id
    : fallbackImage;

  return (
    <li>
      <div>
        <Link
          href={`/${dir}/${id}+${constructLink(name || "")}`}
          className="mb-4 block"
        >
          <div className="relative pb-[100%]">
            <Image
              src={imageUrl}
              alt={"Image of " + name}
              width={200}
              height={200}
              className={
                "absolute" +
                (image
                  ? " h-full w-full object-cover"
                  : " top-0 right-0 bottom-0 left-0 m-auto w-[45%]")
              }
            />
          </div>
        </Link>
        <div className="font-medium">{name}</div>
      </div>
    </li>
  );
};

export default Tile;

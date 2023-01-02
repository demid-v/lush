import Link from "next/link";
import { type FC, useState } from "react";
import { constructLink } from "../utils/functions";
import Image from "next/image";
import type { AttachedImage } from "../utils/trpc";
import { DOMAIN_MID_PATH } from "../utils/globals";

const Tile: FC<{
  data: {
    id: number;
    domain: "artists" | "albums" | "playlists";
    name: string | null;
    image: AttachedImage | undefined;
    fallbackImage: string;
  };
}> = ({ data: { id, domain, name, image, fallbackImage } }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  const imageUrl =
    image &&
    image.domain.name + "/" + DOMAIN_MID_PATH[image.domain.id] + image.image_id;

  return (
    <li>
      <div>
        <Link
          href={`/${domain}/${id}+${constructLink(name || "")}`}
          className="mb-3 block"
        >
          <div className="relative pb-[100%]">
            {imageUrl && (
              <Image
                src={imageUrl}
                alt={"Image of " + name}
                width={200}
                height={200}
                className={
                  "absolute h-full w-full object-cover" +
                  (!imageLoaded ? " invisible" : "")
                }
                onLoad={() => setImageLoaded(true)}
              />
            )}
            <Image
              src={fallbackImage}
              alt="Music note"
              width={200}
              height={200}
              className={
                "absolute top-0 right-0 bottom-0 left-0 m-auto w-[45%]" +
                (imageLoaded ? " invisible" : "")
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

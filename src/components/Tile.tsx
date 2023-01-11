import Link from "next/link";
import type { FC } from "react";
import { encode } from "../utils/functions";
import type { AttachedImage } from "../utils/trpc";
import { DOMAIN_MID_PATH } from "../utils/globals";
import FaultTolerantImage from "./FaultTolerantImage";

const Tile: FC<{
  data: {
    id: number;
    domain: "artists" | "albums" | "playlists";
    name: string | null;
    image: AttachedImage | undefined;
    defaultImage: string;
  };
}> = ({ data: { id, domain, name, image, defaultImage } }) => {
  const imageUrl =
    image &&
    image.domain.name + "/" + DOMAIN_MID_PATH[image.domain.id] + image.image_id;

  return (
    <li>
      <div>
        <Link
          href={`/${domain}/${id}+${encode(name || "")}`}
          className="mb-3 block"
        >
          <div className="relative pb-[100%]">
            <FaultTolerantImage
              image={{
                url: imageUrl,
                alt: "Image of " + name,
                width: 256,
                height: 256,
              }}
              defaultImage={{
                url: defaultImage,
                alt: "Music note",
                w: "w-[45%]",
              }}
            />
          </div>
        </Link>
        <div className="font-medium">{name}</div>
      </div>
    </li>
  );
};

export default Tile;

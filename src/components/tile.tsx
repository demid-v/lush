import { DOMAIN_MID_PATH } from "../utils/globals";
import type { AttachedImage } from "../utils/types";
import FaultTolerantImage from "./fault-tolerant-image";
import Link from "next/link";
import type { ForwardedRef } from "react";
import { forwardRef } from "react";

const Tile = forwardRef(
  (
    {
      data: { id, domain, name, image, defaultImage },
    }: {
      data: {
        id: number;
        domain: "artists" | "albums" | "playlists";
        name: string | null;
        image: AttachedImage | undefined;
        defaultImage: string;
      };
    },
    ref: ForwardedRef<HTMLLIElement>,
  ) => {
    const tileName = name ?? "";
    const imageUrl =
      image &&
      image.domain.name +
        "/" +
        DOMAIN_MID_PATH[image.domain.id] +
        image.image_id;

    return (
      <li ref={ref}>
        <div>
          <Link
            href={`/${domain}/${id}+${tileName}`}
            aria-label={tileName}
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
                  w: "w-[45%]",
                }}
              />
            </div>
          </Link>
          <div className="font-medium">{name}</div>
        </div>
      </li>
    );
  },
);

Tile.displayName = "Tile";

export default Tile;

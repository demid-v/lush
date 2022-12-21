import Link from "next/link";
import type { FC } from "react";
import { constructLink } from "../utils/functions";
import Image from "next/image";

const Tile: FC<{
  data: {
    id: number;
    dir: "artists" | "albums" | "playlists";
    name: string | null;
    imageUrl: string;
  };
}> = ({ data: { id, dir, name, imageUrl } }) => (
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
              (imageUrl.split("/")[1] === "assets"
                ? " top-0 right-0 bottom-0 left-0 m-auto w-[45%]"
                : " h-full w-full object-cover")
            }
          />
        </div>
      </Link>
      <div className="font-medium">{name}</div>
    </div>
  </li>
);

export default Tile;

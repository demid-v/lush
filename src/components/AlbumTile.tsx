import type { AlbumData } from "../utils/trpc";
import type { FC } from "react";
import { DOMAIN_MID_PATH } from "../utils/globals";
import Tile from "./Tile";

const AlbumTile: FC<{ album: AlbumData }> = ({
  album: { id, title, album_image_rel: images },
}) => {
  const image = images[0]?.album_image;

  const imageUrl = image
    ? "https://lastfm.freetls.fastly.net/" +
      DOMAIN_MID_PATH[image.domain_id] +
      image.image_id
    : "/assets/vynil.svg";

  return <Tile data={{ id, dir: "albums", name: title, imageUrl }} />;
};

export default AlbumTile;

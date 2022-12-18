import type { ArtistData } from "../utils/trpc";
import type { FC } from "react";
import { DOMAIN_MID_PATH } from "../utils/globals";
import Tile from "./Tile";

const ArtistTile: FC<{ artist: ArtistData }> = ({
  artist: { id, name, artist_image_rel: images },
}) => {
  const image = images[0]?.artist_image;

  const imageUrl = image
    ? image.domain.name +
      "/" +
      DOMAIN_MID_PATH[image.domain.id] +
      image.image_id
    : "/assets/note.svg";

  return <Tile data={{ id, dir: "artists", name, imageUrl }} />;
};

export default ArtistTile;

import type { PlaylistData } from "../utils/trpc";
import type { FC } from "react";
import { DOMAIN_MID_PATH } from "../utils/globals";
import Tile from "./Tile";

const PlaylistTile: FC<{ playlist: PlaylistData }> = ({
  playlist: { id, name, playlist_image_rel: images },
}) => {
  const image = images[0]?.playlist_image;

  const imageUrl = image
    ? "https://lastfm.freetls.fastly.net/" +
      DOMAIN_MID_PATH[image.domain_id] +
      image.image_id
    : "/assets/playlist.png";

  return <Tile data={{ id, dir: "playlists", name, imageUrl }} />;
};

export default PlaylistTile;

import type { AlbumData } from "../utils/trpc";
import { type FC, useEffect, useState } from "react";
import { DOMAIN_MID_PATH } from "../utils/globals";
import Tile from "./Tile";

const AlbumTile: FC<{ album: AlbumData }> = ({
  album: { id, title, album_image_rel: images },
}) => {
  const artistImage = images[0]?.album_image;

  const [artistImageUrl, setArtistImageUrl] = useState("");

  function constructImageUrl() {
    if (artistImage) {
      const { domain_id, image_id } = artistImage;

      setArtistImageUrl(
        "https://lastfm.freetls.fastly.net/" +
          DOMAIN_MID_PATH[domain_id] +
          image_id
      );
    }
  }

  useEffect(constructImageUrl, [artistImage]);

  return <Tile data={{ id, name: title, imageUrl: artistImageUrl }} />;
};

export default AlbumTile;

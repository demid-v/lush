import type { ArtistData } from "../utils/trpc";
import { type FC, useEffect, useState } from "react";
import { DOMAIN_MID_PATH } from "../utils/globals";
import Tile from "./Tile";

const ArtistTile: FC<{ artist: ArtistData }> = ({ artist }) => {
  const { id, name, artist_image_rel: images } = artist;
  const artistImage = images[0]?.artist_image;

  const [artistImageUrl, setArtistImageUrl] = useState("");

  function constructImageUrl() {
    if (artistImage) {
      const { domain, image_id } = artistImage;

      setArtistImageUrl(
        domain.name + "/" + DOMAIN_MID_PATH[domain.id] + image_id
      );
    }
  }

  useEffect(constructImageUrl, [artistImage]);

  return <Tile data={{ id, name, imageUrl: artistImageUrl }} />;
};

export default ArtistTile;

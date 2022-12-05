import React, { useState } from "react";
import Container from "./Container";
import { useRouter } from "next/router";
import { type ArtistsData, trpc } from "../utils/trpc";
import Artist from "./ArtistTile";

function Artists() {
  const limit = 120;
  const [offset, setOffset] = useState(0);

  const [artists, setArtists] = useState<ArtistsData>([]);

  const { q } = useRouter().query;

  const artistsResponse = trpc.artists.getArtists.useQuery(
    {
      ...(q && { search: typeof q === "object" ? q.join("") : q }),
      limit,
      offset,
    },
    { refetchOnWindowFocus: false }
  );

  return (
    <Container
      limit={limit}
      offset={offset}
      setOffset={setOffset}
      content={artistsResponse.data?.artists}
      setContent={setArtists}
    >
      <ul className="grid grid-cols-grid gap-x-6 gap-y-10">
        {artists.map((artist) => (
          <Artist key={artist.id} artist={artist} />
        ))}
      </ul>
    </Container>
  );
}

export default Artists;

import React, { useEffect, useRef, useState } from "react";
import Container from "./Container";
import { useRouter } from "next/router";
import { type ArtistsData, trpc } from "../utils/trpc";
import Artist from "./ArtistTile";

function Artists() {
  const limit = 120;
  const [offset, setOffset] = useState(0);

  const isContentLoading = useRef(false);

  const [artists, setArtists] = useState<ArtistsData>([]);

  const { q } = useRouter().query;

  useEffect(() => {
    setOffset(0);
  }, [q, setOffset]);

  const artistsResponse = trpc.artists.getArtists.useQuery(
    {
      ...(q && { search: typeof q === "object" ? q.join("") : q }),
      limit,
      offset,
    },
    { refetchOnWindowFocus: false }
  );

  useEffect(() => {
    if (!artistsResponse.data) {
      return;
    }

    if (offset === 0) {
      setArtists(artistsResponse.data.artists);
    } else if (offset > 0) {
      setArtists((prevContent) => [
        ...prevContent,
        ...artistsResponse.data.artists,
      ]);
    }

    isContentLoading.current = false;
  }, [offset, artistsResponse.data]);

  return (
    <Container
      limit={limit}
      setOffset={setOffset}
      isContentLoading={isContentLoading}
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

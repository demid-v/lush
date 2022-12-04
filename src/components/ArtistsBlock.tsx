import React, { useRef } from "react";
import Container from "./Container";
import { useRouter } from "next/router";
import { trpc } from "../utils/trpc";
import Artist from "./ArtistTile";

function Artists() {
  const limit = 120;
  const offset = useRef(0);

  const router = useRouter();
  const { q } = router.query;

  const artistsResponse = trpc.artists.getArtists.useQuery(
    {
      ...(q && { search: typeof q === "object" ? q.join("") : q }),
      limit,
      offset: offset.current,
    },
    { refetchOnWindowFocus: false }
  );

  function updateOnScroll() {
    offset.current += limit;
    artistsResponse.refetch();
  }

  return (
    <Container updateData={updateOnScroll}>
      {artistsResponse.data ? (
        <ul className="grid grid-cols-grid gap-x-6 gap-y-10">
          {artistsResponse.data.artists.map((artist) => (
            <Artist key={artist.id} artist={artist} />
          ))}
        </ul>
      ) : (
        "Fetching artists..."
      )}
    </Container>
  );
}

export default Artists;

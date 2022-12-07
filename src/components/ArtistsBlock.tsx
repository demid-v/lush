import { useEffect, useRef, useState } from "react";
import Container from "./Container";
import { useRouter } from "next/router";
import { type ArtistsData, trpc } from "../utils/trpc";
import Artist from "./ArtistTile";

function Artists() {
  const limit = 120;
  const offset = useRef(0);

  const [artists, setArtists] = useState<ArtistsData>([]);

  const [bottomHit, setBottomHit] = useState(false);

  const { q } = useRouter().query;

  useEffect(() => {
    offset.current = 0;
  }, [q]);

  const artistsResponse = trpc.artists.getArtists.useQuery(
    {
      ...(q && { search: typeof q === "object" ? q.join("") : q }),
      limit,
      offset: offset.current,
    },
    { refetchOnWindowFocus: false }
  );

  useEffect(() => {
    if (!artistsResponse.data) {
      return;
    }

    if (offset.current === 0) {
      setArtists(artistsResponse.data.artists);
    } else if (offset.current > 0) {
      setArtists((prevContent) => [
        ...prevContent,
        ...artistsResponse.data.artists,
      ]);
    }

    setBottomHit(false);
  }, [artistsResponse.data]);

  return (
    <Container
      limit={limit}
      offset={offset}
      bottomHit={bottomHit}
      setBottomHit={setBottomHit}
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

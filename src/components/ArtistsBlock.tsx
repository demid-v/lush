import { useEffect, useState } from "react";
import Container from "./Container";
import { useRouter } from "next/router";
import { type ArtistsData, trpc } from "../utils/trpc";
import Artist from "./ArtistTile";
import { usePositionObserver } from "../utils/hooks";

function Artists() {
  const limit = 120;
  const [offset, setOffset] = useState(0);

  const { q } = useRouter().query;

  useEffect(() => {
    setOffset(0);
  }, [q]);

  const [artists, setArtists] = useState<ArtistsData>([]);

  const { isLoading, data } = trpc.artists.getArtists.useQuery(
    {
      ...(q && { search: Array.isArray(q) ? q.join("") : q }),
      limit,
      offset,
    },
    { refetchOnWindowFocus: false }
  );

  useEffect(() => {
    if (!data) {
      return;
    }

    if (offset === 0) {
      setArtists(data.artists);
    } else if (offset > 0) {
      setArtists((prevArtists) => [...prevArtists, ...data.artists]);
    }
  }, [data, offset]);

  usePositionObserver(limit, isLoading, offset, setOffset);

  return (
    <Container>
      <ul className="grid grid-cols-grid gap-x-6 gap-y-10">
        {artists.map((artist) => (
          <Artist key={artist.id} artist={artist} />
        ))}
      </ul>
    </Container>
  );
}

export default Artists;

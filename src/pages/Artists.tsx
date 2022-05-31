import { useState, useEffect, useRef } from "react";
import Container from "../components/Container";
import { transformArtists } from "../utils/functions";
import { TGroupedArtist } from "../utils/types";
import { useSearchParams } from "react-router-dom";
import Artist from "../components/ArtistTile";

function Artists() {
  const limit = 100;
  const offset = useRef(0);

  const [artists, setTracks] = useState<TGroupedArtist[]>([]);

  const [searchParams] = useSearchParams();
  const [query, setQuery] = useState("");

  useEffect(
    () => setQuery(searchParams.get("q") || ""),
    [searchParams.get("q")]
  );

  const [bottomHit, setBottomHit] = useState(false);

  let abortController: AbortController | null = null;

  async function getArtists() {
    abortController = new AbortController();

    const response = await fetch(
      `http://localhost:5500/artists?limit=${limit}&offset=${offset.current}&search=${query}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        signal: abortController.signal,
      }
    );
    const data = await response.json();

    const artistsGrouped = transformArtists(data.artists[0]);

    return artistsGrouped;
  }

  async function updateArtists() {
    const tracksGrouped = await getArtists();

    if (offset.current === 0) {
      setTracks(tracksGrouped);
    } else {
      setTracks((tracks) => [...tracks, ...tracksGrouped]);
    }

    setBottomHit(false);
  }

  function incrementOffset() {
    offset.current += limit;
  }

  function updateArtistsOnScroll() {
    incrementOffset();
    updateArtists();
  }

  function updateArtistsOnQueryChange() {
    setTracks([]);
    offset.current = 0;
    updateArtists();
  }

  useEffect(updateArtistsOnQueryChange, [query]);

  return (
    <Container
      layout="grid"
      bottomHit={bottomHit}
      setBottomHit={setBottomHit}
      updateData={updateArtistsOnScroll}
      abortController={abortController}
    >
      {artists?.map((artist) => (
        <Artist key={artist.id} artist={artist} />
      ))}
    </Container>
  );
}

export default Artists;

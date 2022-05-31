import { useState, useEffect, useRef } from "react";
import Track from "../components/Track";
import Container from "../components/Container";
import { transformTracks } from "../utils/functions";
import { TGroupedTrack } from "../utils/types";
import { useSearchParams } from "react-router-dom";

function Music() {
  const limit = 100;
  const offset = useRef(0);

  const [tracks, setTracks] = useState<TGroupedTrack[]>([]);

  const [searchParams] = useSearchParams();
  const [query, setQuery] = useState("");

  useEffect(
    () => setQuery(searchParams.get("q") || ""),
    [searchParams.get("q")]
  );

  const [bottomHit, setBottomHit] = useState(false);

  let abortController: AbortController | null = null;

  async function getTracks() {
    abortController = new AbortController();

    const response = await fetch(
      `http://localhost:5500/tracks?limit=${limit}&offset=${offset.current}&search=${query}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        signal: abortController.signal,
      }
    );
    const data = await response.json();

    const tracksGrouped = transformTracks(data.tracks[0]);

    return tracksGrouped;
  }

  async function updateTracks() {
    const tracksGrouped = await getTracks();

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

  function updateTracksOnScroll() {
    incrementOffset();
    updateTracks();
  }

  function updateTracksOnQueryChange() {
    setTracks([]);
    offset.current = 0;
    updateTracks();
  }

  useEffect(updateTracksOnQueryChange, [query]);

  return (
    <Container
      layout="flex"
      bottomHit={bottomHit}
      setBottomHit={setBottomHit}
      updateData={updateTracksOnScroll}
      abortController={abortController}
    >
      {tracks?.map((track) => (
        <Track key={track.id} track={track} />
      ))}
    </Container>
  );
}

export default Music;

import { useState, useEffect } from "react";
import Track from "../components/Track";
import Container from "../components/Container";
import { transformTracks } from "../utils/functions";
import { TGroupedTrack } from "../utils/types";
import { useSearchParams } from "react-router-dom";

function Music() {
  const limit = 100;
  const [offset, setOffset] = useState(0);

  const [tracks, setTracks] = useState<TGroupedTrack[]>([]);

  const [searchParams] = useSearchParams();

  let abortController = new AbortController();

  async function getTracks() {
    setHitBottom(false);

    abortController = new AbortController();

    const response = await fetch("http://localhost:5500/audiosData", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        limit,
        offset,
      }),
      signal: abortController.signal,
    });
    const data = await response.json();
    const tracksGrouped = transformTracks(data.audios[0]);

    setTracks([...tracks, ...tracksGrouped]);
  }

  useEffect(() => {
    getTracks();
  }, [offset]);

  const [hitBottom, setHitBottom] = useState(false);

  function incrementOffset() {
    setOffset(offset + limit);
  }

  function refetch() {
    tracks.splice(0);
    setOffset(0);
  }

  useEffect(refetch, [searchParams.get("q")]);

  return (
    <Container
      layout="flex"
      hitBottom={hitBottom}
      setHitBottom={setHitBottom}
      onBottomHit={incrementOffset}
      abortController={abortController}
    >
      {tracks?.map((track) => (
        <Track key={track.id} track={track} />
      ))}
    </Container>
  );
}

export default Music;

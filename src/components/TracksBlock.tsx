import { useState, useEffect, useRef } from "react";
import Track from "./Track";
import Container from "./Container";
import { stringifyParams, transformTracks } from "../utils/functions";
import { TGroupedTrack } from "../utils/types";
import { useSearchParams } from "react-router-dom";

function TracksBlock({
  playableTracks,
  currentTrack,
  setCurrentTrack,
  queryParams,
}: {
  playableTracks: number[];
  currentTrack?: number;
  setCurrentTrack: Function;
  queryParams?: { [key: string]: string | undefined };
}) {
  const limit = 100;
  const offset = useRef(0);

  const [tracks, setTracks] = useState<TGroupedTrack[]>([]);

  const [searchParams] = useSearchParams();
  const [query, setQuery] = useState<string>();

  useEffect(
    () => setQuery(searchParams.get("q") || ""),
    [searchParams.get("q")]
  );

  const [bottomHit, setBottomHit] = useState(false);

  let abortController: AbortController | null = null;

  async function getTracks(signal?: AbortSignal) {
    const params =
      queryParams != null ? "&" + stringifyParams(queryParams, "&", "=") : "";

    const response = await fetch(
      `http://localhost:5500/tracks?limit=${limit}&offset=${offset.current}&search=${query}${params}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        signal,
      }
    );
    const data = await response.json();

    const tracksGrouped = transformTracks(data.tracks);

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

  function updateTracksOnScroll() {
    offset.current += limit;
    updateTracks();
  }

  function updateTracksOnQueryChange() {
    setTracks([]);
    offset.current = 0;
    updateTracks();
  }

  useEffect(() => {
    if (query != null) {
      updateTracksOnQueryChange();
    }
  }, [query]);

  return (
    <Container
      layout="flex"
      bottomHit={bottomHit}
      setBottomHit={setBottomHit}
      updateData={updateTracksOnScroll}
      abortController={abortController}
    >
      {tracks?.map((track) => {
        if (track.youtube_video_id != null) {
          playableTracks.push(track.id);
        }

        return (
          <Track
            key={track.id}
            track={track}
            currentTrack={currentTrack}
            setCurrentTrack={setCurrentTrack}
          />
        );
      })}
    </Container>
  );
}

export default TracksBlock;

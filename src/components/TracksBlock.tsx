import { useEffect, useRef, useState } from "react";
import Track from "./Track";
import Container from "./Container";
import { useRouter } from "next/router";
import { type TracksData, trpc } from "../utils/trpc";
import Tracks, { useTracks } from "../contexts/Tracks";

const TracksBlock = () => {
  const limit = 100;
  const [offset, setOffset] = useState(0);

  const isContentLoading = useRef(false);

  const { setGlobalTracks, globalPlayableTracks, activeTrack, setActiveTrack } =
    useTracks();

  const [tracks, setTracks] = useState<TracksData>([]);

  const { q } = useRouter().query;

  useEffect(() => {
    setOffset(0);
  }, [q, setOffset]);

  const tracksResponse = trpc.tracks.getTracks.useQuery(
    {
      ...(q && { search: typeof q === "object" ? q.join("") : q }),
      limit,
      offset,
    },
    { refetchOnWindowFocus: false }
  );

  useEffect(() => {
    if (!tracksResponse.data) {
      return;
    }

    if (offset === 0) {
      setTracks(tracksResponse.data.tracks);
    } else if (offset > 0) {
      setTracks((prevContent) => [
        ...prevContent,
        ...tracksResponse.data.tracks,
      ]);
    }

    isContentLoading.current = false;
  }, [offset, tracksResponse.data]);

  function setGlobalTracksHandler() {
    if (tracksResponse.data !== undefined) {
      setGlobalTracks(tracksResponse.data.tracks);
    }
  }

  return (
    <Container
      limit={limit}
      setOffset={setOffset}
      isContentLoading={isContentLoading}
    >
      <ul>
        {tracks.map((track) => (
          <Track
            key={track.id}
            track={track}
            activeTrack={activeTrack}
            setActiveTrack={setActiveTrack}
            setGlobalTracks={setGlobalTracksHandler}
            globalPlayableTracks={globalPlayableTracks}
          />
        ))}
      </ul>
    </Container>
  );
};

const TracksBlockWithContext = () => (
  <Tracks>
    <TracksBlock></TracksBlock>
  </Tracks>
);

export default TracksBlockWithContext;

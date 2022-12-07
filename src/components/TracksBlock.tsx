import { useEffect, useRef, useState } from "react";
import Track from "./Track";
import Container from "./Container";
import { useRouter } from "next/router";
import { type TracksData, trpc } from "../utils/trpc";
import Tracks, { useTracks } from "../contexts/Tracks";

const TracksBlock = () => {
  const limit = 100;
  const offset = useRef(0);

  const { setGlobalTracks, globalPlayableTracks, activeTrack, setActiveTrack } =
    useTracks();

  const [tracks, setTracks] = useState<TracksData>([]);

  const [bottomHit, setBottomHit] = useState(false);

  const { q } = useRouter().query;

  useEffect(() => {
    offset.current = 0;
  }, [q]);

  const tracksResponse = trpc.tracks.getTracks.useQuery(
    {
      ...(q && { search: typeof q === "object" ? q.join("") : q }),
      limit,
      offset: offset.current,
    },
    { refetchOnWindowFocus: false }
  );

  useEffect(() => {
    if (!tracksResponse.data) {
      return;
    }

    if (offset.current === 0) {
      setTracks(tracksResponse.data.tracks);
    } else if (offset.current > 0) {
      setTracks((prevContent) => [
        ...prevContent,
        ...tracksResponse.data.tracks,
      ]);
    }

    setBottomHit(false);
  }, [tracksResponse.data]);

  function setGlobalTracksHandler() {
    if (tracksResponse.data !== undefined) {
      setGlobalTracks(tracksResponse.data.tracks);
    }
  }

  return (
    <Container
      limit={limit}
      offset={offset}
      bottomHit={bottomHit}
      setBottomHit={setBottomHit}
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

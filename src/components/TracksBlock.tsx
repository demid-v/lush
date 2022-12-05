import { useState } from "react";
import Track from "./Track";
import Container from "./Container";
import { useRouter } from "next/router";
import { type TracksData, trpc } from "../utils/trpc";
import Tracks, { useTracks } from "../contexts/Tracks";

const TracksBlock = () => {
  const limit = 100;
  const [offset, setOffset] = useState(0);

  const { setGlobalTracks, globalPlayableTracks, activeTrack, setActiveTrack } =
    useTracks();

  const [tracks, setTracks] = useState<TracksData>([]);

  const { q } = useRouter().query;

  const tracksResponse = trpc.tracks.getTracks.useQuery(
    {
      ...(q && { search: typeof q === "object" ? q.join("") : q }),
      limit,
      offset,
    },
    { refetchOnWindowFocus: false }
  );

  function setGlobalTracksHandler() {
    if (tracksResponse.data !== undefined) {
      setGlobalTracks(tracksResponse.data.tracks);
    }
  }

  return (
    <Container
      limit={limit}
      offset={offset}
      setOffset={setOffset}
      content={tracksResponse.data?.tracks}
      setContent={setTracks}
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

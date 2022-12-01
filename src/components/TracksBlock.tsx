import React, { useState, useRef } from "react";
import Track from "./Track";
import Container from "./Container";
import { useRouter } from "next/router";
import { trpc } from "../utils/trpc";
import Tracks, { useTracks } from "../contexts/Tracks";

const TracksBlock = () => {
  const limit = 10;
  const offset = useRef(0);

  const { setGlobalTracks, globalPlayableTracks, activeTrack, setActiveTrack } =
    useTracks();

  const router = useRouter();
  const { q } = router.query;

  const [bottomHit, setBottomHit] = useState(false);

  const tracksResponse = trpc.tracks.getTracks.useQuery(
    {
      ...(q && { search: typeof q === "object" ? q.join("") : q }),
      limit,
      offset: offset.current,
    },
    { refetchOnWindowFocus: false }
  );

  function updateTracksOnScroll() {
    offset.current += limit;
    tracksResponse.refetch();
  }

  function setGlobalTracksHandler() {
    if (tracksResponse.data !== undefined) {
      setGlobalTracks(tracksResponse.data.tracks);
    }
  }

  return (
    <Container
      bottomHit={bottomHit}
      setBottomHit={setBottomHit}
      updateData={updateTracksOnScroll}
    >
      {tracksResponse.data
        ? tracksResponse.data.tracks.map((track) => (
            <Track
              key={track.id}
              track={track}
              activeTrack={activeTrack}
              setActiveTrack={setActiveTrack}
              setGlobalTracks={setGlobalTracksHandler}
              globalPlayableTracks={globalPlayableTracks}
            />
          ))
        : "Fetching tracks..."}
    </Container>
  );
};

const TracksBlockWithContext = () => (
  <Tracks>
    <TracksBlock></TracksBlock>
  </Tracks>
);

export default TracksBlockWithContext;

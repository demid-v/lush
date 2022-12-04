import React, { useState, useEffect } from "react";
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

  useEffect(() => {
    setOffset(0);
  }, [q]);

  useEffect(() => {
    if (tracksResponse.data) {
      if (offset === 0) {
        setTracks(tracksResponse.data.tracks);
      } else if (offset > 0) {
        setTracks((tracks) => [...tracks, ...tracksResponse.data.tracks]);
      }
    }
  }, [offset, tracksResponse.data]);

  function updateTracksOnScroll() {
    setOffset((offset) => offset + limit);
  }

  function setGlobalTracksHandler() {
    if (tracksResponse.data !== undefined) {
      setGlobalTracks(tracksResponse.data.tracks);
    }
  }

  return (
    <Container updateData={updateTracksOnScroll}>
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

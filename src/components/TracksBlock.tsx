import { useEffect, useState } from "react";
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
  }, [offset, tracksResponse.data]);

  function setGlobalTracksHandler() {
    if (tracksResponse.data !== undefined) {
      setGlobalTracks(tracksResponse.data.tracks);
    }
  }

  useEffect(() => {
    function checkPosition() {
      if (
        !tracksResponse.isFetching &&
        window.innerHeight + window.scrollY >= document.body.offsetHeight
      ) {
        setOffset((offset) => offset + limit);
      }
    }

    document.addEventListener("scroll", checkPosition);

    return () => {
      document.removeEventListener("scroll", checkPosition);
    };
  }, [tracksResponse.isFetching]);

  return (
    <Container>
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

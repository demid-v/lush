import { useEffect, useState } from "react";
import Track from "./Track";
import ContainerLayout from "../layouts/ContainerLayout";
import { useRouter } from "next/router";
import { type TracksData, trpc } from "../utils/trpc";
import { useTracks } from "../contexts/Tracks";
import { usePositionObserver } from "../utils/hooks";

const TracksBlock = () => {
  const limit = 100;
  const [offset, setOffset] = useState(0);

  const { activeTrack, setActiveTrack } = useTracks();

  useEffect(() => console.log(activeTrack), [activeTrack]);

  const [tracks, setTracks] = useState<TracksData>([]);

  const { q } = useRouter().query;

  useEffect(() => {
    setOffset(0);
  }, [q]);

  const { isLoading, data } = trpc.tracks.getTracks.useQuery(
    {
      ...(q && { search: Array.isArray(q) ? q.join("") : q }),
      limit,
      offset,
    },
    { refetchOnWindowFocus: false }
  );

  useEffect(() => {
    if (!data) {
      return;
    }

    if (offset === 0) {
      setTracks(data.tracks);
    } else if (offset > 0) {
      setTracks((prevTracks) => [...prevTracks, ...data.tracks]);
    }
  }, [data, offset]);

  usePositionObserver(isLoading, limit, offset, setOffset);

  return (
    <ContainerLayout>
      <ul>
        {tracks.map((track) => (
          <Track
            key={track.id}
            track={track}
            activeTrack={activeTrack}
            setActiveTrack={setActiveTrack}
          />
        ))}
      </ul>
    </ContainerLayout>
  );
};

export default TracksBlock;

import type { FC } from "react";
import Track from "./Track";
import ContainerLayout from "../layouts/ContainerLayout";
import type { TracksData } from "../utils/types";
import { trpc } from "../utils/trpc";
import { useTracks } from "../contexts/Tracks";
import { useContent } from "../utils/hooks";

const TracksBlock: FC<{
  params?:
    | { artistId: number | undefined }
    | { albumId: number | undefined }
    | { playlistId: number | undefined };
}> = ({ params }) => {
  const { setActiveTrack, setGlobalTracks } = useTracks();

  const tracks = useContent(trpc.tracks.getTracks, 100, params) as TracksData;

  function handlePlayableTrackClick(id: number, youtube_video_id: string) {
    setGlobalTracks(tracks);
    setActiveTrack({ id, youtube_video_id });
  }

  return (
    <ContainerLayout>
      <ul>
        {tracks.map((track) => (
          <Track
            key={track.id}
            track={track}
            handlePlayableTrackClick={handlePlayableTrackClick}
          />
        ))}
      </ul>
    </ContainerLayout>
  );
};

export default TracksBlock;

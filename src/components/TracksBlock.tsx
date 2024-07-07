import { useMemo, type FC } from "react";
import Track from "./Track";
import ContainerLayout from "../layouts/ContainerLayout";
import { trpc } from "../utils/trpc";
import { useTracks } from "../contexts/Tracks";
import { useRouter } from "next/router";
import { joinParam } from "../utils";

const TracksBlock: FC<{
  params?:
    | { artistId: number | undefined }
    | { albumId: number | undefined }
    | { playlistId: number | undefined };
}> = ({ params }) => {
  const { setActiveTrack, setGlobalTracks, setShownTracks } = useTracks();

  const { q } = useRouter().query;
  const search = joinParam(q);

  const { isLoading, data: tracksData } =
    trpc.tracks.getTracks.useInfiniteQuery(
      { ...params, search },

      { getNextPageParam: (lastPage) => lastPage.nextCursor }
    );

  const tracks = useMemo(
    () => tracksData?.pages.flatMap((page) => page.tracks) ?? [],
    [tracksData?.pages]
  );

  function handlePlayableTrackClick(id: number, youtube_video_id: string) {
    setGlobalTracks(tracks);
    setActiveTrack({ id, youtube_video_id });
  }

  setShownTracks(tracks);

  return (
    <ContainerLayout contentLength={tracks.length} isLoading={isLoading}>
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

"use client";

import { useMemo } from "react";
import Track from "./track";
import { useTracks } from "../contexts/tracks";
import { useSearchParams } from "next/navigation";
import { api } from "~/trpc/react";

const TracksClient = ({
  params,
}: {
  params?:
    | { artistId: number | undefined }
    | { albumId: number | undefined }
    | { playlistId: number | undefined };
}) => {
  const { setActiveTrack, setGlobalTracks } = useTracks();

  const searchParams = useSearchParams();
  const queryParam = searchParams?.get("q")?.toString();

  const { data: tracksData } = api.track.page.useInfiniteQuery(
    { search: queryParam, limit: 120, ...params },
    { getNextPageParam: (lastPage) => lastPage.nextCursor },
  );

  const tracks = useMemo(
    () => tracksData?.pages.flatMap((page) => page.tracks) ?? [],
    [tracksData?.pages],
  );

  function handlePlayableTrackClick(id: number, youtube_video_id: string) {
    setGlobalTracks(tracks);
    setActiveTrack({ id, youtube_video_id });
  }

  return (
    <ul>
      {tracks.map((track) => (
        <Track
          key={track.id}
          track={track}
          handlePlayableTrackClick={handlePlayableTrackClick}
        />
      ))}
    </ul>
  );
};

export default TracksClient;

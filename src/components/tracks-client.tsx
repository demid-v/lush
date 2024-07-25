"use client";

import { useMemo } from "react";
import Track from "./track";
import { useTracks } from "../contexts/tracks";
import { useSearchParams } from "next/navigation";
import { api } from "~/trpc/react";
import { useInView } from "react-intersection-observer";

const tracksLimit = 100;

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
  const q = searchParams?.get("q")?.toString();

  const {
    data: tracksData,
    fetchNextPage,
    isFetching,
    hasNextPage,
  } = api.track.page.useInfiniteQuery(
    { ...params, search: q, limit: tracksLimit },
    {
      getNextPageParam: (lastPage) =>
        lastPage.tracks.length === tracksLimit
          ? lastPage.nextCursor
          : undefined,
    },
  );

  const tracks = useMemo(
    () => tracksData?.pages.flatMap((page) => page.tracks) ?? [],
    [tracksData?.pages],
  );

  const { ref: trackRef } = useInView({
    triggerOnce: true,
    onChange(inView) {
      if (!inView || isFetching || !hasNextPage) return;

      void fetchNextPage();
    },
  });

  const shouldObserve = (index: number) =>
    tracksData?.pages.at(-1)?.tracks.length === tracksLimit &&
    index === tracks.length - 1;

  function handlePlayableTrackClick(id: number, youtube_video_id: string) {
    setGlobalTracks(tracks);
    setActiveTrack({ id, youtube_video_id });
  }

  return (
    <ul>
      {tracks.map((track, index) => (
        <Track
          key={track.id}
          ref={shouldObserve(index) ? trackRef : null}
          track={track}
          handlePlayableTrackClick={handlePlayableTrackClick}
        />
      ))}
    </ul>
  );
};

export default TracksClient;

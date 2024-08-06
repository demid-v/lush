"use client";

import { useEffect, useMemo } from "react";
import Track from "./track";
import { useSearchParams } from "next/navigation";
import { api } from "~/trpc/react";
import { useInView } from "react-intersection-observer";
import { useTracksStore } from "~/utils/state";

const TracksClient = ({
  params,
}: {
  params?:
    | { artistId: number | undefined }
    | { albumId: number | undefined }
    | { playlistId: number | undefined };
}) => {
  const searchParams = useSearchParams();
  const q = searchParams?.get("q")?.toString();

  const {
    data: tracksData,
    isFetching,
    hasNextPage,
    fetchNextPage,
  } = api.track.page.useInfiniteQuery(
    { ...params, search: q, limit: 100 },
    { getNextPageParam: (lastPage) => lastPage.nextCursor },
  );

  const tracks = useMemo(
    () => tracksData?.pages.flatMap((page) => page.tracks) ?? [],
    [tracksData?.pages],
  );

  const setPlayableTracks = useTracksStore((store) => store.setPlayableTracks);

  useEffect(() => {
    const playableTracks = tracks.reduce<string[]>(
      (acc, track) =>
        track.youtube_video_id ? [...acc, track.youtube_video_id] : acc,
      [],
    );

    setPlayableTracks(playableTracks);
  }, [tracks, setPlayableTracks]);

  const { ref: trackRef } = useInView({
    triggerOnce: true,
    onChange(inView) {
      if (!inView || isFetching || !hasNextPage) return;

      void fetchNextPage();
    },
  });

  return (
    <ul>
      {tracks.map((track, index) => (
        <Track
          key={track.id}
          ref={index === tracks.length - 1 ? trackRef : null}
          track={track}
        />
      ))}
    </ul>
  );
};

export default TracksClient;

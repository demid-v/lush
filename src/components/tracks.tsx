import TrackSkeleton from "./track-skeleton";
import TracksClient from "./tracks-client";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { createSSRHelper } from "~/trpc/helpers";

const tracksLimit = 100;

const TracksPrefetcher = async ({
  searchParams,
  params,
}: {
  searchParams?: Record<string, string | string[] | undefined>;
  params?:
    | { artistId: number | undefined }
    | { albumId: number | undefined }
    | { playlistId: number | undefined };
}) => {
  const { q } = searchParams ?? {};
  if (Array.isArray(q)) return notFound();

  const helpers = createSSRHelper();

  await helpers.track.page.prefetchInfinite({
    ...params,
    search: q,
    limit: tracksLimit,
  });

  return (
    <HydrationBoundary state={dehydrate(helpers.queryClient)}>
      <Suspense>
        <TracksClient params={params} />
      </Suspense>
    </HydrationBoundary>
  );
};

const TracksFallback = () => (
  <>
    {new Array(tracksLimit).fill(0).map((_item, index) => (
      <TrackSkeleton key={index} />
    ))}
  </>
);

const Tracks = ({
  params,
}: {
  params?:
    | { artistId: number | undefined }
    | { albumId: number | undefined }
    | { playlistId: number | undefined };
}) => (
  <div className="mx-auto box-content max-w-[95rem] px-20 pb-2">
    <Suspense fallback={<TracksFallback />}>
      <TracksPrefetcher params={params} />
    </Suspense>
  </div>
);

export default Tracks;

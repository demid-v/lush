import { Suspense } from "react";
import { Hydrate, dehydrate } from "@tanstack/react-query";
import { notFound } from "next/navigation";
import { createSSRHelper } from "~/trpc/helpers";
import TracksBlock from "./TracksBlock";
import TrackSkeleton from "./TrackSkeleton";

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
    search: q,
    limit: 120,
    ...params,
  });

  return (
    <Hydrate state={dehydrate(helpers.queryClient)}>
      <Suspense>
        <TracksBlock params={params} />
      </Suspense>
    </Hydrate>
  );
};

const TracksFallback = () => (
  <>
    {new Array(100).fill(0).map((_item, index) => (
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

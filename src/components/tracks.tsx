import { Hydrate, dehydrate } from "@tanstack/react-query";
import { createSSRHelper } from "~/trpc/helpers";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import TracksBlock from "./TracksBlock";

const Tracks = async ({
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

export default Tracks;

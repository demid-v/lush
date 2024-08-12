import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import Albums from "~/components/albums";
import { createSSRHelper } from "~/trpc/helpers";

const AlbumsPage = async ({
  searchParams,
}: {
  searchParams?: Record<string, string | string[] | undefined>;
}) => {
  const { q } = searchParams ?? {};
  if (Array.isArray(q)) return notFound();

  const helpers = createSSRHelper();
  await helpers.album.page.prefetchInfinite({ search: q, limit: 120 });

  return (
    <HydrationBoundary state={dehydrate(helpers.queryClient)}>
      <Suspense>
        <Albums />
      </Suspense>
    </HydrationBoundary>
  );
};

export default AlbumsPage;

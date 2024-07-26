import { Hydrate, dehydrate } from "@tanstack/react-query";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import Artists from "~/components/artists";
import { createSSRHelper } from "~/trpc/helpers";

const ArtistsPage = async ({
  searchParams,
}: {
  searchParams?: Record<string, string | string[] | undefined>;
}) => {
  const { q } = searchParams ?? {};
  if (Array.isArray(q)) return notFound();

  const helpers = createSSRHelper();
  await helpers.artist.page.prefetchInfinite({ search: q, limit: 120 });

  return (
    <Hydrate state={dehydrate(helpers.queryClient)}>
      <Suspense>
        <Artists />
      </Suspense>
    </Hydrate>
  );
};

export default ArtistsPage;

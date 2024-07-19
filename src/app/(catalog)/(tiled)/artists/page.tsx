import { Hydrate, dehydrate } from "@tanstack/react-query";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import ArtistsBlock from "~/components/ArtistsBlock";
import { createSSRHelper } from "~/trpc/helpers";

const Artists = async ({
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
        <ArtistsBlock />
      </Suspense>
    </Hydrate>
  );
};

export default Artists;

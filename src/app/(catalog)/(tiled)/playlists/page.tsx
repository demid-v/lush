import { Hydrate, dehydrate } from "@tanstack/react-query";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import PlaylistsBlock from "~/components/PlaylistsBlock";
import { createSSRHelper } from "~/trpc/helpers";

const Playlists = async ({
  searchParams,
}: {
  searchParams?: Record<string, string | string[] | undefined>;
}) => {
  const { q } = searchParams ?? {};
  if (Array.isArray(q)) return notFound();

  const helpers = createSSRHelper();
  await helpers.playlist.page.prefetchInfinite({ search: q, limit: 120 });

  return (
    <Hydrate state={dehydrate(helpers.queryClient)}>
      <Suspense>
        <PlaylistsBlock />
      </Suspense>
    </Hydrate>
  );
};

export default Playlists;

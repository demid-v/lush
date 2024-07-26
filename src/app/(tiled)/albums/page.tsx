import Albums from "~/components/albums";
import { Hydrate, dehydrate } from "@tanstack/react-query";
import { createSSRHelper } from "~/trpc/helpers";
import { Suspense } from "react";
import { notFound } from "next/navigation";

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
    <Hydrate state={dehydrate(helpers.queryClient)}>
      <Suspense>
        <Albums />
      </Suspense>
    </Hydrate>
  );
};

export default AlbumsPage;

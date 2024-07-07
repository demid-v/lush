import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { joinParam } from ".";
import type { ContentProcedure } from "./types";

function useContent(
  getContent: ContentProcedure,
  limit: number,
  params?:
    | { artistId: number | undefined }
    | { albumId: number | undefined }
    | { playlistId: number | undefined }
) {
  const [offset, setOffset] = useState(0);

  const { q } = useRouter().query;
  const query = joinParam(q);

  useEffect(() => {
    setOffset(0);
  }, [query]);

  const { isLoading, data } = getContent.useQuery(
    {
      ...(query && { search: query }),
      limit,
      offset,
      ...params,
    },
    { refetchOnWindowFocus: false }
  );

  const [content, setContent] = useState<NonNullable<typeof data>>([]);

  useEffect(() => {
    if (!data) return;

    if (offset === 0) {
      setContent(data);
    } else if (offset > 0) {
      setContent((prevContent) => [...prevContent, ...data]);
    }
  }, [data, offset]);

  useEffect(() => {
    if (!data || data.length < limit) return;

    function checkPosition() {
      if (
        !isLoading &&
        document.body.clientHeight > window.innerHeight &&
        window.innerHeight + window.scrollY >= document.body.offsetHeight
      ) {
        setOffset((offset) => offset + limit);
      }
    }

    document.addEventListener("scroll", checkPosition);

    return () => {
      document.removeEventListener("scroll", checkPosition);
    };
  }, [isLoading, data, limit, offset, setOffset]);

  const unknownContent = content as unknown;

  return { isLoading, content: unknownContent };
}

export { useContent };

import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { decode, encodeForDb, joinParam } from "./functions";
import type { ContentGetter } from "./trpc";

function useContent(
  getContent: ContentGetter,
  limit: number,
  params?:
    | { artistId: number | undefined }
    | { albumId: number | undefined }
    | { playlistId: number | undefined }
) {
  const [offset, setOffset] = useState(0);

  const { q } = useRouter().query;

  useEffect(() => {
    setOffset(0);
  }, [q]);

  const { isLoading, data } = getContent.useQuery(
    {
      ...(q && { search: encodeForDb(decode(joinParam(q) || "")) }),
      limit,
      offset,
      ...params,
    },
    { refetchOnWindowFocus: false }
  );

  const [content, setContent] = useState<NonNullable<typeof data>>([]);

  useEffect(() => {
    if (!data) {
      return;
    }

    if (offset === 0) {
      setContent(data);
    } else if (offset > 0) {
      setContent((prevContent) => [...prevContent, ...data]);
    }
  }, [data, offset]);

  useEffect(() => {
    if (!data || data.length < limit) {
      return;
    }

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

  return content as unknown;
}

export { useContent };

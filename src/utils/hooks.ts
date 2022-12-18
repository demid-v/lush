import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import type { ArtistsGetter, TracksGetter } from "./trpc";

function useContent(
  getContent: TracksGetter | ArtistsGetter,
  limit: number,
  params?: { artistId?: number }
) {
  const [offset, setOffset] = useState(0);

  const { q } = useRouter().query;

  useEffect(() => {
    setOffset(0);
  }, [q]);

  const { isLoading, data } = getContent.useQuery(
    {
      ...(q && { search: Array.isArray(q) ? q.join("") : q }),
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
  }, [isLoading, limit, offset, setOffset]);

  return content;
}

export { useContent };

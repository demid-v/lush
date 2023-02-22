import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { decode, encodeForDb, joinParam } from "./functions";
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

  useEffect(() => {
    setOffset(0);
  }, [q]);

  const decodedQuery = useDecodedQuery();

  const { isLoading, data } = getContent.useQuery(
    {
      ...(decodedQuery && { search: encodeForDb(decodedQuery) }),
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

function useDecodedQuery() {
  const { q } = useRouter().query;
  const [decodedQuery, setDecodedQuery] = useState<string | null>(null);

  const isInitialQuery = useRef(true);

  useEffect(() => {
    setDecodedQuery(
      isInitialQuery.current ? joinParam(q) || "" : decode(joinParam(q) || "")
    );

    if (q !== undefined && isInitialQuery.current) {
      isInitialQuery.current = false;
    }
  }, [q]);

  return decodedQuery;
}

export { useContent, useDecodedQuery };

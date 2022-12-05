import SearchBar from "./SearchBar";
import {
  type FC,
  type ReactNode,
  type Dispatch,
  type SetStateAction,
  useEffect,
  useRef,
} from "react";
import { useRouter } from "next/router";
import type { ArtistsData, TracksData } from "../utils/trpc";

const Container: FC<{
  children: ReactNode;
  limit: number;
  offset: number;
  setOffset: Dispatch<SetStateAction<number>>;
  content: TracksData | ArtistsData | undefined;
  setContent:
    | Dispatch<SetStateAction<TracksData>>
    | Dispatch<SetStateAction<ArtistsData>>;
}> = ({ children, limit, offset, setOffset, content, setContent }) => {
  const contentIsLoading = useRef(false);

  useEffect(() => {
    function checkPosition() {
      if (
        !contentIsLoading.current &&
        window.innerHeight + window.scrollY >= document.body.offsetHeight
      ) {
        contentIsLoading.current = true;
        setOffset((offset) => offset + limit);
      }
    }

    document.addEventListener("scroll", checkPosition);

    return () => {
      document.removeEventListener("scroll", checkPosition);
    };
  }, [setOffset, limit]);

  const { q } = useRouter().query;

  useEffect(() => {
    setOffset(0);
  }, [q, setOffset]);

  useEffect(() => {
    if (content) {
      if (offset === 0) {
        setContent(content);
      } else if (offset > 0) {
        setContent((prevContent) => [...prevContent, ...content]);
      }

      contentIsLoading.current = false;
    }
  }, [offset, content, setContent]);

  return (
    <div className="px-[12.5rem]">
      <SearchBar />
      <div>{children}</div>
    </div>
  );
};

export default Container;

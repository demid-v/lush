import { type Dispatch, type SetStateAction, useEffect } from "react";

function usePositionObserver(
  isLoading: boolean,
  limit: number,
  offset: number,
  setOffset: Dispatch<SetStateAction<number>>
) {
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
}

export { usePositionObserver };

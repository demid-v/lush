import { Dispatch, SetStateAction, useEffect } from "react";

function usePositionObserver(
  limit: number,
  isLoading: boolean,
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
  }, [isLoading, offset, setOffset]);
}

export { usePositionObserver };

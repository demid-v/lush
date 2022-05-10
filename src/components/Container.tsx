import "../styles/container.css";

import SearchBar from "./SearchBar";
import { FormEvent, ReactNode, useEffect, useRef } from "react";

function Container({
  children,
  layout,
  hitBottom,
  setHitBottom,
  onBottomHit,
  abortController,
}: {
  children: ReactNode;
  layout: "flex" | "block";
  hitBottom: boolean;
  setHitBottom: Function;
  onBottomHit: Function;
  abortController: AbortController;
}) {
  function checkPosition(event: FormEvent) {
    const mainItemsContainer = event.target as HTMLElement;

    if (
      !hitBottom &&
      mainItemsContainer.scrollHeight - mainItemsContainer.offsetHeight - 200 <=
        mainItemsContainer.scrollTop
    ) {
      setHitBottom(true);
      onBottomHit();
    }
  }

  const mainItemContainer = useRef(null);

  useEffect(() => {
    (mainItemContainer?.current as HTMLElement | null)?.focus();
  }, []);

  return (
    <div className="container">
      <SearchBar abortController={abortController} />
      <div
        className="main-items-container scroll-y"
        tabIndex={-1}
        ref={mainItemContainer}
        onScroll={checkPosition}
      >
        <ol className={"container-" + layout}>{children}</ol>
      </div>
    </div>
  );
}

export default Container;

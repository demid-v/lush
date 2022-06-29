import "../styles/container.css";

import SearchBar from "./SearchBar";
import { FormEvent, ReactNode, useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";

function Container({
  children,
  layout,
  bottomHit,
  setBottomHit,
  updateData,
  abortController,
}: {
  children: ReactNode;
  layout: "flex" | "grid";
  bottomHit: boolean;
  setBottomHit: Function;
  updateData: Function;
  abortController: AbortController | null;
}) {
  function checkPosition(event: FormEvent) {
    const mainItemsContainer = event.target as HTMLElement;

    if (
      !bottomHit &&
      mainItemsContainer.scrollHeight - mainItemsContainer.offsetHeight - 200 <=
        mainItemsContainer.scrollTop
    ) {
      setBottomHit(true);
      updateData();
    }
  }

  const mainItemContainer = useRef<HTMLDivElement | null>(null);

  useEffect(() => mainItemContainer?.current?.focus(), []);

  function scrollToTop() {
    mainItemContainer?.current?.scrollTo(0, 0);
  }

  const [searchParams] = useSearchParams();

  useEffect(scrollToTop, [searchParams]);

  return (
    <div className="container">
      <SearchBar abortController={abortController} />
      <div
        className="main-items-container scroll-y"
        tabIndex={-1}
        ref={mainItemContainer}
        onScroll={checkPosition}
      >
        <ul className={"container-" + layout}>{children}</ul>
      </div>
    </div>
  );
}

export default Container;

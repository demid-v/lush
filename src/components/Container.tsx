import SearchBar from "./SearchBar";
import {
  type Dispatch,
  type MutableRefObject,
  type SetStateAction,
  useEffect,
  type FC,
  type ReactNode,
} from "react";

const Container: FC<{
  children: ReactNode;
  limit: number;
  offset: MutableRefObject<number>;
  bottomHit: boolean;
  setBottomHit: Dispatch<SetStateAction<boolean>>;
}> = ({ children, limit, offset, bottomHit, setBottomHit }) => {
  useEffect(() => {
    function checkPosition() {
      if (
        !bottomHit &&
        window.innerHeight + window.scrollY >= document.body.offsetHeight
      ) {
        setBottomHit(true);
        offset.current = offset.current + limit;
      }
    }

    document.addEventListener("scroll", checkPosition);

    return () => {
      document.removeEventListener("scroll", checkPosition);
    };
  }, [limit, offset, bottomHit, setBottomHit]);

  return (
    <div className="px-[12.5rem]">
      <SearchBar />
      <div>{children}</div>
    </div>
  );
};

export default Container;

import SearchBar from "./SearchBar";
import {
  type FC,
  type ReactNode,
  type Dispatch,
  type SetStateAction,
  useEffect,
  type MutableRefObject,
} from "react";

const Container: FC<{
  children: ReactNode;
  limit: number;
  setOffset: Dispatch<SetStateAction<number>>;
  isContentLoading: MutableRefObject<boolean>;
}> = ({ children, limit, setOffset, isContentLoading }) => {
  useEffect(() => {
    function checkPosition() {
      if (
        isContentLoading &&
        !isContentLoading.current &&
        window.innerHeight + window.scrollY >= document.body.offsetHeight
      ) {
        console.log("here");

        isContentLoading.current = true;
        setOffset((offset) => offset + limit);
      }
    }

    document.addEventListener("scroll", checkPosition);

    return () => {
      document.removeEventListener("scroll", checkPosition);
    };
  }, [limit, setOffset, isContentLoading]);

  return (
    <div className="px-[12.5rem]">
      <SearchBar />
      <div>{children}</div>
    </div>
  );
};

export default Container;

import SearchBar from "./SearchBar";
import { type FC, type ReactNode } from "react";

const Container: FC<{
  children: ReactNode;
}> = ({ children }) => {
  return (
    <div className="px-[12.5rem]">
      <SearchBar />
      <div>{children}</div>
    </div>
  );
};

export default Container;

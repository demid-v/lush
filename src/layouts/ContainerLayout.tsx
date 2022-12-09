import SearchBar from "../components/SearchBar";
import { type FC, type ReactNode } from "react";

const ContainerLayout: FC<{
  children: ReactNode;
}> = ({ children }) => (
  <div className="px-[12.5rem]">
    <SearchBar />
    <div>{children}</div>
  </div>
);

export default ContainerLayout;

import SearchBar from "../components/SearchBar";
import type { FC, ReactNode } from "react";

const ContainerLayout: FC<{
  children: ReactNode;
}> = ({ children }) => (
  <div className="px-[12.5rem]">
    <SearchBar />
    {children}
  </div>
);

export default ContainerLayout;

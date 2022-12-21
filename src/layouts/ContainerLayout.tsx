import SearchBar from "../components/SearchBar";
import type { FC, ReactNode } from "react";

const ContainerLayout: FC<{
  children: ReactNode;
}> = ({ children }) => (
  <div className="mx-auto box-content max-w-[95rem] px-20 pb-4">
    <SearchBar />
    {children}
  </div>
);

export default ContainerLayout;

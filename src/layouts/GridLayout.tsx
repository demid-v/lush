import type { FC, ReactNode } from "react";

const GridLayout: FC<{
  children: ReactNode;
}> = ({ children }) => (
  <ul className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-x-6 gap-y-10">
    {children}
  </ul>
);

export default GridLayout;

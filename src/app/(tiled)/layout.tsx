import type { ReactNode } from "react";

const TiledLayout = ({ children }: { children: ReactNode }) => (
  <ul className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-x-6 gap-y-10">
    {children}
  </ul>
);

export default TiledLayout;

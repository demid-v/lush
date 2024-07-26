import type { ReactNode } from "react";

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="mx-auto box-content max-w-[95rem] px-20 pb-2">
      <ul className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-x-6 gap-y-10">
        {children}
      </ul>
    </div>
  );
};

export default RootLayout;

import type { ReactNode } from "react";

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="mx-auto box-content max-w-[95rem] px-20 pb-2">
      {children}
    </div>
  );
};

export default RootLayout;

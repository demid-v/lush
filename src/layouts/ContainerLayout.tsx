import type { FC, ReactNode } from "react";
import TrackSkeleton from "../components/TrackSkeleton";
import Image from "next/image";
import TileSkeleton from "../components/TileSkeleton";
import GridLayout from "./GridLayout";

const ContainerLayout: FC<{
  children: ReactNode;
  contentLength: number;
  isLoading: boolean;
  isTiled?: boolean;
  image?: string;
}> = ({ children, contentLength, isLoading, isTiled = false, image }) => {
  const loadingContent = (() => {
    if (isLoading && contentLength === 0) {
      const skeleton = Array(100)
        .fill(0)
        .map((_e, i) =>
          isTiled ? (
            <TileSkeleton key={i} image={image ?? ""} />
          ) : (
            <TrackSkeleton key={i} />
          ),
        );

      if (isTiled) return <GridLayout>{skeleton}</GridLayout>;
      return skeleton;
    }

    if (isLoading) {
      return (
        <div className="my-8 flex items-center justify-center gap-3">
          <Image
            src="/assets/logos/logo32.png"
            alt="Galaxy - Lush logo"
            width={32}
            height={32}
          />
          <span className="text-lg font-medium">Loading...</span>
        </div>
      );
    }
  })();

  return (
    <div>
      {children}
      {loadingContent}
    </div>
  );
};

export default ContainerLayout;

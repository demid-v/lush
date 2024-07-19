import { Suspense } from "react";
import Tracks from "./tracks";
import TracksFallback from "./TracksFallback";

const TracksWithFallback = ({
  params,
}: {
  params?:
    | { artistId: number | undefined }
    | { albumId: number | undefined }
    | { playlistId: number | undefined };
}) => (
  <div className="mx-auto box-content max-w-[95rem] px-20 pb-2">
    <Suspense fallback={<TracksFallback />}>
      <Tracks params={params} />
    </Suspense>
  </div>
);

export default TracksWithFallback;

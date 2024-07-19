import TrackSkeleton from "./TrackSkeleton";

const TracksFallback = () => (
  <>
    {new Array(100).fill(0).map((_item, index) => (
      <TrackSkeleton key={index} />
    ))}
  </>
);

export default TracksFallback;

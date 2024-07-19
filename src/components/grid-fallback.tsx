import TileSkeleton from "./tile-skeleton";

const GridFallback = ({ image }: { image: string }) => (
  <>
    {new Array(120).fill(0).map((_item, index) => (
      <TileSkeleton key={index} image={image} />
    ))}
  </>
);

export default GridFallback;

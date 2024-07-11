import { Suspense } from "react";
import TracksBlock from "~/components/TracksBlock";

export const metadata = {
  title: "Lush - Tracks",
};

const Tracks = () => (
  <Suspense>
    <TracksBlock />
  </Suspense>
);

export default Tracks;

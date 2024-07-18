import { Suspense } from "react";
import ArtistsBlock from "~/components/ArtistsBlock";

const Artists = () => (
  <Suspense>
    <ArtistsBlock />
  </Suspense>
);

export default Artists;

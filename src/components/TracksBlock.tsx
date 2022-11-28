import React, { useState, useRef, FC } from "react";
import Track from "./Track";
import Container from "./Container";
import { TGroupedTrack } from "../utils/types";
import { useRouter } from "next/router";
import { trpc } from "../utils/trpc";

const TracksBlock: FC<{
  playableTracks: number[];
  currentTrack?: number;
  setCurrentTrack: Function;
}> = ({ playableTracks, currentTrack, setCurrentTrack }) => {
  const limit = 10;
  const offset = useRef(0);

  const fetching = useRef(false);

  const [tracks, setTracks] = useState<TGroupedTrack[]>([]);

  const router = useRouter();
  const { q } = router.query;

  const [bottomHit, setBottomHit] = useState(false);

  const tracksResponse = trpc.tracks.getTracks.useQuery({
    ...(q && { search: typeof q === "object" ? q.join("") : q }),
    limit,
    offset: offset.current,
  });

  function updateTracksOnScroll() {
    offset.current += limit;
    tracksResponse.refetch();
  }

  function updateTracksOnQueryChange() {
    fetching.current = true;
    offset.current = 0;
    updateTracks();
  }

  return (
    <Container
      layout="flex"
      bottomHit={bottomHit}
      setBottomHit={setBottomHit}
      updateData={updateTracksOnScroll}
    >
      {tracksResponse.data
        ? tracksResponse.data.tracks.map((track) => {
            // if (track.youtube_video_id != null) {
            //   playableTracks.push(track.id);
            // }

            return (
              <Track
                key={track.id}
                track={track}
                currentTrack={currentTrack}
                setCurrentTrack={setCurrentTrack}
              />
            );
          })
        : "Fetching tracks..."}
    </Container>
  );
};

export default TracksBlock;

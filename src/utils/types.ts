import type { RouterOutputs } from "./trpc";

export type TracksData = RouterOutputs["track"]["page"]["tracks"];
export type TrackData = TracksData[0];

export type AttachedImage =
  RouterOutputs["artist"]["page"]["artists"][0]["artist_image_rels"][0]["artist_image"] & {
    r?: number;
    g?: number;
    b?: number;
  };

import type { RouterOutputs } from "./trpc";

export type ActiveTrack = { id: number; youtube_video_id: string };

export type TracksData = RouterOutputs["tracks"]["getTracks"]["tracks"];
export type TrackData = TracksData[0];

export type AttachedImage =
  RouterOutputs["artists"]["getArtists"]["artists"][0]["artist_image_rels"][0]["artist_image"] & {
    r?: number;
    g?: number;
    b?: number;
  };

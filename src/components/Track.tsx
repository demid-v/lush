import type { FC } from "react";
import { encode } from "../utils/functions";
import Link from "next/link";
import type { TrackData } from "../utils/types";
import { DOMAIN_MID_PATH } from "../utils/globals";
import Image from "next/image";
import { useTracks } from "../contexts/Tracks";
import FaultTolerantImage from "./FaultTolerantImage";

const Track: FC<{
  track: TrackData;
  handlePlayableTrackClick: (id: number, youtube_video_id: string) => void;
}> = ({ track, handlePlayableTrackClick }) => {
  const {
    id,
    name,
    duration,
    youtube_video_id,
    track_artist_rel: artists,
    track_genre_rel: genres,
    track_album_rel: albums,
  } = track;

  const { activeTrack } = useTracks();

  const durationStr = (() => {
    if (duration === null) return;

    const durationFloored: number = Math.floor(duration);
    const minutes: number = Math.floor(durationFloored / 60);
    const seconds: number = Math.floor(durationFloored - minutes * 60);

    let durationStrConstructor = "";

    if (minutes < 10) {
      durationStrConstructor += "0";
    }

    durationStrConstructor += minutes + ":";

    if (seconds < 10) {
      durationStrConstructor += "0";
    }

    durationStrConstructor += seconds;

    return durationStrConstructor;
  })();

  const defaultImage = "/logo192.png";

  const imageUrl = (() => {
    const image =
      albums?.[0]?.album.album_image_rel?.[0]?.album_image ||
      artists?.[0]?.artist.artist_image_rel?.[0]?.artist_image;

    return (
      image &&
      image.domain.name +
        "/" +
        DOMAIN_MID_PATH[image.domain.id] +
        image.image_id
    );
  })();

  function handleActiveTrack() {
    if (youtube_video_id !== null) {
      handlePlayableTrackClick(id, youtube_video_id);
    }
  }

  const getVisibilityClass = (truthyClass: string, falsyClass = "") =>
    activeTrack?.id === id ? truthyClass : falsyClass;

  return (
    <li className="h-12 w-full border-t border-gray-200 leading-none last:border-b">
      <div
        className={
          "relative h-full p-[5px] hover:bg-gray-100" +
          getVisibilityClass(" bg-gray-100")
        }
      >
        <div
          className="absolute left-0 top-0 z-10 h-full w-full cursor-pointer"
          onClick={handleActiveTrack}
        ></div>

        <div className="flex h-full gap-2 whitespace-nowrap">
          <div className="relative aspect-square h-full overflow-hidden">
            <FaultTolerantImage
              image={{
                url: imageUrl,
                alt:
                  "Image of " +
                  (artists[0]?.artist.name || "the track's artist or album"),
                width: 48,
                height: 48,
              }}
              defaultImage={{
                url: defaultImage,
                w: "w-[80%]",
              }}
            />
          </div>

          <div className="flex flex-1">
            <div className="flex flex-1 flex-col justify-between">
              <span className="z-10 w-min">{name}</span>
              <div className="z-10 w-min text-sm text-gray-500">
                {artists
                  .map<React.ReactNode>(({ artist }) => (
                    <span key={artist.id}>
                      <Link
                        href={`/artists/${artist.id}+${encode(artist.name)}`}
                      >
                        {artist.name}
                      </Link>
                    </span>
                  ))
                  .reduce((prev, curr, index) => [
                    prev,
                    index !== artists.length - 1 ? ", " : " & ",
                    curr,
                  ])}
              </div>
            </div>

            <div className="flex flex-col items-end justify-between">
              <div className="flex">
                {genres.length !== 0 && (
                  <ul className="flex text-sm leading-4">
                    {genres.map(({ genre }) => (
                      <li key={genre.id} className="mr-2.5 last:mr-0">
                        <button
                          aria-label={"Search by genre " + genre.name}
                          className="z-10 rounded-sm border border-gray-300 bg-white px-[5px]"
                        >
                          {genre.name}
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <div className="z-10 flex gap-2">
                {durationStr && (
                  <div className="flex text-xs leading-none">
                    <div className={getVisibilityClass("", "hidden")}>
                      <span>00:00</span>
                      <span>/</span>
                    </div>
                    <span>{durationStr}</span>
                  </div>
                )}
                {youtube_video_id && (
                  <Image
                    src="/assets/note-2.png"
                    alt=""
                    width={16}
                    height={16}
                    title="This track has a Youtube video"
                    className="aspect-ratio w-2.5"
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
};

export default Track;

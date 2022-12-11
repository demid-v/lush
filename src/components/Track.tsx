import { type FC, useEffect, useState } from "react";
import { constructLink } from "../utils/functions";
import Link from "next/link";
import type { ArtistImage, TrackData } from "../utils/trpc";
import { DOMAIN_MID_PATH } from "../utils/globals";
import Image from "next/image";
import type { ActiveTrack } from "../utils/types";

const Track: FC<{
  track: TrackData;
  activeTrack: ActiveTrack | null;
  handlePlayableTrackClick: (id: number, youtube_video_id: string) => void;
}> = ({ track, activeTrack, handlePlayableTrackClick }) => {
  const {
    id,
    title,
    duration,
    youtube_video_id,
    track_artist_rel: artists,
    track_genre_rel: genres,
    track_album_rel: albums,
  } = track;

  const [durationStr, setDurationStr] = useState("");
  const [trackImageUrl, setTrackImageUrl] = useState("/logo192.png");

  function convertDurationToString() {
    if (duration === null) {
      return;
    }

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

    setDurationStr(durationStrConstructor);
  }

  useEffect(convertDurationToString, [duration]);

  function constructImageUrl() {
    for (const { artist } of artists) {
      for (const { artist_image } of artist.artist_image_rel) {
        return handleArtistImageUrl(artist_image);
      }
    }
  }

  function handleArtistImageUrl(artistImageIn: NonNullable<ArtistImage>) {
    const { image_id, domain } = artistImageIn;

    setTrackImageUrl(domain.name + "/" + DOMAIN_MID_PATH[domain.id] + image_id);
  }

  useEffect(constructImageUrl, [artists, albums]);

  function handleActiveTrack() {
    if (youtube_video_id !== null) {
      handlePlayableTrackClick(id, youtube_video_id);
    }
  }

  function handleVisibility(truthyClass: string, falsyClass = "") {
    return activeTrack && activeTrack.id === id ? truthyClass : falsyClass;
  }

  return (
    <li className="h-12 w-full border-t border-[#e6e6e6] leading-none last:border-b">
      <div
        className={
          "relative h-full p-[0.3125rem] hover:bg-[#eeeeee]" +
          handleVisibility(" bg-[#eeeeee]")
        }
      >
        <div
          className="absolute left-0 top-0 z-10 h-full w-full cursor-pointer"
          onClick={handleActiveTrack}
        ></div>

        <div className="flex h-full gap-2 whitespace-nowrap">
          <div className="aspect-square h-full overflow-hidden">
            <Image
              src={trackImageUrl}
              alt={
                "Image of " + artists[0]?.artist.name ||
                "the track's artist or album"
              }
              width={37}
              height={37}
              className="h-full object-cover"
            />
          </div>

          <div className="flex flex-1">
            <div className="flex flex-1 flex-col justify-between">
              <span className="z-10 w-min text-[0.92rem] leading-[1.1rem]">
                {title}
              </span>
              {artists.map(({ artist }) => (
                <span
                  key={artist.id}
                  className="z-10 w-min text-[0.83rem] leading-[1.05rem] text-[#8d8d8d]"
                >
                  <Link
                    href={`/artists/${artist.id}+${constructLink(artist.name)}`}
                  >
                    {artist.name}
                  </Link>
                </span>
              ))}
            </div>

            <div className="flex flex-col items-end justify-between">
              <div className="flex">
                {genres.length !== 0 && (
                  <ul className="flex text-[0.82rem] leading-[1rem]">
                    {genres.map(({ genre }) => (
                      <li key={genre.id} className="mr-[0.625rem]">
                        <button className="z-10 rounded-sm border border-[#bdbdbd] bg-white px-[0.313rem]">
                          {genre.name}
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
                <button className="z-10 h-4 w-5">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512.001 512.001"
                    className="m-auto w-2.5"
                  >
                    <path
                      d="M496.063,62.299l-46.396-46.4c-21.199-21.199-55.689-21.198-76.888,0C352.82,35.86,47.964,340.739,27.591,361.113
			c-2.17,2.17-3.624,5.054-4.142,7.875L0.251,494.268c-0.899,4.857,0.649,9.846,4.142,13.339c3.497,3.497,8.487,5.042,13.338,4.143
			L143,488.549c2.895-0.54,5.741-2.008,7.875-4.143l345.188-345.214C517.311,117.944,517.314,83.55,496.063,62.299z M33.721,478.276
			l14.033-75.784l61.746,61.75L33.721,478.276z M140.269,452.585L59.41,371.721L354.62,76.488l80.859,80.865L140.269,452.585z
			 M474.85,117.979l-18.159,18.161l-80.859-80.865l18.159-18.161c9.501-9.502,24.96-9.503,34.463,0l46.396,46.4
			C484.375,93.039,484.375,108.453,474.85,117.979z"
                    />
                  </svg>
                </button>
              </div>

              <div className="z-10 ml-auto flex w-min text-[0.65rem] leading-none">
                <div className={handleVisibility("", "hidden")}>
                  <span className="">00:00</span>
                  <span className="">/</span>
                </div>
                <span className="">{durationStr}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
};

export default Track;

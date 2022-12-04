import {
  type Dispatch,
  type FC,
  type SetStateAction,
  useEffect,
  useState,
} from "react";
import { constructLink } from "../utils/functions";
import Link from "next/link";
import type { AlbumImage, ArtistImage, TrackData } from "../utils/trpc";
import { DOMAIN_MID_PATH } from "../utils/globals";
import Image from "next/image";

const Track: FC<{
  track: TrackData;
  activeTrack: number | null;
  setActiveTrack?: Dispatch<SetStateAction<number | null>>;
  setGlobalTracks: () => void;
  globalPlayableTracks: number[];
}> = ({
  track,
  activeTrack,
  setActiveTrack,
  setGlobalTracks,
  globalPlayableTracks,
}) => {
  const {
    title,
    duration,
    youtube_video_id,
    track_artist_rel: artists,
    track_genre_rel: genres,
    track_album_rel: albums,
  } = track;

  const [playing, setPlaying] = useState(false);

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

    // for (const { album } of albums) {
    //   for (const { album_image } of album.album_image_rel) {
    //     return handleArtistImageUrl(album_image);
    //   }
    // }
  }

  function handleArtistImageUrl(
    artistImageIn: NonNullable<ArtistImage /**| AlbumImage**/>
  ) {
    const { image_id, domain } = artistImageIn;

    setTrackImageUrl(domain.name + "/" + DOMAIN_MID_PATH[domain.id] + image_id);
  }

  useEffect(constructImageUrl, [artists, albums]);

  return (
    <li className="h-12 w-full border-t border-[#e6e6e6] leading-none last:border-b">
      <div className="relative h-full p-[0.3125rem]">
        <div className="absolute left-0 top-0 z-10 h-full w-full cursor-pointer"></div>

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
              {artists?.map(({ artist }) => (
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

            <div className="flex flex-col justify-between">
              <div className="flex">
                <ul className="flex text-[0.82rem] leading-[1rem]">
                  {genres?.map(({ genre }) => (
                    <li key={genre.id} className="mr-[0.625rem]">
                      <button className="z-10 rounded-sm border border-[#bdbdbd] px-[0.313rem]">
                        {genre.name}
                      </button>
                    </li>
                  ))}
                </ul>
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

              <div className="ml-auto flex w-min">
                <div className={playing ? "" : "hidden"}>
                  <div className="">
                    <span className="">00:00</span>
                    <div className="">/</div>
                  </div>
                </div>
                <span className="z-10 text-[0.65rem] leading-none">
                  {durationStr}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
};

export default Track;

import { constructLink } from "../utils/functions";
import { ArtistData } from "../utils/trpc";
import Link from "next/link";
import { useEffect, useState } from "react";
import { DOMAIN_MID_PATH } from "../utils/globals";

function Artist({ artist }: { artist: ArtistData }) {
  const { id, name, artist_image_rel: images } = artist;

  const [artistImageUrl, setArtistImageUrl] = useState("");

  function constructImageUrl() {
    const artistImage = images[0]?.artist_image;

    if (artistImage) {
      const { domain, image_id } = artistImage;

      setArtistImageUrl(
        domain.name + "/" + DOMAIN_MID_PATH[domain.id] + image_id
      );
    }
  }

  useEffect(constructImageUrl, [images[0]?.artist_image]);

  return (
    <li className="tile">
      <div className="tile__container">
        <Link
          href={`/artists/${id}+${constructLink(name)}`}
          className="tile__link"
        >
          <div className="tile__image-wrapper relative pb-[100%]">
            {artistImageUrl === "" ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 477.216 477.216"
                className="absolute top-0 right-0 bottom-0 left-0 m-auto w-[45%]"
              >
                <path
                  d="M453.858,105.116v-91.6c0-4.3-2.1-8.4-5.5-10.9c-3.5-2.5-8-3.3-12.1-2l-272.9,86.7c-5.6,1.8-9.4,7-9.4,12.9v91.7v0.1v175.3
               c-14.3-9.9-32.6-15.3-51.8-15.3c-20.3,0-39.6,6.1-54.3,17.1c-15.8,11.9-24.5,28-24.5,45.5s8.7,33.6,24.5,45.5
               c14.7,11,33.9,17.1,54.3,17.1s39.6-6.1,54.3-17.1c15.8-11.9,24.5-28,24.5-45.5v-212.8l245.9-78.2v156.6
               c-14.3-9.9-32.6-15.3-51.8-15.3c-20.3,0-39.6,6.1-54.3,17.1c-15.8,11.9-24.5,28-24.5,45.5s8.7,33.6,24.5,45.5
               c14.7,11,33.9,17.1,54.3,17.1s39.6-6.1,54.3-17.1c15.8-11.9,24.5-28,24.5-45.5v-222.3
               C453.858,105.116,453.858,105.116,453.858,105.116z M102.158,450.216c-28.1,0-51.8-16.3-51.8-35.6c0-19.3,23.7-35.6,51.8-35.6
               s51.8,16.3,51.8,35.6C153.958,434.016,130.258,450.216,102.158,450.216z M180.958,173.416v-63.4l245.9-78.1v63.4L180.958,173.416z
                M375.158,363.116c-28.1,0-51.8-16.3-51.8-35.6c0-19.3,23.7-35.6,51.8-35.6s51.8,16.3,51.8,35.6
               C426.858,346.816,403.158,363.116,375.158,363.116z"
                />
              </svg>
            ) : (
              <img
                src={artistImageUrl}
                className="absolute h-full w-full object-cover"
              />
            )}
          </div>
        </Link>
        <div className="tile__options">
          <button className="tile__button tile__button-edit"></button>
          <button className="tile__button tile__button-delete"></button>
        </div>
        <div className="tile__name">{name}</div>
      </div>
    </li>
  );
}

export default Artist;

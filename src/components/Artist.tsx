import "../styles/artist.css";

import { useEffect, useState } from "react";
import { constructLink } from "../utils/functions";
import { DOMAIN_MID_PATH } from "../utils/globals";
import { TGroupedArtist } from "../utils/types";
import musicalNoteIcon from "../assets/icons/musical-note.svg";

function Artist({ artist }: { artist: TGroupedArtist }) {
  const { id, name, domain_id, domain_name, image_id } = artist;

  const [artistCover, setCover] = useState(musicalNoteIcon);

  useEffect(() => {
    if (domain_name !== null && domain_id !== null && image_id !== null) {
      setCover(
        `${domain_name}/${
          DOMAIN_MID_PATH[domain_id as keyof typeof DOMAIN_MID_PATH]
        }${domain_id === 2 ? "300x300/" : ""}${image_id}`
      );
    }
  }, []);

  return (
    <li className="artist">
      <div className="artist-container">
        <a
          href={`/artists/${id}/${constructLink(name)}`}
          className="artist-link"
        >
          <picture className={"artist__image-wrapper image-wrapper"}>
            <img
              className={
                "artist__image" +
                (artistCover === musicalNoteIcon ? "_no-cover" : "")
              }
              src={artistCover}
              alt={name + "'s cover"}
            />
          </picture>
        </a>
        <div className="artist-options">
          <button className="button-edit"></button>
          <button className="button-delete"></button>
        </div>
        <div className="artist-name">{name}</div>
      </div>
    </li>
  );
}

export default Artist;

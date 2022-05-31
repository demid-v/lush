import "../styles/tile.css";

import { useEffect, useState } from "react";
import { constructLink } from "../utils/functions";
import { DOMAIN_MID_PATH } from "../utils/globals";
import { TGroupedArtist } from "../utils/types";
import musicNoteIcon from "../assets/icons/musical-note.svg";
import { Link } from "react-router-dom";

function Artist({ artist }: { artist: TGroupedArtist }) {
  const { id, name, domain_id, domain_name, image_id } = artist;

  const [artistCover, setCover] = useState<undefined | string>();

  useEffect(() => {
    if (domain_name !== null && domain_id !== null && image_id !== null) {
      setCover(
        `${domain_name}/${
          DOMAIN_MID_PATH[domain_id as keyof typeof DOMAIN_MID_PATH]
        }${domain_id === 2 ? "300x300/" : ""}${image_id}`
      );
    } else {
      setCover(musicNoteIcon);
    }
  }, []);

  return (
    <li className="tile">
      <div className="tile__container">
        <Link
          to={`/artists/${id}+${constructLink(name)}`}
          className="tile__link"
        >
          <picture className={"tile__image-wrapper"}>
            {artistCover && (
              <img
                className={
                  "tile__image" +
                  (artistCover === musicNoteIcon ? "_no-cover" : "")
                }
                src={artistCover}
                alt={"Image of" + name}
              />
            )}
          </picture>
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

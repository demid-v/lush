import "../styles/tile.css";

import { useEffect, useState } from "react";
import { constructLink } from "../utils/functions";
import { DOMAIN_MID_PATH } from "../utils/globals";
import { TGroupedAlbum } from "../utils/types";
import vynilIcon from "../assets/icons/vynil.svg";
import { Link } from "react-router-dom";

function Album({ album }: { album: TGroupedAlbum }) {
  const { id, title, domain_id, domain_name, image_id } = album;

  const [albumCover, setCover] = useState<undefined | string>();

  useEffect(() => {
    if (domain_name !== null && domain_id !== null && image_id !== null) {
      setCover(
        `${domain_name}/${
          DOMAIN_MID_PATH[domain_id as keyof typeof DOMAIN_MID_PATH]
        }${domain_id === 2 ? "300x300/" : ""}${image_id}`
      );
    } else {
      setCover(vynilIcon);
    }
  }, []);

  return (
    <li className="tile">
      <div className="tile__container">
        <Link
          to={`/albums/${id}+${constructLink(title)}`}
          className="tile__link"
        >
          <picture className={"tile__image-wrapper"}>
            {albumCover && (
              <img
                className={
                  "tile__image" + (albumCover === vynilIcon ? "_no-cover" : "")
                }
                src={albumCover}
                alt={"Image of" + title}
              />
            )}
          </picture>
        </Link>
        <div className="tile__options">
          <button className="tile__button tile__button-edit"></button>
          <button className="tile__button tile__button-delete"></button>
        </div>
        <div className="tile__name">{title}</div>
      </div>
    </li>
  );
}

export default Album;

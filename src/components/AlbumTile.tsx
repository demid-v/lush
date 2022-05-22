import "../styles/albumTile.css";

import { useEffect, useState } from "react";
import { constructLink } from "../utils/functions";
import { DOMAIN_MID_PATH } from "../utils/globals";
import { TGroupedAlbum } from "../utils/types";
import vynilIcon from "../assets/icons/vynil.svg";

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
    <li className="album">
      <div className="album-container">
        <a
          href={`/albums/${id}+${constructLink(title)}`}
          className="album-link"
        >
          <picture className={"album__image-wrapper image-wrapper"}>
            {albumCover && (
              <img
                className={
                  "album__image" + (albumCover === vynilIcon ? "_no-cover" : "")
                }
                src={albumCover}
                alt={"Image of" + title}
              />
            )}
          </picture>
        </a>
        <div className="album-options">
          <button className="button-edit"></button>
          <button className="button-delete"></button>
        </div>
        <div className="album-name">{title}</div>
      </div>
    </li>
  );
}

export default Album;

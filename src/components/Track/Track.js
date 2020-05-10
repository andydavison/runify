import React from "react";
import css from "./Track.module.css";

const Track = ({ imgSrc, name, artist }) => {
  return (
    <li className={css.container}>
      <img className={css.albumArt} aria-hidden="true" src={imgSrc} width={64} alt={`${name} — ${artist}`} />
      <div className={css.trackDetails}>
        <p>{name}</p>
        <p>{artist}</p>
      </div>
    </li>
  );
};

export { Track };

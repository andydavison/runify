import React from "react";
import { Track } from "../Track";
import css from "./TrackList.module.css";

const TrackList = ({ tracks }) => {
  return (
    <ul className={css.container}>
      {tracks.map((track) => (
        <Track
          key={track.id}
          imgSrc={track.imgSrc}
          name={track.name}
          artist={track.artist}
        />
      ))}
    </ul>
  );
};

export { TrackList };

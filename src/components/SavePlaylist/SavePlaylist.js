import React, { useState } from "react";
import { Button } from "../Button";
import css from "./SavePlaylist.module.css";

const SavePlaylist = ({ onSubmit }) => {
  const [isDisabled, setIsDisabled] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsDisabled(true);
    onSubmit(playlistName);
  };
  const handleChange = (event) => {
    setPlaylistName(event.target.value);
  };
  const [playlistName, setPlaylistName] = useState("My Runify Playlist");
  return (
    <form className={css.form} onSubmit={handleSubmit}>
      <input
        className={css.input}
        type="text"
        value={playlistName}
        onChange={handleChange}
      />
      <Button
        className={css.button}
        text="Save Playlist"
        onClick={handleSubmit}
        disabled={isDisabled}
      />
    </form>
  );
};

export { SavePlaylist };

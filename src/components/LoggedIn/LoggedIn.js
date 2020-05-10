import React, { useEffect, useState, useReducer } from "react";
import axios from "axios";
import { Button } from "../Button";
import css from "./LoggedIn.module.css";
import dummyRec from "./dummyRec.json";
import { base64images } from "../../assets/base64images";
import { TrackList } from "../TrackList/TrackList";
import { SavePlaylist } from "../SavePlaylist/SavePlaylist";
import { Content } from "../Content";

const LoggedIn = ({ userName, userId, spotifyConfig }) => {
  const [topTrackIds, setTopTrackIds] = useState([]);
  const [recommendations, setRecommendations] = useState({
    gentle: [],
    moderate: [],
    hardcore: [],
  });
  const [selectedIntensity, setSelectedIntensity] = useState(null);
  const [playlistSaved, setPlaylistSaved] = useState(false);

  useEffect(() => {
    const fetchTopTracks = async () => {
      const topTracksResponse = await axios.get(
        "https://api.spotify.com/v1/me/top/tracks?limit=5",
        spotifyConfig
      );
      const topTrackIds = topTracksResponse.data.items.map((track) => track.id);
      setTopTrackIds(topTrackIds);
    };
    fetchTopTracks();
  }, []);

  const handleClickGenerate = async (intensity) => {
    if (!recommendations[intensity].length) {
      let params = {
        seed_tracks: topTrackIds.join(","),
        min_energy: 0.4,
        min_danceability: 0.4,
        target_danceability: 1.0,
      };
      switch (intensity) {
        case "gentle":
          params.min_tempo = 110;
          params.max_tempo = 130;
          params.target_energy = 0.65;
          break;
        case "moderate":
          params.min_tempo = 130;
          params.max_tempo = 150;
          params.target_energy = 0.85;
          break;
        case "hardcore":
          params.min_tempo = 150;
          params.max_tempo = 180;
          params.target_energy = 1;
          break;
      }
      const recsResponse = await axios.get(
        "https://api.spotify.com/v1/recommendations",
        { ...spotifyConfig, params }
      );
      const newRecs = recsResponse.data.tracks.map((track) => {
        const imgSrc =
          track.album.images.find((img) => img.height == 64).url ||
          track.album.images[track.album.images.length - 2].url;
        const name = track.name;
        const artist = track.artists.map((artist) => artist.name).join(", ");
        const id = track.id;
        return { imgSrc, name, artist, id };
      });
      setRecommendations({ ...recommendations, [intensity]: newRecs });
    }

    setSelectedIntensity(intensity);
  };

  const handleSavePlaylist = async (playlistName) => {
    const createPlaylistResponse = await axios.post(
      `https://api.spotify.com/v1/users/${userId}/playlists`,
      {
        name: playlistName,
        description: `A ${selectedIntensity} running playlist, created by Runify`,
      },
      spotifyConfig
    );
    const trackURIs = recommendations.map(
      (track) => "spotify:track:" + track.id
    );
    const addTracksResponse = axios.post(
      `https://api.spotify.com/v1/playlists/${createPlaylistResponse.data.id}/tracks`,
      {
        uris: trackURIs,
      },
      spotifyConfig
    );
    const updateImageResponse = axios.put(
      `https://api.spotify.com/v1/playlists/${createPlaylistResponse.data.id}/images`,
      base64images[selectedIntensity],
      {
        headers: {
          Authorization: spotifyConfig.headers.Authorization,
          "Content-Type": "image/jpeg",
        },
      }
    );
    await Promise.all([addTracksResponse, updateImageResponse]);
    setPlaylistSaved(true);
  };

  return (
    <div className={`${css.container} ${css[selectedIntensity]}`}>
      <Content>
        <p className={css.textBlockIntro}>
          Hi {userName}, you're logged in! What's your speed?
        </p>
        <div className={css.intensityButtonsContainer}>
          <Button
            text="Gentle"
            active={selectedIntensity === "gentle"}
            onClick={() => handleClickGenerate("gentle")}
          />
          <Button
            text="Moderate"
            active={selectedIntensity === "moderate"}
            onClick={() => handleClickGenerate("moderate")}
          />
          <Button
            text="Hardcore"
            active={selectedIntensity === "hardcore"}
            onClick={() => handleClickGenerate("hardcore")}
          />
        </div>
        {selectedIntensity && !!recommendations[selectedIntensity].length && (
          <>
            <div className={css.textBlock}>
              <p>
                Here's your personalised playlist, based on your music taste and
                chosen intensity
              </p>
              <p>Choose a name and click below to save it to your account</p>
            </div>
            {playlistSaved ? (
              <p className={css.savedMessage}>Playlist saved!</p>
            ) : (
              <SavePlaylist onSubmit={handleSavePlaylist} />
            )}
            <TrackList tracks={recommendations[selectedIntensity]} />
          </>
        )}
      </Content>
    </div>
  );
};

export { LoggedIn };

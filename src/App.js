import React, { useState, useEffect } from "react";
import axios from "axios";
import { Login } from "./components/Login";
import { LoggedIn } from "./components/LoggedIn";
import { Header } from "./components/Header";
import "./App.css";

const getHashParams = () => {
  const hashParams = {};
  let e;
  const r = /([^&;=]+)=?([^&;]*)/g,
    q = window.location.hash.substring(1);
  while ((e = r.exec(q))) {
    hashParams[e[1]] = decodeURIComponent(e[2]);
  }
  return hashParams;
};

function App() {
  const hashParams = getHashParams();
  const [loggedIn, setLoggedIn] = useState(false); //!!hashParams.access_token; // jazz this up with a state check!
  const [spotifyConfig, setSpotifyConfig] = useState({}); // reset token if invalid, timed out
  const [user, setUser] = useState({});
  useEffect(() => {
    if (hashParams.access_token) {
      const config = {
        headers: { Authorization: `Bearer ${hashParams.access_token}` },
      };
      setSpotifyConfig(config);
      axios.get("https://api.spotify.com/v1/me", config).then((res) => {
        const user = { id: res.data.id, name: res.data.display_name };
        setUser(user);
        setLoggedIn(true);
      });
    }
  }, [hashParams.access_token]);

  return (
    <div className="App">
      <Header />
      {!loggedIn ? (
        <Login />
      ) : (
        <LoggedIn userName={user.name} userId={user.id} spotifyConfig={spotifyConfig} />
      )}
    </div>
  );
}

export default App;

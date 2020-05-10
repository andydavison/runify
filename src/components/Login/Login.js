import React from "react";
import { Button } from "../Button";
import css from "./Login.module.css";

const generateRandomString = (length) => {
  let text = "";
  const possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

const handleLoginClick = () => {
  const client_id = "3b8c83cbf3d1495eb3bbec76ac25dbc1"; // Your client id
  const redirect_uri =
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000"
      : "http://andydavison.github.io/runify"; // Your redirect uri
  const state = generateRandomString(16);
  localStorage.setItem("runify_state", state);
  const scope =
    "user-read-private user-read-email user-top-read playlist-modify-public ugc-image-upload";
  var url = "https://accounts.spotify.com/authorize";
  url += "?response_type=token";
  url += "&client_id=" + encodeURIComponent(client_id);
  url += "&scope=" + encodeURIComponent(scope);
  url += "&redirect_uri=" + encodeURIComponent(redirect_uri);
  url += "&state=" + encodeURIComponent(state);

  window.location = url;
};

const Login = () => {
  return (
    <div className={css.container}>
      <Button onClick={handleLoginClick} text="Login with Spotify"/>
    </div>
  );
};

export { Login };

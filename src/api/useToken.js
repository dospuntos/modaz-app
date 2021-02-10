import { useState } from "react";

export default function useToken() {
  const getToken = () => {
    const tokenString = localStorage.getItem("token");
    const userToken = JSON.parse(tokenString);
    return userToken;
  };

  const [token, setToken] = useState(getToken);

  const saveToken = (userToken) => {
    if (userToken !== "" && userToken !== "undefined") {
      userToken.data.access_token_expires = new Date(
        Date.now() + userToken.data.access_token_expires_in * 1000
      );
      userToken.data.refresh_token_expires = new Date(
        Date.now() + userToken.data.refresh_token_expires_in * 1000
      );
    }
    localStorage.setItem("token", JSON.stringify(userToken.data));
    setToken(userToken);
  };

  return {
    setToken: saveToken,
    token,
  };
}

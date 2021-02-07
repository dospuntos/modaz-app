import { useState } from "react";

export default function useToken() {
  const getToken = () => {
    const tokenString = localStorage.getItem("token");
    const userToken = JSON.parse(tokenString);
    return userToken;
  };

  const [token, setToken] = useState(getToken);

  const saveToken = (userToken) => {
    userToken.data.access_token_expires = new Date();
    localStorage.setItem("token", JSON.stringify(userToken.data));
    setToken(userToken);
  };

  return {
    setToken: saveToken,
    token,
  };
}

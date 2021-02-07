import { handleResponse, handleError } from "./apiUtils";

export function getUsers() {
  return fetch(process.env.REACT_APP_API_URL + "getusers.php")
    .then(handleResponse)
    .catch(handleError);
}

export function loginUser(credentials) {
  return fetch(process.env.REACT_APP_API2_URL + "sessions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  })
    .then((data) => data.json())
    .catch(handleError);
}

export function logOut() {
  // Todo - logout from server using token and session ID
  const token = JSON.parse(localStorage.getItem("token"));
  if (token?.session_id) {
    // Todo - check token expiry and refresh if needed.
    return fetch(
      process.env.REACT_APP_API2_URL + "sessions/" + token.session_id,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: token.access_token,
        },
        body: JSON.stringify({ refresh_token: token.refresh_token }),
      }
    );
  }
}

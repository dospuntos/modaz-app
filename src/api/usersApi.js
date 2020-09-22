import { handleResponse, handleError } from "./apiUtils";

export function getUsers() {
  return fetch(process.env.REACT_APP_API_URL + "getusers.php")
    .then(handleResponse)
    .catch(handleError);
}

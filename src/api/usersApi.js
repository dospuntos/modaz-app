import { handleResponse, handleError } from "./apiUtils";
import * as Constants from "constants.js";

export function getUsers() {
  return fetch(Constants.API_URL + "getusers.php")
    .then(handleResponse)
    .catch(handleError);
}

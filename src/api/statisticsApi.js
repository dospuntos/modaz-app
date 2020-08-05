import { handleResponse, handleError } from "./apiUtils";
import * as Constants from "constants/index";

export function getStatistics() {
  return fetch(Constants.API_URL + "statistics.php")
    .then(handleResponse)
    .catch(handleError);
}

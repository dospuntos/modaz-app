import { handleResponse, handleError } from "./apiUtils";

export function getStatistics() {
  return fetch(process.env.REACT_APP_API_URL + "statistics.php")
    .then(handleResponse)
    .catch(handleError);
}

import { handleResponse, handleError } from "./apiUtils";

export function getStatistics() {
  return fetch(process.env.REACT_APP_API_URL + "statistics.php")
    .then(handleResponse)
    .catch(handleError);
}

export function getMissingImages() {
  return fetch(process.env.REACT_APP_API_URL + "getmissingimages.php")
    .then(handleResponse)
    .catch(handleError);
}

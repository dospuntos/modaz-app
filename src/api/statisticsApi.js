import { handleResponse, handleError } from "./apiUtils";

export function getStatistics() {
  return fetch(import.meta.env.VITE_API_URL + "statistics.php")
    .then(handleResponse)
    .catch(handleError);
}

export function getMissingImages() {
  return fetch(import.meta.env.VITE_API_URL + "getmissingimages.php?delay=3")
    .then(handleResponse)
    .catch(handleError);
}

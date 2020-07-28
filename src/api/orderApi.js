import { handleResponse, handleError } from "./apiUtils";
import * as Constants from "../constants";

export function getOrders() {
  return fetch(Constants.API_URL + "getorders.php")
    .then(handleResponse)
    .catch(handleError);
}
/* 
export function getAuthorById(id) {
  return fetch(baseUrl + id)
    .then(handleResponse)
    .catch(handleError);
}

export function saveAuthor(author) {
  return fetch(baseUrl + (author.id || ""), {
    method: author.id ? "PUT" : "POST", // POST for create, PUT to update when id already exists.
    headers: { "content-type": "application/json" },
    body: JSON.stringify(author),
  })
    .then(handleResponse)
    .catch(handleError);
}

export function deleteAuthor(authorId) {
  return fetch(baseUrl + authorId, { method: "DELETE" })
    .then(handleResponse)
    .catch(handleError);
} */

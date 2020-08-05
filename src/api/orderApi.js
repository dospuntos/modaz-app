import { handleResponse, handleError } from "./apiUtils";
import * as Constants from "constants.js";

export function getOrders() {
  return fetch(Constants.API_URL + "getorders.php")
    .then(handleResponse)
    .catch(handleError);
}

export function getOrderById(id, details = false) {
  // set details to false to get order details, true to get order items
  return fetch(
    Constants.API_URL + "getorder.php?id=" + id + (details ? "&details=1" : "")
  )
    .then(handleResponse)
    .catch(handleError);
}

/* 
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

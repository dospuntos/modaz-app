import { handleResponse, handleError } from "./apiUtils";
import * as Constants from "constants.js";

export function getProducts() {
  return fetch(Constants.API_URL + "get.php")
    .then(handleResponse)
    .catch(handleError);
}

export function changeStock(id, dir = 1) {
  return fetch(Constants.API_URL + "changeStock.php", {
    method: "post",
    body: JSON.stringify({
      id: id,
      dir: dir,
    }),
  })
    .then(handleResponse)
    .catch(handleError);
}

export function createOrder(cart, user, type) {
  return fetch(Constants.API_URL + "createorder.php", {
    method: "post",
    body: JSON.stringify({
      cart: JSON.stringify(cart),
      user: user,
      type: type,
    }),
  })
    .then(handleResponse)
    .catch(handleError);
}

export function getProductById(id) {
  return fetch(Constants.API_URL + "getproduct.php?id=" + id)
    .then((response) => {
      if (!response.ok) throw new Error("Network response was not ok.");
      return response.json().then((courses) => {
        if (courses.length !== 1) throw new Error("Product not found: " + id);
        return courses[0]; // should only find one product for a given slug, so return it.
      });
    })
    .catch(handleError);
}

export function saveProduct(product) {
  return fetch(Constants.API_URL + "saveproduct.php", {
    method: "post",
    body: JSON.stringify({ ...product }),
  })
    .then(handleResponse)
    .catch(handleError);
}

export function getVariantsById(id) {
  return fetch(Constants.API_URL + "getvariants.php?id=" + id)
    .then(handleResponse)
    .catch(handleError);
}

export function saveVariant(variant) {
  return fetch(Constants.API_URL + "savevariant.php", {
    method: "post",
    body: JSON.stringify({ ...variant[0] }),
  })
    .then(handleResponse)
    .catch(handleError);
}

export function deleteVariant(variantId) {
  return fetch(Constants.API_URL + "deletevariant.php", {
    method: "post",
    body: JSON.stringify({ id: variantId }),
  })
    .then(handleResponse)
    .catch(handleError);
}

export function togglePublished(id) {
  return fetch(Constants.API_URL + "changepublished.php", {
    method: "post",
    body: JSON.stringify({ id: id }),
  })
    .then(handleResponse)
    .catch(handleError);
}

/* Additional functions to be updated 
export function saveCourse(course) {
  return fetch(baseUrl + (course.id || ""), {
    method: course.id ? "PUT" : "POST", // POST for create, PUT to update when id already exists.
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      ...course,
      // Parse authorId to a number (in case it was sent as a string).
      authorId: parseInt(course.authorId, 10),
    }),
  })
    .then(handleResponse)
    .catch(handleError);
}

export function deleteCourse(courseId) {
  return fetch(baseUrl + courseId, { method: "DELETE" })
    .then(handleResponse)
    .catch(handleError);
}
*/

import { handleResponse, handleError } from "./apiUtils";

export function getProducts() {
  return fetch(process.env.REACT_APP_API_URL + "get.php")
    .then(handleResponse)
    .catch(handleError);
}

export function changeStock(id, dir = 1) {
  return fetch(process.env.REACT_APP_API_URL + "changeStock.php", {
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
  return fetch(process.env.REACT_APP_API_URL + "createorder.php", {
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
  return fetch(process.env.REACT_APP_API_URL + "getproduct.php?id=" + id)
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
  return fetch(process.env.REACT_APP_API_URL + "saveproduct.php", {
    method: "post",
    body: JSON.stringify({ ...product }),
  })
    .then(handleResponse)
    .catch(handleError);
}

export function getVariantsById(id) {
  return fetch(process.env.REACT_APP_API_URL + "getvariants.php?id=" + id)
    .then(handleResponse)
    .catch(handleError);
}

export function saveVariant(variant) {
  return fetch(process.env.REACT_APP_API_URL + "savevariant.php", {
    method: "post",
    body: JSON.stringify({ ...variant[0] }),
  })
    .then(handleResponse)
    .catch(handleError);
}

export function deleteVariant(variantId) {
  return fetch(process.env.REACT_APP_API_URL + "deletevariant.php", {
    method: "post",
    body: JSON.stringify({ id: variantId }),
  })
    .then(handleResponse)
    .catch(handleError);
}

export function deleteProduct(id) {
  return fetch(process.env.REACT_APP_API_URL + "deleteproduct.php", {
    method: "post",
    body: JSON.stringify({ id: id }),
  })
    .then(handleResponse)
    .catch(handleError);
}

export function togglePublished(id) {
  return fetch(process.env.REACT_APP_API_URL + "changepublished.php", {
    method: "post",
    body: JSON.stringify({ id: id }),
  })
    .then(handleResponse)
    .catch(handleError);
}

export function toggleFeatured(id) {
  return fetch(process.env.REACT_APP_API_URL + "changefeatured.php", {
    method: "post",
    body: JSON.stringify({ id: id }),
  })
    .then(handleResponse)
    .catch(handleError);
}

export function searchUPC(upc) {
  return fetch(process.env.REACT_APP_API_URL + "searchupc.php", {
    method: "post",
    body: JSON.stringify({ upc: upc }),
  })
    .then(handleResponse)
    .catch(handleError);
}

export function resetStock() {
  return fetch(process.env.REACT_APP_API_URL + "resetstock.php?confirm=2egcryr")
    .then(handleResponse)
    .catch(handleError);
}

export function getCategories() {
  return fetch(process.env.REACT_APP_API_URL + "getcategories.php")
    .then(handleResponse)
    .catch(handleError);
}

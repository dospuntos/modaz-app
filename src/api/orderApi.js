import { handleResponse, handleError } from "./apiUtils";

export function getOrders() {
  return fetch(process.env.REACT_APP_API_URL + "getorders.php")
    .then(handleResponse)
    .catch(handleError);
}

export function getOrderById(id, details = false) {
  // set details to false to get order details, true to get order items
  return fetch(
    process.env.REACT_APP_API_URL +
      "getorder.php?id=" +
      id +
      (details ? "&details=1" : "")
  )
    .then(handleResponse)
    .catch(handleError);
}

export function addOrderItem(data) {
  return fetch(process.env.REACT_APP_API_URL + "addorderitem.php", {
    method: "post",
    body: JSON.stringify({
      product_id: data.product_id,
      order_id: data.order_id,
      order_item_price: data.order_item_price,
    }),
  })
    .then(handleResponse)
    .catch(handleError);
}

export function saveOrderItem(data) {
  return fetch(process.env.REACT_APP_API_URL + "saveorderitem.php", {
    method: "post",
    body: JSON.stringify({
      id: data.id,
      quantity: data.quantity,
      price: data.price,
    }),
  })
    .then(handleResponse)
    .catch(handleError);
}

export function deleteOrderItem(id) {
  return fetch(process.env.REACT_APP_API_URL + "deleteorderitem.php", {
    method: "post",
    body: JSON.stringify({ id: id }),
  })
    .then(handleResponse)
    .catch(handleError);
}

export function changeOrderState(id, state) {
  return fetch(process.env.REACT_APP_API_URL + "setorderstate.php", {
    method: "post",
    body: JSON.stringify({
      id: id,
      state: state,
    }),
  })
    .then(handleResponse)
    .catch(handleError);
}

export function quickOrder(vid, price = 0) {
  return fetch(process.env.REACT_APP_API_URL + "createquickorder.php", {
    method: "post",
    body: JSON.stringify({
      vid: vid,
      price: price,
    }),
  })
    .then(handleResponse)
    .catch(handleError);
}

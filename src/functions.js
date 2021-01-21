// Return default image from image JSON
export function getDefaultImage(imgJSON) {
  let images = validateJSON(imgJSON);
  const img =
    images["0"]["image"] !== "0" || images["0"]["image"] !== ""
      ? process.env.REACT_APP_PROD_IMG_URL + images["0"]["image"]
      : process.env.REACT_APP_DEFAULT_IMG_URL;
  // Return full image url
  return img;
}

// Return all images from JSON as array
export function getAllImages(imgJSON) {
  return validateJSON(imgJSON);
}

export function getImagesByColor(imgJSON, color) {
  if (imgJSON === "" || imgJSON === null || imgJSON === "undefined")
    return process.env.REACT_APP_DEFAULT_IMG_URL;
  // Return first image that matches color, default image if none
  let images;
  try {
    images = JSON.parse(imgJSON);
  } catch (e) {
    // JSON error, return default image
    console.warn("Invalid JSON - " + imgJSON);
    return [];
  }

  const retval = images.find((image) => image.color === color);
  return retval
    ? process.env.REACT_APP_PROD_IMG_URL + retval.image
    : process.env.REACT_APP_PROD_IMG_URL + images["0"]["image"];
}

// Run some internal checks for possible errors in JSON encoded images
function validateJSON(imgJSON) {
  if (
    imgJSON === "" ||
    imgJSON === null ||
    typeof imgJSON === "undefined" ||
    imgJSON.startsWith('[{"image":"","color":"') ||
    !imgJSON.startsWith('[{"image":')
  ) {
    // Return default JSON
    console.warn(
      "There was an error decoding image JSON - default value used. - " +
        imgJSON
    );
    return JSON.parse('[{"image":"default.png","color":""}]');
  } else {
    return JSON.parse(imgJSON);
  }
}

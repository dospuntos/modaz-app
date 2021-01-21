// Return default image from image JSON
export function getDefaultImage(imgJSON) {
  let images = validateJSON(imgJSON);
  return process.env.REACT_APP_PROD_IMG_URL + images["0"]["image"];
}

// Return all images from JSON as array
export function getAllImages(imgJSON) {
  return validateJSON(imgJSON);
}

export function getImageCount(imgJSON) {
  return validateJSON(imgJSON).length;
}

export function getImagesByColor(imgJSON, color) {
  let images = validateJSON(imgJSON);
  if (color === null || color === "") color = "multi";

  const retval = images.find(
    (image) => image.color.toLowerCase() === color.toLowerCase()
  );
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
    return JSON.parse('[{"image":"default.png","color":"multi"}]');
  } else {
    return JSON.parse(imgJSON);
  }
}

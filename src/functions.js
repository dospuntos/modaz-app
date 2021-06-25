// !!Return default image from image JSON!!
// API v2 returns array with images, this will be removed in future versions

export function getDefaultImage(imgJSON) {
  return process.env.REACT_APP_PROD_IMG_URL + imgJSON["0"]["image"];
}

// Return all images from JSON as array
export function getAllImages(imgJSON) {
  return imgJSON;
}

export function getImageCount(imgJSON) {
  return imgJSON.length;
}

export function getImagesByColor(imgJSON, color) {
  if (color === null || color === "") color = "multi";

  const retval = imgJSON.find(
    (image) => image.color.toLowerCase() === color.toLowerCase()
  );
  return retval
    ? process.env.REACT_APP_PROD_IMG_URL + retval.image
    : process.env.REACT_APP_PROD_IMG_URL + imgJSON["0"]["image"];
}

// Run some internal checks for possible errors in JSON encoded images
/* function validateJSON(imgJSON) {
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
} */

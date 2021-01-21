// Return default image from image JSON
export function getDefaultImage(imgJSON) {
  let images;
  try {
    images = JSON.parse(imgJSON);
  } catch (e) {
    // JSON error, return default image
    console.warn("Invalid JSON - " + imgJSON);
    return process.env.REACT_APP_DEFAULT_IMG_URL;
  }
  const img =
    images["0"]["image"] !== "0" || images["0"]["image"] !== ""
      ? process.env.REACT_APP_PROD_IMG_URL + images["0"]["image"]
      : process.env.REACT_APP_DEFAULT_IMG_URL;
  // Return full image url
  return img;
}

// Return all images from JSON as array
export function getAllImages(imgJSON) {
  let images;
  try {
    images = JSON.parse(imgJSON);
  } catch (e) {
    // JSON error, return empty array
    console.warn("Invalid JSON - " + imgJSON);
    return [];
  }
  // Return full image url
  return images;
}

export function getImagesByColor(imgJSON, color) {
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

import React, { useState, useEffect } from "react";
import { getMissingImages } from "api/statisticsApi";

function MissingImages() {
  const [missing, setMissing] = useState([]);

  useEffect(() => {
    getMissingImages().then((result) => {
      setMissing(result);
      console.log(result);
    });
  }, []);

  function handleClick(e, image) {
    e.preventDefault();
    if (navigator.clipboard !== undefined) {
      //Chrome
      navigator.clipboard.writeText(image).then(
        function () {
          window.open(e.target.href);
        },
        function (err) {
          console.error("Async: Could not copy text: ", err);
        }
      );
    } else if (window.clipboardData) {
      // Internet Explorer
      window.clipboardData.setData("Text", image);
      window.open(e.target.href);
    }
  }
  return (
    <ul>
      {missing.map((item, index) => {
        return (
          <li key={index}>
            <a
              href={
                "https://www.google.com/search?q=" +
                item.name.replace(/ /g, "+") +
                "&tbm=isch"
              }
              target="imagesearch"
              rel="noopener noreferrer"
              onClick={(e) => handleClick(e, item.images)}
            >
              {item.name}
            </a>
          </li>
        );
      })}
    </ul>
  );
}

export default MissingImages;

/* https://www.google.com/search?q=A+Tribe+Called+Zumba+Instructor+Tank&tbm=isch */

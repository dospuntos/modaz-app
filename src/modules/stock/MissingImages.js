import { useState, useEffect } from "react";
import { getMissingImages } from "api/statisticsApi";
import CircularProgress from "@mui/material/CircularProgress";

function MissingImages() {
  const [missing, setMissing] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMissingImages().then((result) => {
      setMissing(result);
      setLoading(false);
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

  if (loading) return <CircularProgress />;

  return (
    <ul>
      {!missing.length && (
        <li>
          <strong>No hay imágenes faltantes.</strong>
        </li>
      )}
      {missing.map((item, index) => {
        const imageUrl = JSON.parse(item.images)[0].image;
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
              onClick={(e) => handleClick(e, imageUrl)}
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

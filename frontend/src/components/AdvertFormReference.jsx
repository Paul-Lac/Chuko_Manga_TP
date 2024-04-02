import { useState, useEffect } from "react";
import axios from "axios";
import PropTypes from "prop-types";

import "./AdvertFormReference.css";

function AdvertFormReference(props) {
  const {
    batch,
    handleSelectedManga,
    setBatch,
    setVolumeId,
    volumeList,
    volumeAnounce,
    mangaAnounce,
    isNewAdvertPage,
  } = props;

  const [mangaList, setMangaList] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3310/api/mangas")
      .then((response) => {
        // console.info("Mangas are", response.data);
        setMangaList(response.data);
      })
      .catch((error) => {
        console.error("Error fetching conditions and mangas:", error);
      });
  }, []);

  console.info(
    "récupération du batch de l'annonce dans advertformreference :",
    batch
  );
  console.info(
    "récupération du volume de l'annonce dans advertformreference :",
    volumeAnounce
  );

  let volumeText;
  if (isNewAdvertPage) {
    volumeText = "Sélectionne le volume";
  } else {
    volumeText = batch !== 1 ? "Sélectionne le volume" : volumeAnounce;
  }

  return (
    <>
      <div className="advert-tab-container">
        <button
          type="button"
          id="button-tome"
          onClick={() => setBatch(0)}
          className={batch === 0 ? "active-tab" : "inactive-tab"}
        >
          Vends un tome
        </button>
        <button
          type="button"
          id="button-batch"
          onClick={() => setBatch(1)}
          className={batch === 1 ? "active-tab" : "inactive-tab"}
        >
          Vends un lot
        </button>
      </div>
      <div className="advert-ref">Référencement</div>

      {batch === 0 ? (
        <>
          <label htmlFor="manga" className="advert-instruction">
            Associe ton annonce au manga correspondant dans la liste
          </label>
          <select
            id="manga"
            className="advert-select"
            name="manga_id"
            onChange={(e) => {
              handleSelectedManga(e);
            }}
          >
            <option value="">
              {isNewAdvertPage
                ? "Sélectionne ton manga"
                : (batch === 0 && !isNewAdvertPage && mangaAnounce) ||
                  (batch === 1 && !isNewAdvertPage && "Sélectionne ton manga")}
            </option>
            {mangaList.map((manga) => (
              <option key={manga.id} value={manga.id}>
                {manga.title}
              </option>
            ))}
          </select>
          <label htmlFor="volume" className="advert-instruction">
            Associe ton annonce au volume correspondant dans la liste
          </label>
          <select
            id="volume"
            className="advert-select"
            name="volume_id"
            onChange={(e) => setVolumeId(e.target.value)}
          >
            <option value="">{volumeText}</option>
            {volumeList.map((volumeItem) => (
              <option key={volumeItem.id} value={volumeItem.id}>
                {volumeItem.title}
              </option>
            ))}
          </select>
        </>
      ) : (
        <>
          <label htmlFor="manga" className="advert-instruction">
            Associe ton annonce au manga correspondant dans la liste
          </label>
          <select
            id="manga"
            className="advert-select"
            name="manga_id"
            onChange={(e) => {
              handleSelectedManga(e);
            }}
          >
            <option value="">
              {isNewAdvertPage
                ? "Sélectionne ton manga"
                : batch === 1 && !isNewAdvertPage && mangaAnounce}
            </option>
            {mangaList.map((manga) => (
              <option key={manga.id} value={manga.id}>
                {manga.title}
              </option>
            ))}
          </select>
        </>
      )}
    </>
  );
}
export default AdvertFormReference;

AdvertFormReference.propTypes = {
  batch: PropTypes.number.isRequired,
  handleSelectedManga: PropTypes.func.isRequired,
  setBatch: PropTypes.func.isRequired,
  setVolumeId: PropTypes.func.isRequired,
  volumeList: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
    })
  ).isRequired,
  isNewAdvertPage: PropTypes.bool.isRequired,
  mangaAnounce: PropTypes.string.isRequired,
  volumeAnounce: PropTypes.string.isRequired,
};

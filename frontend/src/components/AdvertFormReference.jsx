import { useState, useEffect } from "react";
import axios from "axios";
import PropTypes from "prop-types";

import "./AdvertFormReference.css";

function AdvertFormReference(props) {
  const { batch, handleSelectedManga, setBatch, setVolumeId, volumeList } =
    props;

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
      {/* <div className="advert-ref">Référencement</div> */}

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
            <option value="">Sélectionne ton manga</option>
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
            <option value="">Sélectionne le volume</option>
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
            <option value="">Sélectionne ton manga</option>
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
};

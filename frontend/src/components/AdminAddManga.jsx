import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import "./AdminAddManga.css";

function AdminAddManga({ setTabShow }) {
  const [mangaTitle, setMangaTitle] = useState("");
  const [description, setDescription] = useState("");
  const [author, setAuthor] = useState("");
  const [scriptWriter, setScriptWriter] = useState("");
  const [illustrator, setIllustrator] = useState("");
  const [releaseDate, setReleaseDate] = useState(null);
  const [publishingHouse, setPublishingHouse] = useState(null);
  const [genre, setGenre] = useState(null);
  const [isFinishedJapan, setIsFinishedJapan] = useState(false);
  const [isFinishedFrance, setIsFinishedFrance] = useState(false);
  const [file, setFile] = useState(null);

  const [genreList, setGenreList] = useState([]);
  const [publishingHouseList, setPublishingHouseList] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3310/api/genres")
      .then((response) => {
        // console.info("Mangas are", response.data);
        setGenreList(response.data);
      })
      .catch((error) => {
        console.error("Error fetching genre:", error);
      });
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:3310/api/publishers")
      .then((response) => {
        // console.info("Mangas are", response.data);
        setPublishingHouseList(response.data);
      })
      .catch((error) => {
        console.error("Error fetching publishing house:", error);
      });
  }, []);

  const handleFileChange = (e) => {
    e.preventDefault();
    setFile(e.target.files[0]);
  };

  const convertToInteger = (value) => (value ? 1 : 0);

  // Submit form and redirect to user's profile
  const handleSubmit = (e) => {
    e.preventDefault();
    // console.info("upload files", files);
    const formData = new FormData();
    formData.append("title", mangaTitle);
    formData.append("description", description);
    formData.append("author", author);
    formData.append("script_writer", scriptWriter);
    formData.append("illustrator", illustrator);
    formData.append("release_date", releaseDate);
    formData.append("publishing_house_id", publishingHouse);
    console.info(publishingHouse);
    formData.append("genre_id", genre);
    formData.append("finish_japan", convertToInteger(isFinishedJapan));
    formData.append("finish_france", convertToInteger(isFinishedFrance));
    formData.append("file", file);
    console.info("Data to send:", formData);
    axios
      .post("http://localhost:3310/api/mangas", formData)
      .then((res) => {
        console.info("Manga created successfully", res.data);
        setTabShow(true);
      })
      .catch((error) => {
        console.error("Error creating manga", error);
      });
  };

  return (
    <div className="manga-form-container">
      <label htmlFor="title" className="admin-label">
        Titre *
      </label>
      <input
        className=""
        type="text"
        id="title"
        name="title_search_manga"
        value={mangaTitle}
        onChange={(e) => setMangaTitle(e.target.value)}
        placeholder="ex: Naruto"
        required="required"
      />
      <label htmlFor="description" className="admin-label">
        Description *
      </label>
      <textarea
        className=""
        type="text"
        id="description"
        name="description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="ex: L'histoire commence pendant l'adolescence de Naruto, vers ses douze ans. Orphelin cancre et grand farceur, il fait toutes les bêtises possibles pour se faire remarquer..."
        required="required"
      />
      <div>
        <label htmlFor="release_date" className="admin-label">
          Année de sortie *
        </label>
        <input
          className=""
          type="text"
          id="release_date"
          name="release_date"
          value={releaseDate}
          onChange={(e) => setReleaseDate(e.target.value)}
          placeholder="ex: 1999"
          required="required"
        />
      </div>
      <div className="container-form">
        <div className="container-authors">
          <label htmlFor="author" className="admin-label">
            Auteur *
          </label>
          <input
            className=""
            type="text"
            id="author"
            name="author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            placeholder="ex: Hyuga Natsu"
            required="required"
          />
        </div>
        <div className="container-authors">
          <label htmlFor="script_writer" className="admin-label">
            Scénariste *
          </label>
          <input
            className=""
            type="text"
            id="script_writer"
            name="script_writer"
            value={scriptWriter}
            onChange={(e) => setScriptWriter(e.target.value)}
            placeholder="ex: Hyuga Natsu"
            required="required"
          />
        </div>
        <div className="container-authors">
          <label htmlFor="illustrator" className="admin-label">
            Illustrateur *
          </label>
          <input
            className=""
            type="text"
            id="illustrator"
            name="illustrator"
            value={illustrator}
            onChange={(e) => setIllustrator(e.target.value)}
            placeholder="ex: Hyuga Natsu"
            required="required"
          />
        </div>
      </div>
      <div className="container-form">
        <div className="item-to-select">
          <label htmlFor="genre" className="admin-label">
            Genre
          </label>
          <select
            id="genre"
            className=""
            name="genre"
            onChange={(e) => setGenre(e.target.value)}
          >
            <option value="">Genre</option>
            {genreList.map((item) => (
              <option key={item.id} value={item.id}>
                {item.genre}
              </option>
            ))}
          </select>
        </div>
        <div className="item-to-select">
          <label htmlFor="publishing_house" className="admin-label">
            Maison d'édition
          </label>
          <select
            id="publishing_house"
            className=""
            name="publishing_house"
            onChange={(e) => {
              console.info(e.target.value);
              setPublishingHouse(e.target.value);
            }}
          >
            <option value={publishingHouse}>Maison d'édition</option>
            {publishingHouseList.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name_publishing_house}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="container-form">
        <div className="item-to-select">
          <label htmlFor="finished_japan" className="admin-label">
            Terminé au Japon
          </label>
          <input
            type="checkbox"
            id="finished_japan"
            name="finished_japan"
            checked={isFinishedJapan}
            onChange={(e) => setIsFinishedJapan(e.target.checked)}
          />
        </div>
        <div className="item-to-select">
          <label htmlFor="finished_france" className="admin-label">
            Terminé en France
          </label>
          <input
            type="checkbox"
            id="finished_france"
            name="finished_france"
            checked={isFinishedFrance}
            onChange={(e) => setIsFinishedFrance(e.target.checked)}
          />
        </div>
      </div>
      <label htmlFor="image" className="admin-label">
        Image
      </label>
      <input id="file" type="file" onChange={handleFileChange} />

      <button className="admin-submit-btn" type="submit" onClick={handleSubmit}>
        Ajouter
      </button>
    </div>
  );
}

export default AdminAddManga;

AdminAddManga.propTypes = {
  setTabShow: PropTypes.func.isRequired,
};

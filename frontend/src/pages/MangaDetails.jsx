import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import MangaVolume from "../components/MangaVolume";

import "./MangaDetails.css";

function MangaDetails({ id: propId, showVolumes = true }) {
  const [manga, setManga] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const { id: paramId } = useParams();
  const mangaId = propId || paramId;

  useEffect(() => {
    axios
      .get(`http://localhost:3310/api/mangas/${mangaId}`)
      .then((response) => {
        // console.info("Réponse de l'API:", response.data);
        setManga(response.data[0]);
        setIsLoading(false);
      })
      // eslint-disable-next-line no-shadow
      .catch((error) => {
        console.error("Erreur Axios:", error);
        setError(error.toString());
        setIsLoading(false);
      });
  }, [mangaId]);

  if (isLoading) return <div>Chargement...</div>;
  if (error) return <div>Erreur : {error}</div>;
  if (!manga) return <div>Aucun détail trouvé</div>;

  const formatDate = (isoString) => {
    return new Date(isoString).toLocaleDateString("fr-FR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const imageUrl = `http://localhost:3310${manga.image}`;

  return (
    <div className="naruto-details container_limit">
      <div className="top-section">
        <div className="image-container">
          <img src={imageUrl} alt={manga.title} />
        </div>
        <div className="description-manga">
          <h2 className="title-manga">{manga.title}</h2>
          <p>{manga.description}</p>
        </div>
      </div>
      <div className="bottom-section">
        <div className="status-manga">
          <div className="grid-status-manga">
            <p>
              <strong>Genre</strong>
            </p>
            <p className="genre-info">
              <span className="genre-value">{manga.genre_genre}</span>
            </p>
            <p>
              <strong>Editeur</strong>
            </p>
            <p>{manga.name_publishing_house}</p>
            <p>
              <strong>Date de sortie</strong>
            </p>
            <p>{formatDate(manga.release_date)}</p>
            <p>
              <strong>Au Japon</strong>
            </p>
            <p>{manga.finish_japan ? "Terminée" : "Pas terminée"}</p>
            <p>
              <strong>En France</strong>
            </p>
            <p>{manga.finish_france ? "Terminée" : "Pas terminée"}</p>
          </div>
        </div>
        <div className="authors-container">
          <h2 className="title-authors">Auteurs</h2>
          <div className="data-authors">
            <div className="authors-box">
              <p className="data-authors-head">Auteur</p>
              <p>{manga.author}</p>
            </div>
            <div className="authors-box">
              <p className="data-authors-head">Scénariste</p>
              <p>{manga.script_writer}</p>
            </div>
            <div className="authors-box">
              <p className="data-authors-head">Illustrateur</p>
              <p>{manga.illustrator}</p>
            </div>
          </div>
        </div>
      </div>
      {showVolumes && <MangaVolume />}
    </div>
  );
}

MangaDetails.propTypes = {
  id: PropTypes.number,
  showVolumes: PropTypes.bool,
};

MangaDetails.defaultProps = {
  id: undefined,
  showVolumes: true,
};

export default MangaDetails;

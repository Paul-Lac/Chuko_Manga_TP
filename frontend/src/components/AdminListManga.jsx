/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/control-has-associated-label */
import { useState, useEffect } from "react";
import axios from "axios";
import AdminSeeManga from "./AdminSeeManga";
import AdminUpdateManga from "./AdminUpdateManga";
import "./AdminListManga.css";

function AdminListManga() {
  const [seeManga, setSeeManga] = useState(false);
  const [updateManga, setUpdateManga] = useState(false);
  const [mangaList, setMangaList] = useState([]);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  useEffect(() => {
    axios
      .get(`http://localhost:3310/api/mangas`)
      .then((response) => {
        console.info("Réponse de l'API:", response.data);
        setMangaList(response.data);
      })
      .catch((error) => {
        console.error("Erreur Axios:", error);
      });
  }, []);

  const handleShowCLick = () => {
    setSeeManga(!seeManga);
  };

  const handleUpdateCLick = () => {
    setUpdateManga(!updateManga);
  };

  const toggleDeleteModal = () => {
    setDeleteModalOpen(!deleteModalOpen);
  };

  const handleDeleteManga = () => {};

  return (
    <>
      {mangaList.map((manga) => (
        <div className="manga-section" key={manga.id}>
          <div className="overview-container">
            <img
              className="admin-manga-img"
              src={`http://localhost:3310${manga.image}`}
              alt={manga.title}
            />
            <h2 className="admin-manga-title">{manga.title}</h2>
            <div className="btn-action-container">
              <button
                className="btn-action"
                type="button"
                onClick={handleShowCLick}
              >
                Voir
              </button>
              <button
                className="btn-action"
                type="button"
                onClick={handleUpdateCLick}
              >
                Modifier
              </button>
              <button
                className="btn-action"
                type="button"
                onClick={toggleDeleteModal}
              >
                Supprimer
              </button>
            </div>
          </div>
          {seeManga && <AdminSeeManga />}
          {updateManga && <AdminUpdateManga />}
          {deleteModalOpen && (
            <div className="modal">
              <div
                role="button"
                tabIndex={0}
                onClick={toggleDeleteModal}
                className="overlay-manga"
              />
              <div className="delete-modal-content">
                <h2 className="delete-message-modal">Supprimer le manga</h2>
                <div className="confirmation-container">
                  <button
                    className="close-delete-modal"
                    type="button"
                    onClick={toggleDeleteModal}
                  >
                    Annuler
                  </button>
                  <button
                    className="confirm-delete"
                    type="button"
                    onClick={() => handleDeleteManga(manga.id)}
                  >
                    Confirmer
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      ))}
    </>
  );
}

export default AdminListManga;

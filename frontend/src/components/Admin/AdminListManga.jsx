/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/control-has-associated-label */
import { useState, useEffect } from "react";
import axios from "axios";
import MangaDetails from "../../pages/MangaDetails";
import AdminUpdateManga from "./AdminUpdateManga";
import "./AdminListManga.css";

function AdminListManga() {
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [mangaList, setMangaList] = useState([]);
  const [selectedMangaId, setSelectedMangaId] = useState(null);
  const [seeModalOpen, setSeeModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  useEffect(() => {
    axios
      .get(`http://localhost:3310/api/mangas-fk`)
      .then((response) => {
        console.info("Réponse de l'API:", response.data);
        setMangaList(response.data);
      })
      .catch((error) => {
        console.error("Erreur Axios:", error);
      });
  }, []);

  const deletableManga = (mangaId) => {
    const manga = mangaList.find((item) => item.id === mangaId);
    if (!manga) {
      return false;
    }
    // Si volume_ids et advert_ids valent [null], le manga est supprimable
    return (
      JSON.stringify(manga.volume_ids) === JSON.stringify([null]) &&
      JSON.stringify(manga.advert_ids) === JSON.stringify([null])
    );
  };

  const toggleSeeModal = (mangaId) => {
    setSeeModalOpen(!seeModalOpen);
    setSelectedMangaId(mangaId);
    if (!seeModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  };

  const toggleUpdateModal = (mangaId) => {
    setUpdateModalOpen(!updateModalOpen);
    setSelectedMangaId(mangaId);
    if (!updateModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  };

  const toggleDeleteModal = (mangaId = null) => {
    setDeleteModalOpen(!deleteModalOpen);
    setSelectedMangaId(mangaId);
    if (!deleteModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    // console.info("mangaId", mangaId);
  };

  const handleDeleteManga = (mangaId) => {
    console.info("mangaId:", mangaId);
    axios
      .delete(`http://localhost:3310/api/mangas/${mangaId}`)
      .then((response) => {
        console.info("Manga deleted successfully:", response.data);
        // Update MangaList
        const updatedMangaList = mangaList.filter(
          (manga) => manga.id !== mangaId
        );
        setMangaList(updatedMangaList);
        toggleDeleteModal();
      })
      .catch((error) => {
        console.error("Error deleting manga:", error);
      });
  };

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
                onClick={() => toggleSeeModal(manga.id)}
              >
                Voir
              </button>
              <button
                className="btn-action"
                type="button"
                onClick={() => toggleUpdateModal(manga.id)}
              >
                Modifier
              </button>
              {deletableManga(manga.id) ? (
                <button
                  className="btn-action"
                  type="button"
                  onClick={() => toggleDeleteModal(manga.id)}
                >
                  Supprimer
                </button>
              ) : (
                <button
                  className="btn-disabled"
                  type="button"
                  onClick={() => toggleDeleteModal(manga.id)}
                >
                  Supprimer
                </button>
              )}
            </div>
          </div>
          {updateModalOpen && (
            <div className="admin-modal">
              <div
                role="button"
                tabIndex={0}
                onClick={() => toggleUpdateModal()}
                className="overlay-manga"
              />
              <div className="see-modal-content">
                <AdminUpdateManga id={selectedMangaId} />
              </div>
            </div>
          )}
        </div>
      ))}
      {seeModalOpen && (
        <div className="admin-modal">
          <div
            role="button"
            tabIndex={0}
            onClick={() => toggleSeeModal()}
            className="overlay-manga"
          />
          <div className="see-modal-content">
            <MangaDetails id={selectedMangaId} showVolumes={false} />
          </div>
        </div>
      )}
      {deleteModalOpen && (
        <div className="admin-modal">
          <div
            role="button"
            tabIndex={0}
            onClick={() => toggleDeleteModal()}
            className="overlay-manga"
          />
          <div className="delete-modal-content">
            <h2 className="delete-message-modal">Supprimer le manga</h2>
            <div className="confirmation-container">
              <button
                className="cancel-delete"
                type="button"
                onClick={() => toggleDeleteModal()}
              >
                Annuler
              </button>
              <button
                className="confirm-delete"
                type="button"
                onClick={() => handleDeleteManga(selectedMangaId)}
              >
                Confirmer
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default AdminListManga;

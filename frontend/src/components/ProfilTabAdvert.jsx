import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import axiosInstance from "../services/axiosInstance";
import AdvertCard from "./AdvertCard";
import "./ProfilTabAdvert.css";

function ProfilTabAdvert() {
  const { id } = useParams();
  const [adverts, setAdverts] = useState([]);
  const [modalDelete, setModalDelete] = useState(false);
  const [selectedAdvertId, setSelectedAdvertId] = useState("");

  // Fetch user's adverts
  useEffect(() => {
    const fetchAdverts = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3310/api/users/${id}/adverts`
        );
        setAdverts(response.data);
      } catch (error) {
        console.error("Error fetching adverts:", error);
      }
    };

    fetchAdverts();
  }, [id]);

  // Toggle modal handling advert deletion
  const toggleModalDelete = (advertId) => {
    setModalDelete(!modalDelete);
    setSelectedAdvertId(advertId);
    // if (!modalDelete) {
    //   document.body.style.overflow = "hidden";
    // } else {
    //   document.body.style.overflow = "auto";
    // }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Escape") {
      toggleModalDelete();
    }
  };

  // Fonction handling advert deletion
  const handleDeleteAdvert = async (advertId) => {
    try {
      const response = await axiosInstance.delete(`/adverts/${advertId}`, {
        withCredentials: true,
      });
      console.info("Advert deleted successfully", response.data);
      const updateAdvertList = adverts.filter(
        (advert) => advert.id !== advertId
      );
      setAdverts(updateAdvertList);
      toggleModalDelete();
    } catch (error) {
      console.error("Error deleting advert:", error);
    }
  };

  return (
    <>
      <div className="tab-content">
        {adverts.length > 0 ? (
          adverts.map((advert) => (
            <div className="advert-unit" key={advert.id}>
              <AdvertCard
                advert={advert}
                showUserSection={false}
                showFavorite={false}
              />
              <button
                className="delete-btn"
                type="button"
                onClick={() => toggleModalDelete(advert.id)}
              >
                Supprimer
              </button>
            </div>
          ))
        ) : (
          <p>Vous n'avez aucune annonce en vente.</p>
        )}
      </div>
      {modalDelete && (
        <div className="modal-delete">
          <div
            role="button"
            tabIndex={0}
            onClick={toggleModalDelete}
            onKeyDown={handleKeyDown}
            aria-label="Cliquez pour fermer"
            className="overlay-delete"
          />
          <div className="modal-content">
            <h2 className="message-modal">Supprimer l'article</h2>
            <div className="modal-btn-container">
              <button
                className="confirm-delete"
                type="button"
                onClick={() => handleDeleteAdvert(selectedAdvertId)}
              >
                Confirmer
              </button>
              <button
                className="cancel-delete"
                type="button"
                onClick={toggleModalDelete}
              >
                Annuler
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ProfilTabAdvert;

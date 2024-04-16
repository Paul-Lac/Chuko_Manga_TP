/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import AdvertCard from "./AdvertCard";
import "./ProfilTab.css";

function ProfilTab() {
  const { id } = useParams();
  const [adverts, setAdverts] = useState("");
  const [evaluations, setEvaluations] = useState([]);
  const [historyOrders, setHistoryOrders] = useState([]);
  const [ongletActif, setongletActif] = useState("Annonces");
  const [modalDelete, setModalDelete] = useState(false);
  const [selectedAdvertId, setSelectedAdvertId] = useState("");

  useEffect(() => {
    fetch(`http://localhost:3310/api/users/${id}/adverts`)
      .then((res) => res.json())
      .then((data) => {
        // console.info("Mes annonces dans OngletProfil:", data);
        setAdverts(data);
      });
  }, [id]);

  // useEffect(() => {
  //   fetch(`http://localhost:3310/api/users/${id}/feedbacks`, {
  //     credentials: "include", // Ceci permet d'inclure les cookies dans la requête
  //   })
  //     .then((res) => res.json())
  //     .then((data) => {
  //       // console.info("commentairesTableau:", data);
  //       setEvaluations(data);
  //     });
  // }, [id]);

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3310/api/users/${id}/feedbacks`,
          {
            withCredentials: true,
          }
        );
        // console.info("commentairesTableau:", response.data);
        setEvaluations(response.data);
      } catch (error) {
        console.error("Error fetching feedbacks:", error);
      }
    };

    fetchFeedbacks();
  }, [id]);

  useEffect(() => {
    fetch(`http://localhost:3310/api/buyers/${id}/orders`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        console.info("Mon historique d'achat:", data);
        setHistoryOrders(data);
      });
  }, [id]);

  function renderStars(averageRating) {
    const fullStars = Math.floor(averageRating); // Nombre d'étoiles pleines
    const decimalPart = averageRating - fullStars; // Partie décimale de la note
    let partialStar = ""; // Classe pour l'étoile partielle
    // Déterminer la classe de l'étoile partielle en fonction de la partie décimale
    if (decimalPart >= 0.75) {
      partialStar = "half-star";
    } else if (decimalPart >= 0.25) {
      partialStar = "half-star";
    } else {
      partialStar = "empty-star";
    }
    // Création des étoiles en fonction du nombre d'étoiles pleines et de l'étoile partielle
    const stars = [];
    for (let i = 0; i < 5; i += 1) {
      if (i < fullStars) {
        stars.push(
          <div key={i} className="star full-star">
            ★
          </div>
        );
      } else if (i === fullStars && partialStar === "half-star") {
        stars.push(
          <div key={i} className={`star ${partialStar}`}>
            ★
          </div>
        );
      } else {
        stars.push(
          <div key={i} className="star empty-star">
            ★
          </div>
        );
      }
    }
    return <div className="starcontainer">{stars}</div>;
  }

  const averageRating =
    evaluations.reduce(
      (total, evaluation) => total + parseFloat(evaluation.average_rating),
      0
    ) / evaluations.length;

  function orderStatusClass(status) {
    switch (status) {
      case "completed":
        return "completed";
      case "pending":
        return "pending";
      case "cancelled":
        return "cancelled";
      default:
        return "default";
    }
  }
  const toggleModalDelete = (advertId) => {
    setModalDelete(!modalDelete);
    setSelectedAdvertId(advertId);
    // console.info("modal open", modalDelete);
    if (!modalDelete) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      toggleModalDelete();
    }
  };

  const handleDeleteAdvert = (advertId) => {
    axios
      .delete(`http://localhost:3310/api/adverts/${advertId}`, {
        withCredentials: true,
      })
      .then((response) => {
        console.info("Success deleting advert:", response.data);

        const updateAdvertList = adverts.filter(
          (advert) => advert.id !== advertId
        );
        setAdverts(updateAdvertList);
        toggleModalDelete();
      })
      .catch((error) => {
        console.error("Error deleting advert:", error);
      });
  };

  return (
    <div className="container-onglets">
      <div className="container-button">
        <button
          type="button"
          className={
            ongletActif === "Annonces"
              ? "button-onglet selected"
              : "button-onglet"
          }
          onClick={() => setongletActif("Annonces")}
        >
          Annonces
        </button>
        <button
          type="button"
          className={
            ongletActif === "Évaluations"
              ? "button-onglet selected"
              : "button-onglet"
          }
          onClick={() => setongletActif("Évaluations")}
        >
          Évaluations
        </button>
        <button
          type="button"
          className={
            ongletActif === "Achat" ? "button-onglet selected" : "button-onglet"
          }
          onClick={() => setongletActif("Achat")}
        >
          Achats
        </button>
      </div>

      <div className="container-information">
        {ongletActif === "Annonces" && (
          <div className="tab-content">
            {adverts.length > 0 ? (
              adverts.map((advert) => (
                <div className="advert-unit" key={advert.id}>
                  <AdvertCard
                    key={advert.id}
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
        )}

        {modalDelete && (
          <div className="modal-delete">
            <div
              role="button"
              tabIndex={0}
              onClick={toggleModalDelete}
              onKeyPress={handleKeyPress}
              aria-label="Cliquez pour ouvrir la modal"
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

        {ongletActif === "Évaluations" && (
          <div className="containerEvaluations">
            {evaluations?.length > 0 && (
              <div className="containerNote">
                {console.info(evaluations)}
                <p className="average_rating">{`${(Math.round(averageRating * 100) / 100).toFixed(2)}`}</p>
                <div className="StarNumbCom">
                  <div className="starcontainer">
                    {renderStars(parseFloat(averageRating))}
                  </div>
                  <p className="Number_comment">({evaluations.length})</p>
                </div>
              </div>
            )}
            {evaluations?.map((evaluation) => (
              <div key={evaluation.id} className="cardCom">
                {console.info(evaluation.average_rating)}
                <div className="containerCom">
                  <div className="pictureBuyerCom">
                    <Link to={`/profilseller/${evaluation.user_buyer}`}>
                      <img
                        className="picture_buyer"
                        src={`http://localhost:3310${evaluation.picture_buyer}`}
                        alt="image_buyer"
                      />
                    </Link>
                  </div>
                  <div className="comment-buyer">
                    <div className="speudoBuyer">
                      <Link to={`/profilseller/${evaluation.user_buyer}`}>
                        {`${evaluation.pseudo}`}{" "}
                      </Link>
                    </div>
                    <div className="createdOn">
                      {`${evaluation.created_on ? new Date(evaluation.created_on).toLocaleDateString("fr-FR").split("/").join("-") : ""}`}
                    </div>
                    <div className="rating">
                      {renderStars(parseFloat(evaluation.rating))}
                    </div>
                    <div className="comment">{`${evaluation.comment}`}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {ongletActif === "Achat" && (
          <div className="tab-order">
            {historyOrders?.map((order) => (
              <div key={order.id}>
                <li className="order-item">
                  <img
                    className="img-order"
                    src={`http://localhost:3310${order.image_path}`}
                    alt="image_article_seller"
                  />
                  <div className="order-advert-info">
                    <div className="order-info-title">{`${order.title_advert}`}</div>
                    <div className="order-info-price">
                      {`${order.total_price}`} €
                    </div>
                  </div>
                  <div className="order-details">
                    <div className="order-date">
                      Acheté le :{" "}
                      {`${order.order_date ? new Date(order.order_date).toLocaleDateString("fr-FR").split("/").join("-") : ""}`}
                    </div>
                    <div className="status-order">
                      Statut :{" "}
                      <span className={orderStatusClass(order.status_order)}>
                        {order.status_order}
                      </span>
                    </div>
                  </div>
                </li>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default ProfilTab;

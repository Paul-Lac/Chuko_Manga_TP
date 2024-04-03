/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./ProfilTab.css";

function ProfilTab() {
  const { advertId, id } = useParams();
  const [annonces, setAnnonces] = useState();
  const [evaluations, setEvaluations] = useState([]);
  const [historyOrders, setHistoryOrders] = useState([]);
  const [ongletActif, setongletActif] = useState("Annonces");

  useEffect(() => {
    fetch(`http://localhost:3310/api/display-adverts-byseller/${id}`)
      .then((res) => res.json())
      .then((data) => {
        console.info("Mes annonces dans OngletProfil:", data);
        setAnnonces(data);
      });
  }, [id]); // Ajoutez un identifiant en fonction de celui-ci pour que useEffect se déclenche lorsque l'identifi

  useEffect(() => {
    fetch(`http://localhost:3310/api/user-profil-com/${id}`)
      .then((res) => res.json())
      .then((data) => {
        console.info("commentairesTableau:", data);
        setEvaluations(data);
      });
  }, [id]); // Ajoutez un identifiant en fonction de celui-ci pour que useEffect se déclenche lorsque l'identifi

  useEffect(() => {
    fetch(`http://localhost:3310/api/display-order-history-bybuyer/${id}`)
      .then((res) => res.json())
      .then((data) => {
        console.info("Mon historique d'achat:", data);
        setHistoryOrders(data);
      });
  }, [id]); // Ajoutez un identifiant en fonction de celui-ci pour que useEffect se déclenche lorsque l'identifi

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

  return (
    <div className="containerOnglets">
      <div className="containerButton">
        <button
          type="button"
          className={
            ongletActif === "Annonces"
              ? "buttonOnglet selected"
              : "buttonOnglet"
          }
          onClick={() => setongletActif("Annonces")}
        >
          Annonces
        </button>
        <button
          type="button"
          className={
            ongletActif === "Évaluations"
              ? "buttonOnglet selected"
              : "buttonOnglet"
          }
          onClick={() => setongletActif("Évaluations")}
        >
          Évaluations
        </button>
        <button
          type="button"
          className={
            ongletActif === "Achat" ? "buttonOnglet selected" : "buttonOnglet"
          }
          onClick={() => setongletActif("Achat")}
        >
          Achats
        </button>
      </div>

      <div className="containerInformations">
        {ongletActif === "Annonces" && (
          <div className="containerAnnonces">
            {annonces?.map((annonce) => (
              <div key={advertId}>
                <Link
                  key={advertId}
                  to={`/advert-seller/${annonce.advert_id}`}
                  className="linkCard"
                >
                  <li className="cardAnnonces">
                    <div>
                      <img
                        className="imagePathAnnonces"
                        src={`http://localhost:3310${annonce.image_path}`}
                        alt="image_article_seller"
                      />
                      <h2 className="titleSearchMangaAnnonces">{`${annonce.title_search_manga}`}</h2>
                      <p className="priceAnnonces">{`${annonce.price}`} €</p>
                      <p className="name_condition">{`${annonce.name_condition}`}</p>
                    </div>
                  </li>
                </Link>
              </div>
            ))}
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
                        src={`${evaluation.picture_buyer}`}
                        alt="image_buyer"
                      />
                    </Link>
                  </div>
                  <div className="commentBuyer">
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
          <div className="containerAnnonces">
            {historyOrders?.map((order) => (
              <div key={order.id}>
                <li className="cardAnnonces">
                  <div>
                    <img
                      className="imagePathAnnonces"
                      src={`http://localhost:3310${order.image_path}`}
                      alt="image_article_seller"
                    />
                    <div className="titleSearchMangaAnnonces">{`${order.title_search_manga}`}</div>
                    <div className="priceAnnonces">
                      {`${order.total_price}`} €
                    </div>
                    <div className="name_condition">{`${order.name_condition}`}</div>
                    <div className="orderDate">
                      Acheté le :{" "}
                      {`${order.order_date ? new Date(order.order_date).toLocaleDateString("fr-FR").split("/").join("-") : ""}`}
                    </div>
                    <div className="statusOrder">
                      Status :{" "}
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

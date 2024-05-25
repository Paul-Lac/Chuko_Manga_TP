/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import axiosInstance from "../services/axiosInstance";
import "./PaymentFinal.css";

function PaymentFinal({ price, articleData, auth }) {
  const navigate = useNavigate();
  const cost = parseFloat(price);
  const fraisDePort = (cost * 5) / 100;
  const total = cost + fraisDePort;

  const orderDetails = {
    id_user_buy: auth.user.id,
    total_price: articleData.price,
    order_date: new Date().toISOString().slice(0, 10),
    status_order: "pending",
    feedback_order: 0,
    advert_id: articleData.advert_id,
    user_id: articleData.user_id,
  };

  const handlePayment = () => {
    console.info("Order details:", orderDetails);

    axiosInstance
      .post("/orders", orderDetails, { withCredentials: true })
      .then((response) => {
        // Supprimer l'annonce achetée de la liste des favoris du local storage
        const storedFavorites = localStorage.getItem("favoriteAdverts");
        if (storedFavorites) {
          const favorites = JSON.parse(storedFavorites);
          const updatedFavorites = favorites.filter(
            (favAdvert) => favAdvert.id !== articleData.advert_id
          );
          localStorage.setItem(
            "favoriteAdverts",
            JSON.stringify(updatedFavorites)
          );
        }
        console.info(response.data.message);
        // Rediriger l'utilisateur vers son profil avec un message de succès
        navigate(`/profile/${auth.user.id}`, {
          state: { message: "La vente a été réalisée avec succès !" },
        });
      })
      .catch((error) => {
        console.error("Erreur lors de l'enregistrement de la commande:", error);
      });
  };

  return (
    <div className="resume-payment">
      <div className="calcul-payment">
        <p className="resume-title">Résumé de ta commande</p>
        <div className="final-price">
          <div className="commande-label">
            Commande <div className="price-value">{price} €</div>
          </div>

          <div className="commande-label">
            Frais de port
            <div className="price-value"> {fraisDePort.toFixed(2)} € </div>
          </div>
          <div className="commande-label">
            Total<div className="price-value"> {total.toFixed(2)} €</div>
          </div>
        </div>
      </div>
      <div className="confirmation-payment">
        <button type="button" onClick={handlePayment}>
          Paiement
        </button>
      </div>
      <div className="logo-card-payment-desktop">
        <img
          src="http://localhost:3310/static/cartePayment.png"
          alt="payment-card"
        />
      </div>
      <div className="information-security-payment-desktop">
        <img
          src="http://localhost:3310/static/crypte1.png"
          alt="texte protection "
        />
        <p>Ce paiement est crypté et sécurisé</p>
      </div>
    </div>
  );
}
export default PaymentFinal;

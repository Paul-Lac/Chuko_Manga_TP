/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
// import { useContext } from "react";
import "./PaymentFinal.css";

// import { useNotifications } from "../context/NotificationContext";
// import { UserContext } from "../context/UserContext";

function PaymentFinal({ price, articleData, auth }) {
  const navigate = useNavigate();
  const cost = parseFloat(price);
  const fraisDePort = (cost * 5) / 100;
  const total = cost + fraisDePort;
  // const { addNotification } = useNotifications();
  // const { auth } = useContext(UserContext);

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
    // const imageUrl = `http://localhost:3310${articleData?.image_paths[0]}`;

    //   axios
    //     .post("http://localhost:3310/api/parcel-order", orderDetails)
    //     .then((response) => {
    //       if (response.ok) {
    //         return response.json();
    //       }
    //       throw new Error("Network response was not ok");
    //     })
    //     .then((data) => {
    //       console.info(data.message);
    //       // addNotification("La vente a été réalisée avec succès !", imageUrl);
    //       navigate("/");
    //     })
    //     .catch((error) => {
    //       console.error("Erreur lors de l'enregistrement de la commande:", error);
    //     });
    // };

    fetch("http://localhost:3310/api/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${auth.token}`,
      },
      body: JSON.stringify(orderDetails),
      credentials: "include",
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok");
      })
      .then((data) => {
        console.info(data.message);
        // addNotification("La vente a été réalisée avec succès !", imageUrl);
        navigate(`/profile/${auth.user.id}`);
      })
      .catch((error) => {
        console.error("Erreur lors de l'enregistrement de la commande:", error);
      });
  };

  return (
    <div className="resume-payment">
      <div className="calcul-payment">
        <p>Résumé de ta commande</p>
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

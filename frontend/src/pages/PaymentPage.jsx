import { useState } from "react";
import { useLocation } from "react-router-dom";
import "./PaymentPage.css";
import Order from "../components/PaymentPage/Order";
import Address from "../components/PaymentPage/Address";
import Payment from "../components/PaymentPage/Payment";
import DeliveryOption from "../components/PaymentPage/DeliveryOption";

function PaymentPage() {
  const location = useLocation();
  const { articleData } = location.state || {};
  console.info("info paymentPage", articleData);
  const [showModal, setShowModal] = useState(false);
  const [adresse, setAdresse] = useState({
    adresse: "",
    ville: "",
    codePostal: "",
  });

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleAddressChange = (newAddress) => {
    setAdresse(newAddress);
  };

  return (
    <container className="container">
      <div className="main-content">
        <div className="left-column">
          <h3>Commande</h3>
          <div className="order-cards">
            <Order articleInfo={articleData} />
          </div>
          <div className="address-container">
            <h3 className="section-title">Adresse</h3>
            {adresse.adresse && adresse.ville && adresse.codePostal ? (
              <div className="address-info">
                <p>Adresse: {adresse.adresse}</p>
                <p>Ville: {adresse.ville}</p>
                <p>Code postal: {adresse.codePostal}</p>
                <div className="address-actions">
                  <span className="plus-icon">+</span>
                  <button
                    type="button"
                    className="edit-address-text"
                    onClick={openModal}
                  >
                    modifie ton adresse
                  </button>
                </div>
              </div>
            ) : (
              <div
                className="add-address"
                role="button"
                tabIndex="0"
                onClick={openModal}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    openModal();
                  }
                }}
              >
                <span className="add-address-text">Ajoute ton adresse</span>
                <span className="plus-icon">+</span>
              </div>
            )}
          </div>
          {showModal && (
            <div className="modal">
              <div className="modal-content-adress">
                <button
                  className="close"
                  type="button"
                  aria-label="Fermer la modale"
                  onClick={closeModal}
                >
                  &times;
                </button>
                <Address
                  handleChange={handleAddressChange}
                  adresse={adresse}
                  updateModal={closeModal}
                />
              </div>
            </div>
          )}
          <DeliveryOption />
          <div className="payment-section">
            <h3>Paiement</h3>
            <div className="payment-method-select">
              <span>Sélectionne le mode paiement</span>
            </div>
          </div>
          <div className="confirmation-payment-mobile">
            <button type="button">Paiement</button>
            <div className="information-security-payment">
              <img
                src="http://localhost:3310/static/crypte1.png"
                alt="texte protection "
              />
              <p>Ce paiement est crypté et sécurisé</p>
            </div>
          </div>
        </div>
        <div className="right-column">
          <Payment price={articleData.price} articleData={articleData} />
        </div>
      </div>
    </container>
  );
}

export default PaymentPage;

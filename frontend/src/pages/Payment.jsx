import { useState, useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./Payment.css";
import PaymentAddress from "../components/PaymentAddress";
import PaymentDeliveryOption from "../components/PaymentDeliveryOption";
import PaymentFinal from "../components/PaymentFinal";
import PaymentOrder from "../components/PaymentOrder";
import { UserContext } from "../context/UserContext";
import axiosInstance from "../services/axiosInstance";

function PaymentPage() {
  const location = useLocation();
  const { auth } = useContext(UserContext);
  const { articleData } = location.state || {};
  // console.info("info paymentPage", articleData);
  const [showModal, setShowModal] = useState(false);
  const [profile, setProfile] = useState([]);
  const [adresse, setAdresse] = useState({
    adresse: "",
    ville: "",
    codePostal: "",
  });

  // const openModal = () => {
  //   setShowModal(true);
  // };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleAddressChange = (newAddress) => {
    setAdresse(newAddress);
  };

  useEffect(() => {
    axiosInstance
      .get(`/user-profiles/${auth.user.id}`, {
        withCredentials: true,
      })
      .then((res) => {
        console.info(res);
        setProfile(res.data[0]);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, []);

  return (
    <section className="payment-container">
      <div className="payment-main-content">
        <div className="left-column">
          <div className="order-cards">
            <h3 className="payment-section-title">Commande</h3>
            <PaymentOrder articleInfo={articleData} />
          </div>
          <div className="address-container">
            <h3 className="payment-section-title">Adresse</h3>
            {profile &&
            profile.number_street &&
            profile.city &&
            profile.zip_code ? (
              <div className="address-info">
                <p>{profile.number_street}</p>
                <p>
                  {profile.zip_code} {profile.city}
                </p>
              </div>
            ) : (
              <p>Merci de renseigner ton adresse dans ton profil.</p>
            )}
          </div>
          {/* <div className="address-actions">
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
            )} */}

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
                <PaymentAddress
                  handleChange={handleAddressChange}
                  adresse={adresse}
                  updateModal={closeModal}
                />
              </div>
            </div>
          )}
          <PaymentDeliveryOption />
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
          <PaymentFinal
            price={articleData.price}
            articleData={articleData}
            auth={auth}
          />
        </div>
      </div>
    </section>
  );
}

export default PaymentPage;

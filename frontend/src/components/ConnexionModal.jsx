/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/prop-types */
import { useState } from "react";

import "./ConnexionModal.css";
import Connexion from "./Connexion";
import Inscription from "./Inscription";

import imgSub from "../assets/image-inscription.png";

function ConnexionModal({ handleClickOpen }) {
  const [showConnexion, setShowConnexion] = useState(true);

  const handleContentModal = () => {
    setShowConnexion(!showConnexion);
  };

  const handleBackgroundClick = (e) => {
    // Check if the clic is on the background (not on the modal itself)
    if (e.target === e.currentTarget) {
      handleClickOpen();
    }
  };

  return (
    <div className="modal-connexion" onClick={handleBackgroundClick}>
      <div className="modal-content-connexion">
        {showConnexion === true ? (
          <Connexion
            handleContentModal={handleContentModal}
            handleClickOpen={handleClickOpen}
          />
        ) : (
          <Inscription handleContentModal={handleContentModal} />
        )}
        <img className="imgIns" src={imgSub} alt="" />
      </div>
    </div>
  );
}

export default ConnexionModal;

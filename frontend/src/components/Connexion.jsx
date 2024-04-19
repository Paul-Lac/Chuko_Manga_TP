import { useRef, useState, useContext } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { UserContext } from "../context/UserContext";

import "./Connexion.css";

function Connexion({ handleContentModal, handleClickOpen }) {
  // Références pour les champs email et mot de passe
  const emailRef = useRef();
  const passwordRef = useRef();
  const [errorMessage, setErrorMessage] = useState("");
  const { setAuth } = useContext(UserContext);

  // Gestionnaire de soumission du formulaire
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/login`,
        {
          email: emailRef.current.value,
          password: passwordRef.current.value,
        },
        {
          withCredentials: true,
        }
      );

      // Check if response status is 200 : connexion is a success
      if (response.status === 200) {
        const auth = response.data;
        setAuth(auth);
        localStorage.setItem("auth", JSON.stringify(auth));
        handleClickOpen();
      } else {
        setErrorMessage("Email ou mot de passe incorrect.");
      }
    } catch (err) {
      console.error(err);
      setErrorMessage("Une erreur s'est produite. Veuillez réessayer.");
    }
  };

  // Gestionnaire évènement Email
  const [inputEmail, setInputEmail] = useState("");

  const handleChangeInputEmail = (event) => {
    const targetValue = event.target.value;
    setInputEmail(targetValue);
  };

  // Gestionnaire évènement Password
  const [inputPassword, setInputPassword] = useState("");

  const handleChangeInputPassword = (event) => {
    const targetValue = event.target.value;
    setInputPassword(targetValue);
  };

  // Rendu du composant formulaire
  return (
    <div className="connexion-form">
      <h1>Connexion</h1>
      <form className="inForm" onSubmit={handleSubmit}>
        {/* Champ pour l'email */}
        <input
          ref={emailRef}
          type="email"
          id="email"
          placeholder="Entrez votre email"
          value={inputEmail}
          onChange={handleChangeInputEmail}
        />
        {/* Champ pour le mot de passe */}
        <input
          type="password"
          id="password"
          placeholder="Entrez votre mot de passe"
          ref={passwordRef}
          value={inputPassword}
          onChange={handleChangeInputPassword}
        />
        {errorMessage && <div className="error-message">{errorMessage}</div>}
        <button className="Button-type" type="submit">
          Continuer
        </button>
      </form>
      <div className="text-connexion">
        <p className="to-click">Mot de passe oublié ?</p>
        <p className="text-info">
          Tu n'as pas de compte ?{" "}
          <button
            className="to-click"
            onClick={handleContentModal}
            type="button"
          >
            Inscris-toi
          </button>
        </p>
      </div>
    </div>
  );
}

export default Connexion;

Connexion.propTypes = {
  handleContentModal: PropTypes.func.isRequired,
  handleClickOpen: PropTypes.func.isRequired,
};

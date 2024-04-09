/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useState, useRef } from "react";
import PropTypes from "prop-types";
import "./Inscription.css";

function Inscription({ handleContentModal }) {
  // Référence pour le champ pseudo
  const pseudoRef = useRef();

  // Référence pour le champ email
  const emailRef = useRef();

  // États et const pour le mot de passe et la confirmation du mot de passe
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const passwordMinLength = 8;
  const passwordMaxLength = 20;

  // Gestionnaire de soumission du formulaire
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (
      password.length < passwordMinLength ||
      password.length > passwordMaxLength
    ) {
      setPasswordError(true);
    } else {
      setPasswordError(false);
      try {
        // Appel à l'API pour créer un nouvel utilisateur
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/users`,
          {
            method: "post",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              pseudo: pseudoRef.current.value,
              email: emailRef.current.value,
              password,
            }),
          }
        );

        // Redirection vers la page de connexion si la création réussit
        if (response.status === 201) {
          handleContentModal();
        } else {
          // Log des détails de la réponse en cas d'échec
          console.info(response);
        }
      } catch (err) {
        // Log des erreurs possibles
        console.error(err);
      }
    }
  };

  // Gestionnaire évènement Pseudo
  const [inputPseudo, setInputPseudo] = useState("");

  const handleChangeInputPseudo = (event) => {
    const targetValue = event.target.value;
    setInputPseudo(targetValue);
  };

  // Gestionnaire évènement Email
  const [inputEmail, setInputEmail] = useState("");

  const handleChangeInputEmail = (event) => {
    const targetValue = event.target.value;
    setInputEmail(targetValue);
  };

  // Gestionnaire évènement Password
  const handleChangeInputPassword = (event) => {
    const targetValue = event.target.value;
    setPassword(targetValue);
  };

  return (
    <div className="inscription-form">
      <h1>Inscription</h1>
      <form className="inForm" onSubmit={handleSubmit}>
        {/* Champ pour le pseudo */}
        <input
          ref={pseudoRef}
          type="pseudo"
          id="pseudo"
          placeholder="Entrez un pseudo"
          value={inputPseudo}
          onChange={handleChangeInputPseudo}
        />
        {/* Champ pour l'email */}
        <input
          ref={emailRef}
          type="email"
          id="email"
          placeholder="Entrez un email"
          value={inputEmail}
          onChange={handleChangeInputEmail}
        />
        {/* Champ pour le mot de passe */}
        <input
          type="password"
          id="password"
          placeholder="Entrez un mot de passe"
          value={password}
          onChange={handleChangeInputPassword}
        />
        <p
          className={`password-instruction ${password.length < passwordMinLength && "password-error"}`}
        >
          8 caractères minimum
        </p>
        {/* Bouton de soumission du formulaire */}
        <button className="Button-type" type="submit">
          Continuer
        </button>
      </form>
      <div className="text-inscription">
        {/* Paragraphe pour le lien de connexion */}
        <p className="text-info">
          Vous avez déjà un compte ?{" "}
          <span className="to-click" onClick={handleContentModal}>
            Connectez-vous
          </span>
        </p>
      </div>
    </div>
  );
}

export default Inscription;

Inscription.propTypes = {
  handleContentModal: PropTypes.func.isRequired,
};

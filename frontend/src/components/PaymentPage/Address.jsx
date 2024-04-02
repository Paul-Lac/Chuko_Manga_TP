import { useState } from "react";
import "./Address.css";

// eslint-disable-next-line react/prop-types
function Address({ adresse, handleChange, updateModal }) {
  const [formData, setFormData] = useState({ ...adresse });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const validateAddress = (value) => {
    return value.trim() ? "" : "L'adresse ne peut pas être vide";
  };

  const validateCity = (value) => {
    return value.trim() ? "" : "Veuillez saisir un nom de ville.";
  };

  const validatePostalCode = (value) => {
    if (!value.trim()) {
      return "Veuillez saisir un code postal";
    }
    if (!/^\d+$/.test(value.trim())) {
      return "Le code postal doit être un nombre";
    }
    return "";
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (submitted) {
      let validationResult = "";
      if (name === "adresse") {
        validationResult = validateAddress(value);
      } else if (name === "ville") {
        validationResult = validateCity(value);
      } else if (name === "codePostal") {
        validationResult = validatePostalCode(value);
      }
      setErrors({
        ...errors,
        [name]: validationResult,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {
      adresse: validateAddress(formData.adresse),
      ville: validateCity(formData.ville),
      codePostal: validatePostalCode(formData.codePostal),
    };
    setErrors(newErrors);
    setSubmitted(true);

    if (Object.values(newErrors).every((error) => !error)) {
      handleChange(formData);
      setSubmitted(false);
      updateModal();
    }
  };
  return (
    <form className="modification-address" onSubmit={handleSubmit}>
      <span>Saisissez une adresse de livraison</span>
      <label className="champ">
        Adresse :
        <input
          type="text"
          name="adresse"
          value={formData.adresse}
          onChange={handleInputChange}
        />
        {submitted && errors.adresse && (
          <p className="error-message">{errors.adresse}</p>
        )}
      </label>
      <label className="champ">
        Ville :
        <input
          type="text"
          name="ville"
          value={formData.ville}
          onChange={handleInputChange}
        />
        {submitted && errors.ville && (
          <p className="error-message">{errors.ville}</p>
        )}
      </label>
      <label className="champ">
        Code Postal :
        <input
          type="text"
          name="codePostal"
          value={formData.codePostal}
          onChange={handleInputChange}
        />
        {submitted && errors.codePostal && (
          <p className="error-message">{errors.codePostal}</p>
        )}
      </label>

      <button className="submit-new-address" type="submit">
        Ajouter cette adresse
      </button>
    </form>
  );
}

export default Address;

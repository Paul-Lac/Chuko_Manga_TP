/* eslint-disable spaced-comment */
/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import "./DetailsPersonal.css";
import axios from "axios";

function Adresse() {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    city: "",
    country: "",
    zipCode: "",
    numberStreet: "",
    nameAdress: "",
  });
  useEffect(() => {
    fetch(`http://localhost:3310/api/address/${id}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then((data) => {
        console.info("Mes adresse user :", data);
        setFormData({
          id: data[0].id,
          city: data[0].city,
          country: data[0].country,
          zipCode: data[0].zip_code,
          numberStreet: data[0].number_street,
          nameAdress: data[0].name_adress,
        });
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, [id]);

  const handleUpdateAdresseUser = (e) => {
    e.preventDefault();
    if (formData.id) {
      // Si l'adresse existe déjà, effectuer une requête PUT pour la mettre à jour
      axios
        .put(
          `http://localhost:3310/api/address/user/${id}/address/${formData.id}`,
          formData
        )
        .then((response) => {
          console.warn("Success updating user:", response.data);
        })
        .catch((error) => {
          console.error("Error updating user:", error);
        });
    } else {
      axios /*id ou formData.id*/
        .post(`http://localhost:3310/api/address/${id}`, formData)
        .then((response) => {
          console.warn("Success creating user:", response.data);
        })
        .catch((error) => {
          console.error("Error creating user:", error);
        });
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <form className="personal_details_form" onSubmit={handleUpdateAdresseUser}>
      <div className="input_label_profil">
        <label htmlFor="country" className="label_profil">
          Pays
        </label>
        <input
          type="text"
          id="country"
          name="country"
          value={formData.country}
          onChange={handleChange}
          className="input_profil"
          required
        />
      </div>
      <div className="input_label_profil">
        <label htmlFor="city" className="label_profil">
          Ville
        </label>
        <input
          type="text"
          id="city"
          name="city"
          value={formData.city}
          onChange={handleChange}
          className="input_profil"
          required
        />
      </div>
      <div className="input_label_profil">
        <label htmlFor="zipCode" className="label_profil">
          Code postal
        </label>
        <input
          type="text"
          id="zipCode"
          name="zipCode"
          value={formData.zipCode}
          onChange={handleChange}
          className="input_profil"
          required
        />
      </div>
      <div className="input_label_profil">
        <label htmlFor="numberStreet" className="label_profil">
          Rue
        </label>
        <input
          type="text"
          id="numberStreet"
          name="numberStreet"
          value={formData.numberStreet}
          onChange={handleChange}
          className="input_profil"
          required
        />
      </div>
      <div className="input_label_profil">
        <label htmlFor="nameAdress" className="label_profil">
          Nom de l'adresse
        </label>
        <input
          type="text"
          id="nameAdress"
          name="nameAdress"
          value={formData.nameAdress}
          onChange={handleChange}
          className="input_profil"
          required
        />
      </div>
      <button className="button_modifier">Modifier</button>
    </form>
  );
}

export default Adresse;

/* eslint-disable no-undef */
/* eslint-disable no-restricted-syntax */
/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import "./UpdateDetails.css";
import axios from "axios";

function UpdateDetails() {
  const { id } = useParams();
  const [file, setFile] = useState(null);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    pseudo: "",
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    picture: "",
  });

  const fileInputRef = useRef();

  useEffect(() => {
    fetch(`http://localhost:3310/api/users/${id}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then((data) => {
        setFormData({
          pseudo: data.pseudo,
          firstname: data.firstname,
          lastname: data.lastname,
          email: data.email,
          phone: data.phone,
          picture: data.picture,
        });
        setFile(data.picture);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, [id, success]);

  const handleChange = (evt) => {
    evt.preventDefault();
    setFormData({
      ...formData,
      [evt.target.name]: evt.target.value,
    });
  };

  const handleFileChange = (evt) => {
    evt.preventDefault();
    setFile(evt.target.files[0]);
  };

  const handleUpdateUser = (evt) => {
    evt.preventDefault();

    const data = new FormData();

    data.append("pseudo", formData.pseudo);
    data.append("firstname", formData.firstname);
    data.append("lastname", formData.lastname);
    data.append("email", formData.email);
    data.append("phone", formData.phone);
    if (typeof file === "object") {
      data.append("file", file);
    } else {
      data.append("picture", file);
    }
    axios
      .put(`http://localhost:3310/api/user/${id}`, data)
      .then((response) => {
        setSuccess(!success);
        console.warn("Success updating user:", response.data);
      })
      .catch((error) => {
        console.error("Error updating user:", error);
      });
  };

  return (
    <form className="personal_details_form">
      <div className="input_label_profil">
        <label htmlFor="picture" className="label_profil">
          Choisis ta photo
        </label>
        <input
          type="file"
          accept="image/*"
          id="picture_input"
          name="picture"
          onChange={handleFileChange}
          className="input_profil"
          style={{ display: "none" }}
          ref={fileInputRef}
        />
        <button
          className="custom_button"
          onClick={(evt) => {
            evt.preventDefault();
            fileInputRef.current.click();
          }}
        >
          {formData.picture ? (
            <img
              src={`http://localhost:3310${formData.picture}`}
              alt="Chosen"
              style={{ borderRadius: "50%", width: "100%", height: "100%" }}
            />
          ) : (
            <p style={{ color: "white", fontSize: "40px" }}>+</p>
          )}
        </button>
      </div>
      <div className="input_label_profil">
        <label htmlFor="pseudo" className="label_profil">
          Ton pseudo
        </label>
        <input
          type="text"
          id="pseudo"
          name="pseudo"
          value={formData.pseudo}
          onChange={handleChange}
          className="input_profil"
          placeholder=" "
          required
        />
      </div>
      <div className="input_label_profil">
        <label htmlFor="firstname" className="label_profil">
          Ton prénom
        </label>
        <input
          type="text"
          id="firstname"
          name="firstname"
          value={formData.firstname}
          onChange={handleChange}
          className="input_profil"
          placeholder=" "
          required
        />
      </div>
      <div className="input_label_profil">
        <label htmlFor="lastname" className="label_profil">
          Ton nom
        </label>
        <input
          type="text"
          id="lastname"
          name="lastname"
          value={formData.lastname}
          onChange={handleChange}
          className="input_profil"
          required
        />
      </div>
      <div className="input_label_profil">
        <label htmlFor="email" className="label_profil">
          Email
        </label>
        <input
          type="text"
          id="email_input"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="input_profil"
          required
        />
      </div>
      <div className="input_label_profil">
        <label htmlFor="phone" className="label_profil">
          Telephone
        </label>
        <input
          type="text"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          className="input_profil"
          placeholder=""
          required
        />
      </div>

      <button className="button_modifier" onClick={handleUpdateUser}>
        Modifier
      </button>
    </form>
  );
}

export default UpdateDetails;

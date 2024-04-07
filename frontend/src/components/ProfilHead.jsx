/* eslint-disable react/prop-types */
/* eslint-disable react/button-has-type */
/* eslint-disable no-plusplus */
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Stars from "./StarsRating";
import "./ProfilHead.css";

function ProfilHead({ children }) {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    pseudo: "",
    country: "",
    picture: "",
    phone: "",
    email: "",
    rating: 0,
  });

  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    fetch(`http://localhost:3310/api/user-profiles/${id}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }

        return res.json();
      })
      .then((data) => {
        console.info("Mes donnees user :", data);
        const rating = parseFloat(data[0].average_rating);
        setFormData({ ...data[0], rating });
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, [id]);

  return (
    <div className="main_container_user_profilhead">
      <div className="container_user_profilhead">
        <div className="picture_user_profilhead">
          <img
            className="picture_user_profilhead_img"
            src={`http://localhost:3310${formData.picture}`}
            alt="picture_user"
          />
        </div>
        <div className="user_profilhead_info">
          <h1 className="user_profilhead_info_name">{formData.pseudo}</h1>
          <Stars
            ratingValue={formData.rating}
            starSize={screenWidth > 768 ? 34 : 15}
          />
          <h1 className="user_profilhead_info_country">{formData.country}</h1>
          <div className="user_profilhead_info_verification">
            <p className="user_profilhead_info_title">
              Informations verifiées:
            </p>
            <p className="user-profilhead_mail">
              <span style={{ fontWeight: 600 }}>Email: </span>
              {formData.email}
            </p>
            <p className="user-profilhead_phone">
              <span style={{ fontWeight: 600 }}>Téléphone:</span>{" "}
              {formData.phone}
            </p>
          </div>
        </div>
      </div>
      {children}
    </div>
  );
}
export default ProfilHead;

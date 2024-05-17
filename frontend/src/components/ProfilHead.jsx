/* eslint-disable react/prop-types */
/* eslint-disable react/button-has-type */
/* eslint-disable no-plusplus */
import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import NoImage from "../assets/No-image.png";
import "./ProfilHead.css";
import axiosInstance from "../services/axiosInstance";

function ProfilHead() {
  const { id } = useParams();
  const [profile, setProfile] = useState({});

  useEffect(() => {
    axiosInstance
      .get(`/user-profiles/${id}`, {
        withCredentials: true,
      })
      .then((res) => {
        setProfile(res.data[0]);
        // console.log("profile", res.data[0]);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, [id]);

  return (
    <div className="main_container_user">
      <div className="container_profilhead">
        <div className="picture_user_profilhead">
          {profile.picture ? (
            <img
              className="picture_user_profilhead_img"
              src={`http://localhost:3310${profile.picture}`}
              alt="picture_user"
            />
          ) : (
            <img
              className="picture_user_profilhead_img"
              src={NoImage}
              alt="picture_user"
            />
          )}
        </div>
        <div className="container_user_profilhead">
          <div className="user_profilhead_info">
            <h1 className="user_profilhead_info_name">{profile.pseudo}</h1>
            <div className="user-item">
              <p className="user-item-title">Prénom</p>
              <p className="user-item-info">{profile.firstname}</p>
            </div>
            <div className="user-item">
              <p className="user-item-title">Nom</p>
              <p className="user-item-info">{profile.lastname}</p>
            </div>
            <div className="user-item">
              <p className="user-item-title">Email</p>
              <p className="user-item-info">{profile.email}</p>
            </div>
            <div className="user-item">
              <p className="user-item-title">Téléphone </p>
              {profile.phone ? (
                <p className="user-item-info"> {profile.phone}</p>
              ) : (
                <p className="user-item-info">Non renseigné</p>
              )}
            </div>
            <div className="user-item">
              <p className="user-item-title">Adresse </p>
              {profile.number_street ? (
                <div className="user-item-info-address">
                  <p className="user-item-info"> {profile.number_street}</p>
                  <p className="user-item-info">
                    {profile.zip_code} {profile.city}
                  </p>
                  <p className="user-item-info"> {profile.country}</p>
                </div>
              ) : (
                <p className="user-item-info">Non renseigné</p>
              )}
            </div>
          </div>
        </div>
      </div>
      <button className="profilhead_button">
        <Link to={`/update-profile/${id}`}>Modifier</Link>
      </button>
    </div>
  );
}
export default ProfilHead;

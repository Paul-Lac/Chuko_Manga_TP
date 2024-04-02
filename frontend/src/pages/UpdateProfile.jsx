/* eslint-disable react/button-has-type */
// import React, { useState } from "react";
import Adresse from "../components/DetailsPersonalAndAdrees/Adresse";
import DetailsPersonal from "../components/DetailsPersonalAndAdrees/DetailsPersonal";
import "./UpdateProfile.css";
import "../components/DetailsPersonalAndAdrees/DetailsPersonal.css";

function UpdateProfile() {
  return (
    <div className="container_of_createprofil">
      <h1 className="title_of_create_profil">Modifie ton profil</h1>
      <DetailsPersonal />
      <Adresse />
    </div>
  );
}

export default UpdateProfile;

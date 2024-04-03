/* eslint-disable react/button-has-type */
// import React, { useState } from "react";
import UpdateAddress from "../components/UpdateAddress";
import UpdateDetails from "../components/UpdateDetails";
import "./UpdateProfile.css";
import "../components/UpdateDetails.css";

function UpdateProfile() {
  return (
    <div className="container_of_createprofil">
      <h1 className="title_of_create_profil">Modifie ton profil</h1>
      <UpdateDetails />
      <UpdateAddress />
    </div>
  );
}

export default UpdateProfile;

/* eslint-disable import/order */
import { useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import ButtonProfilUser from "../components/ButtonProfilUser";
import ProfilTab from "../components/ProfilTab";
import ProfilHead from "../components/ProfilHead";

import "./ProfilUser.css";

function ProfilUser() {
  const { id } = useParams();
  const location = useLocation();

  useEffect(() => {
    if (location.state && location.state.message) {
      toast.success(location.state.message);
    }
  }, [location]);

  return (
    <div className="containerProfilUser container_limit">
      <ProfilHead id={id}>
        <ButtonProfilUser id={id} />
      </ProfilHead>
      <ProfilTab />
      <ToastContainer />
    </div>
  );
}

export default ProfilUser;

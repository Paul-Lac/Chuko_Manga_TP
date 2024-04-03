/* eslint-disable import/order */
import { useParams } from "react-router-dom";
import ButtonProfilUser from "../components/ButtonProfilUser";
import ProfilTab from "../components/ProfilTab";
import ProfilHead from "../components/ProfilHead";

import "./ProfilUser.css";

function ProfilUser() {
  // let id;

  // try {
  //   const storedAuth = localStorage.getItem("auth");
  //   if (storedAuth) {
  //     const authObj = JSON.parse(storedAuth);
  //     id = authObj.user.id;
  //     console.info(id);
  //   }
  // } catch (error) {
  //   console.error(
  //     "Erreur lors de la récupération de l'id utilisateur depuis localStorage",
  //     error
  //   );
  // }
  const { id } = useParams();
  return (
    <div className="containerProfilUser container_limit">
      <ProfilHead id={id}>
        <ButtonProfilUser id={id} />
      </ProfilHead>
      <ProfilTab />
    </div>
  );
}

export default ProfilUser;

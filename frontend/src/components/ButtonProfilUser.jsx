/* eslint-disable react/prop-types */
/* eslint-disable react/button-has-type */
import "./ProfilHead.css";
import { Link } from "react-router-dom";

function ButtonProfilUser({ id }) {
  return (
    <button className="user-profilhead_button">
      <Link
        to={`/update-profile/${id}`}
        style={{
          textDecoration: "none",
          color: "inherit",
          pointerEvents: "auto",
        }}
      >
        Modifier mon profil
      </Link>
    </button>
  );
}
export default ButtonProfilUser;

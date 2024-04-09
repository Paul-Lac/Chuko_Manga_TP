/* eslint-disable react/prop-types */
import { useContext, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import UserContext from "./UserContext";

// TODO: MEttre RequireAuth dans un nouveau dossier helper
function RequireAuth({ children }) {
  const { auth, setIsModalOpen } = useContext(UserContext);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!auth.token) {
      setIsModalOpen(true);
      navigate("/", { state: { from: location, openModal: true } });
    }
  }, [auth, navigate, location, setIsModalOpen]);

  if (!auth || !auth.token) {
    // TODO : ajouter un navigate vers la page Home
    return null;
  }

  return children;
}

export default RequireAuth;

// ajouter un if /id => ajouter une verif si j'ssai id=12 => cela va charger la page en question. il faut vérifier si que c'est bien le bon id qui correspond.

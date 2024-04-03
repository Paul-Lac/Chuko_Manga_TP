/* eslint-disable react/prop-types */
import { useContext, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import UserContext from "./UserContext";

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
    return null;
  }

  return children;
}

export default RequireAuth;

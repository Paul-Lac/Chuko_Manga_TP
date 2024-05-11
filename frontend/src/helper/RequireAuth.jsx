import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { UserContext } from "../context/UserContext";

function RequireAuth({ children }) {
  const { auth, setAuth, setIsModalOpen } = useContext(UserContext);
  const navigate = useNavigate();

  function isRefreshTokenExpired() {
    const expiresAt = localStorage.getItem("expiresAt");
    return new Date().getTime() > Number(expiresAt);
  }

  useEffect(() => {
    if (!auth || isRefreshTokenExpired()) {
      localStorage.removeItem("auth");
      localStorage.removeItem("expiresAt");
      setAuth(null);
      setIsModalOpen(true);
      navigate("/");
    }
  }, [auth, navigate, setIsModalOpen]);

  return children;
}

export default RequireAuth;

RequireAuth.propTypes = {
  children: PropTypes.node.isRequired,
};

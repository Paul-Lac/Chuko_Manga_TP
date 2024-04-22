import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { UserContext } from "../context/UserContext";

function RequireAuth({ children }) {
  const { auth, setIsModalOpen } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!auth || !auth.token) {
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

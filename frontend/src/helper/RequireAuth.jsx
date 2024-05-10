// import { useContext, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import PropTypes from "prop-types";
// import { UserContext } from "../context/UserContext";

// function RequireAuth({ children }) {
//   const { auth, setIsModalOpen } = useContext(UserContext);
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (!auth) {
//       console.info("Error when checking authentification");
//       setIsModalOpen(true);
//       navigate("/");
//     }
//   }, [auth, navigate, setIsModalOpen]);

//   return children;
// }

// export default RequireAuth;

// RequireAuth.propTypes = {
//   children: PropTypes.node.isRequired,
// };

import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { UserContext } from "../context/UserContext";

function RequireAuth({ children }) {
  const { auth, setAuth, setIsModalOpen } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    const token = Cookies.get("token");
    if (!token) {
      setAuth(null);
      localStorage.removeItem("auth");
      navigate("/");
      setIsModalOpen(true);
    } else {
      const decodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000;
      if (decodedToken.exp < currentTime) {
        Cookies.remove("token");
        setAuth(null);
        localStorage.removeItem("auth");
        navigate("/");
        setIsModalOpen(true);
      }
    }
  }, [auth, navigate, setIsModalOpen]);

  return children;
}

export default RequireAuth;

RequireAuth.propTypes = {
  children: PropTypes.node.isRequired,
};

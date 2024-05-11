import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { UserContext } from "../context/UserContext";

function RequireAuth({ children }) {
  const { auth, setAuth, setIsModalOpen } = useContext(UserContext);
  const navigate = useNavigate();

  function isTokenExpired() {
    const expiresAt = JSON.parse(localStorage.getItem("expiresAt"));
    return new Date().getTime() > expiresAt;
  }

  useEffect(() => {
    if (!auth || isTokenExpired()) {
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

// import { useContext, useEffect } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import PropTypes from "prop-types";
// import { UserContext } from "../context/UserContext";

// function RequireAuth({ children }) {
//   const { auth, setAuth, setIsModalOpen } = useContext(UserContext);
//   const navigate = useNavigate();

//   console.info("Initial auth state:", auth); // Add this line

//   useEffect(() => {
//     axios
//       .get("http://localhost:3310/api/verify", { withCredentials: true })
//       .then((response) => {
//         console.info("Response data:", response.data); // Add this line
//         setAuth(response.data);
//       })
//       .catch((error) => {
//         console.error("Error:", error); // Add this line
//         if (error.response && error.response.status === 401) {
//           setAuth(null);
//           setIsModalOpen(true);
//           navigate("/");
//         }
//       });
//   }, [navigate, setAuth, setIsModalOpen]);

//   console.info("Final auth state:", auth); // Add this line

//   useEffect(() => {
//     if (auth === null) {
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

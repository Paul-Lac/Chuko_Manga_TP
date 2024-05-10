import { createContext, useState, useMemo } from "react";
import PropTypes from "prop-types";

export const UserContext = createContext();
export function UserProvider({ children }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [auth, setAuth] = useState(localStorage.getItem("auth"));

  const userContextValue = useMemo(
    () => ({ auth, setAuth, isModalOpen, setIsModalOpen }),
    [auth, isModalOpen]
  );

  return (
    <UserContext.Provider value={userContextValue}>
      {children}
    </UserContext.Provider>
  );
}

UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

// const getInitialAuthState = () => {
//   const storedAuth = localStorage.getItem("auth");
//   return storedAuth ? JSON.parse(storedAuth) : { token: "", userId: "" };
// };

// const getInitialAuthState = () => {
//   const storedAuth = localStorage.getItem("auth");
//   if (storedAuth) {
//     try {
//       const authData = JSON.parse(storedAuth);
//       return authData.token && authData.user.id
//         ? authData
//         : { token: "", userId: "" };
//     } catch (error) {
//       console.error("Error parsing auth from localStorage", error);
//       return { token: "", userId: "" };
//     }
//   }
//   return { token: "", userId: "" };
// };

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

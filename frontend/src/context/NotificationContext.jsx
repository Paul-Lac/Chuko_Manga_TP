import React, { createContext, useContext, useState, useMemo } from "react";
import PropTypes from "prop-types";

const NotificationContext = createContext();

export const useNotifications = () => useContext(NotificationContext);

export function NotificationProvider({ children }) {
  const [notifications, setNotifications] = useState([]);

  const addNotification = (message, imageUrl) => {
    console.info("Ajout de la notification :", message);
    const newNotification = {
      id: Date.now(),
      message,
      timestamp: new Date(),
      image: imageUrl,
    };
    setNotifications((prevNotifications) => {
      const updatedNotifications = [newNotification, ...prevNotifications];
      localStorage.setItem(
        "notifications",
        JSON.stringify(updatedNotifications)
      );
      return updatedNotifications;
    });
  };

  const removeNotification = (id) => {
    setNotifications((prevNotifications) =>
      prevNotifications.filter((notification) => notification.id !== id)
    );
  };

  const value = useMemo(
    () => ({
      notifications,
      addNotification,
      removeNotification,
    }),
    [notifications]
  );

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
}

NotificationProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default NotificationProvider;

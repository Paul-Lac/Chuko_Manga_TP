import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { formatDistanceToNow } from "date-fns";
import "./NotificationCenter.css";
import { useNotifications } from "../context/NotificationContext";

// eslint-disable-next-line no-unused-vars
function NotificationCenter({ setIsVisible }) {
  const { notifications, removeNotification } = useNotifications();
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [visibleNotifications, setVisibleNotifications] = useState(3);

  const [popupClass, setPopupClass] = useState("popup");

  useEffect(() => {
    let className = "popup";
    if (isPopupVisible) {
      className += notifications.length === 0 ? " popup-lower" : " popup-up";
    }
    setPopupClass(className);
  }, [isPopupVisible, notifications.length]);

  const notificationCenterClass = `notification-center ${notifications.length === 0 ? "higher" : ""}`;

  const togglePopupVisibility = () => {
    setIsPopupVisible(!isPopupVisible);
  };

  const handleDeleteAll = () => {
    notifications.forEach((notification) =>
      removeNotification(notification.id)
    );
    setIsPopupVisible(false);
  };

  const handleViewAll = () => {
    setVisibleNotifications(notifications.length);
  };

  const handleClosePopup = () => {
    setIsPopupVisible(false);
  };

  const handleViewLess = () => {
    setVisibleNotifications(3);
  };

  return (
    <div className="notification-wrapper">
      {isPopupVisible && (
        <div className={popupClass}>
          <button
            type="button"
            className="popup-option"
            onClick={handleDeleteAll}
          >
            Tout supprimer
          </button>
          <hr className="separate-line" />
          <button
            type="button"
            className="popup-option"
            onClick={handleClosePopup}
          >
            Annuler
          </button>
        </div>
      )}

      <div className={notificationCenterClass}>
        <button
          type="button"
          className="modification-button"
          onClick={togglePopupVisibility}
        >
          Modifier
        </button>

        <h4>Centre de Notifications</h4>
        <div
          className={`notifications-list ${isPopupVisible ? "blurred" : ""}`}
        >
          {notifications.length > 0 ? (
            notifications
              .slice(0, visibleNotifications)
              .map(({ id, message, timestamp, image }) => (
                <article key={id} className="notification-item">
                  <div className="content-row">
                    {image && (
                      <img
                        src={image}
                        alt="Notification"
                        className="notification-image"
                      />
                    )}
                    <p className="notification-text">{message}</p>
                  </div>
                  <div className="notification-time-wrapper">
                    <time className="notification-time">
                      {formatDistanceToNow(new Date(timestamp), {
                        addSuffix: true,
                      })}
                    </time>
                    <button
                      className="button-supp"
                      type="button"
                      onClick={() => removeNotification(id)}
                    >
                      ✖
                    </button>
                  </div>
                </article>
              ))
          ) : (
            <p className="no-notifications">Il n'y a pas de notifications.</p>
          )}
        </div>

        {notifications.length > 3 &&
          visibleNotifications >= notifications.length && (
            <button
              type="button"
              className="view-less-button"
              onClick={handleViewLess}
            >
              Voir moins
            </button>
          )}

        {notifications.length > 3 &&
          visibleNotifications < notifications.length && (
            <div className="view-all-container">
              <button
                type="button"
                className="view-all-button"
                onClick={handleViewAll}
              >
                Voir tout
              </button>
            </div>
          )}
      </div>
    </div>
  );
}

NotificationCenter.propTypes = {
  setIsVisible: PropTypes.func.isRequired,
};

export default NotificationCenter;

/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import "./AdvertCard.css";
import { Link } from "react-router-dom";
import { useNotifications } from "../context/NotificationContext";

function AdvertCard({ advert }) {
  const { addNotification } = useNotifications();
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const storedFavorites = localStorage.getItem("favoriteAdverts");
    if (storedFavorites) {
      const favorites = JSON.parse(storedFavorites);
      const isFavorited =
        favorites.findIndex((favAdvert) => favAdvert.id === advert.id) !== -1;
      setIsFavorite(isFavorited);
    }
  }, [advert.id]);

  const handleCardClick = () => {
    window.scrollTo(0, 0);
  };

  const handleFavoriteClick = () => {
    const newIsFavorite = !isFavorite;
    setIsFavorite(newIsFavorite);
    const storedFavorites = localStorage.getItem("favoriteAdverts");

    let updatedFavorites = [];
    if (storedFavorites) {
      const favorites = JSON.parse(storedFavorites);
      updatedFavorites = newIsFavorite
        ? [...favorites, advert]
        : favorites.filter((favAdvert) => favAdvert.id !== advert.id);
    } else if (newIsFavorite) {
      updatedFavorites = [advert];
    }

    localStorage.setItem("favoriteAdverts", JSON.stringify(updatedFavorites));

    console.info("Favori cliqué");
    if (newIsFavorite) {
      addNotification(
        "Article ajouté aux favoris.",
        `http://localhost:3310${advert.image_path}`
      );
    }
  };

  const average = parseFloat(advert.average).toFixed(1);

  return (
    <section className="card-content" key={advert.id}>
      <Link
        to={`/display-adverts/${advert.id}`}
        onClick={handleCardClick}
        className="link-card-title"
      >
        <div className="card-image-frame">
          <img
            src={`http://localhost:3310${advert.image_path}`}
            alt={advert.title_search_manga}
            className="card-image"
          />
        </div>
      </Link>
      <div className="card-description-container">
        <h2 className="card-title">{advert.title_search_manga}</h2>
        <div className="card-price-section">
          <p className="card-price">{advert.price}€</p>
          <button type="button" onClick={handleFavoriteClick}>
            <img
              src={
                isFavorite
                  ? "http://localhost:3310/static/heartFull.png"
                  : "http://localhost:3310/static/heart.png"
              }
              alt="logo favorite"
              className="card-favorite"
            />
          </button>
        </div>
        <p className="card-condition">{advert.name_condition}</p>
        <div className="card-user-section">
          <div className="user">
            <img
              src={`http://localhost:3310${advert.user_picture}`}
              alt="user"
              className="card-user-photo"
            />
            <p className="card-user-name">{advert.pseudo}</p>
          </div>
          <div className="note">
            <img
              src="http://localhost:3310/static/star.png"
              alt="logo star"
              className="card-star"
            />
            <div className="note-text">
              <p className="card-evaluation">
                {average}
                <span className="card-number-feedback">
                  ({advert.feedback_nber})
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

AdvertCard.propTypes = {
  advert: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title_search_manga: PropTypes.string.isRequired,
    image_path: PropTypes.string,
    price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    is_collector: PropTypes.bool,
    name_condition: PropTypes.string.isRequired,
    user_picture: PropTypes.string.isRequired,
    pseudo: PropTypes.string.isRequired,
    average: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
      .isRequired,
    feedback_nber: PropTypes.number.isRequired,
  }).isRequired,
};

export default AdvertCard;

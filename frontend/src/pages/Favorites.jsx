import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import AdvertCard from "../components/AdvertCard";
import { useNotifications } from "../context/NotificationContext";
import "./Favorites.css";
import FavGaara from "../assets/favGaara.png";

function Favorites() {
  const [favoriteAdverts, setFavoriteAdverts] = useState([]);
  const { addNotification } = useNotifications();

  useEffect(() => {
    const storedFavorites = localStorage.getItem("favoriteAdverts");
    if (storedFavorites) {
      setFavoriteAdverts(JSON.parse(storedFavorites));
    }
  }, []);

  return (
    <div className="container_limit">
      <h1 className="title-fav-h1">Mes favoris</h1>
      <div className="favorite-adverts-container">
        {favoriteAdverts.length === 0 ? (
          <section className="fav-page" key="no-favorites">
            <h2 className="title-fav-h2">Enregistre tes favoris</h2>
            <p className="para-fav">
              Ajoute des articles dans tes favoris et retrouve-les ici !
            </p>
            <img src={FavGaara} className="fav-img" alt="Favorite Gaara" />
            <Link to="/explore">
              <button className="fav-btn" type="button">
                Parcourir
              </button>
            </Link>
          </section>
        ) : (
          favoriteAdverts.map((advert) => (
            <AdvertCard
              key={advert.id}
              advert={advert}
              favoriteAdverts={favoriteAdverts}
              setFavoriteAdverts={setFavoriteAdverts}
              addNotification={addNotification}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default Favorites;

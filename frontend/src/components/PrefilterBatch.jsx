/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import AdvertCard from "./AdvertCard";
import "./PrefilterBatch.css";

import Left from "../assets/leftlogo.png";
import Right from "../assets/rightlogo.png";

function PrefilterBatch() {
  // eslint-disable-next-line no-unused-vars
  const [filteredAdverts, setFilteredAdverts] = useState([]);
  const containerRef = useRef(null);
  // Ajoutez un état pour suivre si les images "left" et "right" doivent être affichées
  const [showLeftButton, setShowLeftButton] = useState(false);
  const [showRightButton, setShowRightButton] = useState(true);

  useEffect(() => {
    fetch("http://localhost:3310/api/advert-cards?batch=true")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Error HTTP, status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setFilteredAdverts(data); // Initialize with all adverts
      })
      .catch((error) => {
        console.error("An error occurred while fetching data:", error);
      });
  }, []);

  useEffect(() => {
    // Vérifiez si le conteneur a un défilement horizontal et mettez à jour les états de showLeftButton et showRightButton
    if (containerRef.current) {
      setShowLeftButton(containerRef.current.scrollLeft > 0);
      setShowRightButton(
        containerRef.current.scrollWidth > containerRef.current.clientWidth
      );
    }
  }, [filteredAdverts]); // Ajoutez filteredAdverts en tant que dépendance

  function scrollContainer(direction) {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const cardWidth = container.querySelector(".AdvertCard").clientWidth;

    if (direction === "left") {
      container.scrollLeft -= cardWidth * 2;
    } else if (direction === "right") {
      container.scrollLeft += cardWidth * 2;
    }

    setShowLeftButton(container.scrollLeft > 0);
    setShowRightButton(
      container.scrollLeft + container.clientWidth < container.scrollWidth
    );
  }
  return (
    <section className="prefiltre-lot container_limit">
      <h2 className="titlePrefilter">Explorer les derniers lots ajoutés</h2>
      <div className="filter-by-batch-wrapper">
        {showLeftButton && (
          <img
            className="left-button"
            src={Left}
            alt="left button"
            onClick={() => scrollContainer("left")}
          />
        )}
        {showRightButton && (
          <img
            className="right-button"
            src={Right}
            alt="right button"
            onClick={() => scrollContainer("right")}
          />
        )}

        <div className="filter-by-batch" ref={containerRef}>
          <div className="filtered-adverts-batch">
            {filteredAdverts.length > 0 ? (
              filteredAdverts.slice(0, 8).map((advert) => (
                <div key={advert.id} className="AdvertCard">
                  <AdvertCard advert={advert} />
                </div>
              ))
            ) : (
              <p>Loading...</p>
            )}

            <Link className="link-btn-batch" to="/explore?batch=true">
              <button type="button" className="bnt-see-all-tomes-batch">
                Voir tous les lots
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default PrefilterBatch;

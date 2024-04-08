/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Left from "../assets/leftlogo.png";
import Right from "../assets/rightlogo.png";
import AdvertCard from "./AdvertCard";
import "./PrefilterTome.css";

function PrefilterTome() {
  const [filteredAdverts, setFilteredAdverts] = useState([]);
  // const defaultTitle = "Explorer les derniers tomes ajoutés";
  const [showLeftButton, setShowLeftButton] = useState(false);
  const [showRightButton, setShowRightButton] = useState(true);
  // const titleToShow = (
  //   <h2 className={`titlePrefilter ${titleClassName || ""}`}>
  //     {titlefromAnnounceDetail || defaultTitle}
  //   </h2>
  // );
  const containerRef = useRef(null);
  // const renderedTitle = useDivWrapper ? <div>{titleToShow}</div> : titleToShow;
  useEffect(() => {
    fetch("http://localhost:3310/api/advert-cards?batch=false")
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

    // Vérifiez si la position de défilement horizontal permet d'afficher les images "left" et "right" et mettez à jour leurs états
    setShowLeftButton(container.scrollLeft > 0);
    setShowRightButton(
      container.scrollLeft + container.clientWidth < container.scrollWidth
    );
  }

  return (
    <section className="prefiltre-unique container_limit">
      <h2 className="titlePrefilter">Explorer les derniers tomes ajoutés</h2>
      <div className="filter-by-date-desc-wrapper">
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
        <div className="filter-by-date-desc" ref={containerRef}>
          <div className="filtered-adverts">
            {filteredAdverts.length > 0 ? (
              filteredAdverts.slice(0, 8).map((advert) => (
                <div key={advert.id} className="AdvertCard">
                  <AdvertCard advert={advert} />
                </div>
              ))
            ) : (
              <p>Loading...</p>
            )}
            <Link className="link-btn-desc" to="/explore?batch=false">
              <button type="button" className="bnt-see-all-tomes-desc">
                Voir tous les tomes
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default PrefilterTome;

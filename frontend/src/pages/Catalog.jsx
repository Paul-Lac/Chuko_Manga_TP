import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import "./Catalog.css";

function Catalog() {
  const [mangas, setMangas] = useState([]);

  useEffect(() => {
    const fetchMangas = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3310/api/manga/catalog"
        );
        setMangas(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des mangas :", error);
      }
    };

    fetchMangas();
  }, []);

  return (
    <div className="section-catalog container_limit">
      <h1 className="title-catalog">Nos Mangas</h1>
      <div className="catalog-container">
        <ul>
          {mangas.map((manga) => (
            <li key={manga.id}>
              <Link to={`/manga/${manga.id}`} className="catalog">
                <div className="catalog-img-container">
                  <img
                    className="catalog-img"
                    src={`http://localhost:3310${manga.image}`}
                    alt={manga.title}
                  />
                </div>
                <div className="catalog-title">
                  <h2 id="manga-title">{manga.title}</h2>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Catalog;

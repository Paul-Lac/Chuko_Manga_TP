import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./RappelRecherche.css";
import SearchBar from "./SearchBar";

function RappelRecherche() {
  const [mangas, setMangas] = useState([]);
  useEffect(() => {
    fetch("http://localhost:3310/api/manga/catalog")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Error HTTP, status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setMangas(data);
      })
      .catch((error) => {
        console.error("An error occurred while fetching data:", error);
      });
  }, []);

  return (
    <section className="rappel-recherche-container">
      <h3 className="title-rappel-recherche">
        Recherche le tome qu'il te manque
      </h3>
      <SearchBar searchBarClass="searchbar-white small-container" />
      <h3 className="title-rappel-recherche title2-rappel-recherche">
        Suggestions de recherche
      </h3>
      <ul className="list-suggestion">
        {mangas.slice(0, 5).map((manga) => (
          <Link to={`manga/${manga.id}`} className="link-suggestion">
            <li key={manga.id} className="sugg">
              {manga.title}
            </li>
          </Link>
        ))}
      </ul>
    </section>
  );
}

export default RappelRecherche;

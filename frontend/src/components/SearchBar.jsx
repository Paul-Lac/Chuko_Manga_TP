import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import axios from "axios";

import "./SearchBar.css";

import Loupe from "../assets/icone-loupe.png";

function SearchBar({ searchBarClass }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [queryResult, setQueryResult] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3310/api/mangas?q=${searchQuery}`
        );
        setQueryResult(response.data);
        console.info("Vous ecrivez:", searchQuery);
        console.info("Response from backend:", response.data);
      } catch (err) {
        console.error("Error while fetching search results:", err);
      }
    };
    if (searchQuery.trim() !== "") {
      fetchData();
    } else {
      setQueryResult([]);
    }
  }, [searchQuery]);

  const handleQueryChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSuggestion = async (selectedManga) => {
    console.info("Selected Manga:", selectedManga);
    setSearchQuery("");
    navigate(`/explore/search/${selectedManga.title}`, { replace: true });
  };

  const handleKeyPress = async (e) => {
    if (e.key === "Enter") {
      const searchUrl = `http://localhost:3310/api/explore/search/${searchQuery}`;
      try {
        await axios.get(searchUrl);
      } catch (error) {
        console.error("Error while posting search query:", error);
      }
      setSearchQuery("");
      navigate(`/explore/search/${searchQuery}`, { replace: true });
    }
  };
  return (
    <div className="searchbar-container">
      <input
        className={`searchbar ${searchBarClass}`}
        type="text"
        placeholder="Recherche"
        value={searchQuery}
        onChange={handleQueryChange}
        autoComplete="on"
        onKeyPress={handleKeyPress}
      />
      <img src={Loupe} alt="" className="icone-loupe" />
      <div className="result-tab">
        {queryResult.map((manga) => (
          <div
            role="button"
            key={manga.id}
            tabIndex="0"
            className="search-result"
            onClick={() => handleSuggestion(manga)}
            onKeyPress={handleKeyPress}
          >
            <img
              src={`http://localhost:3310${manga.image}`}
              alt=""
              className="result-image"
            />
            <p>{manga.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SearchBar;

SearchBar.propTypes = {
  searchBarClass: PropTypes.string.isRequired,
};

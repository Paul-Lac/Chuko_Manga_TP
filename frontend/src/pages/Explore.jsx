import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import Select from "react-select";
import AdvertCard from "../components/AdvertCard";
import "./Explore.css";

function Explore() {
  // Extracting query parameters from the current URL
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const batch = searchParams.get("batch");
  const volumeId = searchParams.get("searchVolume");
  const searchQuery = searchParams.get("searchQuery");

  // Initialize state variables to store data
  const [genreList, setGenreList] = useState([]);
  const [conditionList, setConditionList] = useState([]);
  const [adverts, setAdverts] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [selectedConditions, setSelectedConditions] = useState([]);
  const [minPrice, setMinPrice] = useState(undefined);
  const [maxPrice, setMaxPrice] = useState(undefined);

  // Retrieve filter options from API
  useEffect(() => {
    const fetchFilters = async () => {
      try {
        const [conditionsResponse, genresResponse] = await Promise.all([
          axios.get("http://localhost:3310/api/conditions"),
          axios.get("http://localhost:3310/api/genres"),
        ]);
        setConditionList(conditionsResponse.data);
        setGenreList(genresResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchFilters();
  }, []);

  // Clear filters when decided by user
  const handleClearFilters = () => {
    setSelectedGenres([]);
    setSelectedConditions([]);
    setMinPrice(undefined);
    setMaxPrice(undefined);
  };

  // Retrieve adverts from API
  useEffect(() => {
    const fetchAdverts = async () => {
      try {
        const response = await axios.get("http://localhost:3310/api/adverts", {
          params: {
            batch,
            conditionIds: selectedConditions,
            genreIds: selectedGenres,
            maxPrice,
            minPrice,
            searchQuery,
            searchVolume: volumeId,
          },
        });
        setAdverts(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchAdverts();
  }, [maxPrice, minPrice, selectedConditions, selectedGenres]);

  return (
    <section className="explore-container">
      <h1>Nos annonces</h1>
      <div className="filters-section">
        <div className="filters-container">
          <Select
            isMulti
            name="genre_id"
            options={genreList.map((genreItem) => ({
              value: genreItem.id,
              label: genreItem.genre,
            }))}
            value={selectedGenres.map((genreId) => ({
              value: genreId,
              label: genreList.find((genreItem) => genreItem.id === genreId)
                .genre,
            }))}
            onChange={(selectedOptions) =>
              setSelectedGenres(selectedOptions.map((option) => option.value))
            }
            className="explore-select"
            placeholder="Genre"
          />
          <Select
            isMulti
            name="article_condition_id"
            options={conditionList.map((conditionItem) => ({
              value: conditionItem.id,
              label: conditionItem.name_condition,
            }))}
            value={selectedConditions.map((conditionId) => ({
              value: conditionId,
              label: conditionList.find(
                (conditionItem) => conditionItem.id === conditionId
              ).name_condition,
            }))}
            onChange={(selectedOptions) =>
              setSelectedConditions(
                selectedOptions.map((option) => option.value)
              )
            }
            className="explore-select"
            placeholder="Etat"
          />
          <div className="price-inputs">
            <p>Prix</p>
            <input
              type="text"
              placeholder="EUR"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
            />
            <p>À</p>
            <input
              type="text"
              placeholder="EUR"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
            />
          </div>
        </div>
        <button
          type="button"
          className="clear-btn"
          onClick={handleClearFilters}
        >
          Réinitialiser les filtres
        </button>
      </div>

      <div className="adverts-container">
        {adverts.length > 0 ? (
          adverts.map((dataAdvert) => (
            <AdvertCard key={dataAdvert.id} advert={dataAdvert} />
          ))
        ) : (
          <p>Aucun article ne correspond à vos critères de recherche.</p>
        )}
      </div>
    </section>
  );
}

export default Explore;

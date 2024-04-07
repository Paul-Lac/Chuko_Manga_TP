import { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useFilters } from "../context/FilterContext";
import AdvertCard from "../components/AdvertCard";
import "./Explore.css";

function Explore() {
  const [dataAdverts, setDataAdverts] = useState([]);
  const [filteredAdverts, setFilteredAdverts] = useState([]);
  const location = useLocation();
  const { searchQuery, volumeId } = useParams(); // console.info("searchQuery reçue dans explore", searchQuery);
  const queryParams = new URLSearchParams(location.search);
  const batchFromUrl = queryParams.get("batch"); // console.info("volumeId reçu dans explore", volumeId);
  const { filters, setBatch, setMinMaxPrices, dynamicPriceFilter } =
    useFilters();

  useEffect(() => {
    setBatch(batchFromUrl);
    const fetchData = async () => {
      try {
        let url = "http://localhost:3310/api/advert-cards?";
        if (searchQuery) {
          url += `searchQuery=${encodeURIComponent(searchQuery)}`;
        } else if (batchFromUrl !== null && batchFromUrl !== undefined) {
          url += `batch=${encodeURIComponent(batchFromUrl)}`;
        }
        if (volumeId) {
          url += `&searchVolume=${encodeURIComponent(volumeId)}`;
          console.info("searchVolumeFromUrl", volumeId);
        }
        if (filters.genreId) {
          url += `&genreId=${encodeURIComponent(filters.genreId)}`;
        }
        if (filters.condition) {
          url += `&conditionName=${encodeURIComponent(filters.condition)}`;
        }
        if (filters.priceMin) {
          url += `&minPrice=${encodeURIComponent(filters.priceMin)}`;
        }
        if (filters.priceMax) {
          url += `&maxPrice=${encodeURIComponent(filters.priceMax)}`;
        } // console.info("URL de la requête fetch :", url);

        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`Erreur HTTP, statut : ${response.status}`);
        }
        const data = await response.json();
        setDataAdverts(data);
        if (data.length > 0) {
          const prices = data.map((advert) => advert.price);
          const calculatedMinPrice = Math.min(...prices);
          const calculatedMaxPrice = Math.max(...prices);
          setMinMaxPrices(calculatedMinPrice, calculatedMaxPrice);
          setFilteredAdverts(data); // console.info("resulat annonce dans explore", data);
        }
      } catch (error) {
        console.error(
          "Une erreur s'est produite lors de la récupération des données:",
          error
        );
      }
    };

    fetchData();
  }, [
    searchQuery,
    batchFromUrl,
    filters.genreId,
    filters.condition,
    filters.priceMin,
    filters.priceMax,
    dynamicPriceFilter,
  ]);
  useEffect(() => {
    // console.info("Mise à jour du filtrage dynamique", dynamicPriceFilter);
    const filtered = dataAdverts.filter((advert) =>
      dynamicPriceFilter.minPrice != null && dynamicPriceFilter.maxPrice != null
        ? parseFloat(advert.price) >= dynamicPriceFilter.minPrice &&
          parseFloat(advert.price) <= dynamicPriceFilter.maxPrice
        : true
    );
    setFilteredAdverts(filtered);
  }, [dynamicPriceFilter, dataAdverts]);

  return (
    <div className="explore container_limit">
      <h1>Nos annonces</h1>
      <div className="filteredAdverts-explore ">
        {filteredAdverts.length > 0 ? (
          filteredAdverts.map((dataAdvert) => (
            <AdvertCard key={dataAdvert.id} advert={dataAdvert} />
          ))
        ) : (
          <p>Aucun article ne correspond à vos critères de recherche.</p>
        )}
      </div>
    </div>
  );
}

export default Explore;

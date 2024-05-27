// import { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";
// import AdvertCard from "../components/AdvertCard";
// import "./Explore.css";

// function Explore() {
//   const { searchQuery, volumeId } = useParams();
//   const [genreList, setGenreList] = useState([]);
//   const [conditionList, setConditionList] = useState([]);
//   const [adverts, setAdverts] = useState([]);
//   const [selectedGenre, setSelectedGenre] = useState("");
//   const [selectedCondition, setSelectedCondition] = useState("");
//   const [selectedPriceRange, setSelectedPriceRange] = useState("");

//   // Retrieve filter options from API
//   useEffect(() => {
//     const fetchFilters = async () => {
//       try {
//         const [conditionsResponse, genresResponse] = await Promise.all([
//           axios.get("http://localhost:3310/api/conditions"),
//           axios.get("http://localhost:3310/api/genres"),
//         ]);
//         setConditionList(conditionsResponse.data);
//         setGenreList(genresResponse.data);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };
//     fetchFilters();
//   }, []);

//   const getPriceRange = (range) => {
//     switch (range) {
//       case "0-10":
//         return { min: 0, max: 10 };
//       case "10-20":
//         return { min: 10, max: 20 };
//       case "20-50":
//         return { min: 20, max: 50 };
//       case "50+":
//         return { min: 50, max: null };
//       default:
//         return { min: null, max: null };
//     }
//   };

//   // Retrieve adverts from API
//   useEffect(() => {
//     const fetchAdverts = async () => {
//       try {
//         const response = await axios.get("http://localhost:3310/api/adverts", {
//           params: {
//             genreId: selectedGenre,
//             conditionId: selectedCondition,
//             minPrice: getPriceRange(selectedPriceRange).min,
//             maxPrice: getPriceRange(selectedPriceRange).max,
//             searchVolume: volumeId,
//             searchQuery,
//           },
//         });
//         setAdverts(response.data);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };
//     fetchAdverts();
//   }, [
//     selectedGenre,
//     selectedCondition,
//     selectedPriceRange,
//     volumeId,
//     searchQuery,
//   ]);

//   const handleClearFilters = () => {
//     setSelectedGenre("");
//     setSelectedCondition("");
//     setSelectedPriceRange("");
//   };

//   return (
//     <section className="explore-container">
//       <h1>Nos annonces</h1>
//       <div className="filters-section">
//         <div className="filters-container">
//           <select
//             id="genre"
//             className="explore-select"
//             name="genre_id"
//             value={selectedGenre}
//             onChange={(e) => setSelectedGenre(e.target.value)}
//           >
//             <option value="">Genre</option>
//             {genreList.map((genreItem) => (
//               <option key={genreItem.id} value={genreItem.id}>
//                 {genreItem.genre}
//               </option>
//             ))}
//           </select>
//           <select
//             id="condition"
//             className="explore-select"
//             name="article_condition_id"
//             value={selectedCondition}
//             onChange={(e) => setSelectedCondition(e.target.value)}
//           >
//             <option value="">Etat</option>
//             {conditionList.map((conditionItem) => (
//               <option key={conditionItem.id} value={conditionItem.id}>
//                 {conditionItem.name_condition}
//               </option>
//             ))}
//           </select>
//           <select
//             id="priceRange"
//             className="explore-select"
//             value={selectedPriceRange}
//             onChange={(e) => setSelectedPriceRange(e.target.value)}
//           >
//             <option value="">Prix</option>
//             <option value="0-10">&lt; 10€</option>
//             <option value="10-20">10 à 20€</option>
//             <option value="20-50">20 à 50€</option>
//             <option value="50+">&gt; 50€</option>
//           </select>
//         </div>
//         <button
//           type="button"
//           className="clear-btn"
//           onClick={handleClearFilters}
//         >
//           Réinitialiser les filtres
//         </button>
//       </div>

//       <div className="adverts-container">
//         {adverts.length > 0 ? (
//           adverts.map((dataAdvert) => (
//             <AdvertCard key={dataAdvert.id} advert={dataAdvert} />
//           ))
//         ) : (
//           <p>Aucun article ne correspond à vos critères de recherche.</p>
//         )}
//       </div>
//     </section>
//   );
// }

// export default Explore;

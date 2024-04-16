// /* eslint-disable react/no-array-index-key */
// import "./AdvertDetail.css";
// import { useState, useEffect, useContext } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import AdvertDetailSeller from "../components/AdvertDetailSeller";
// import MangaDetails from "./MangaDetails";
// import UserContext from "../context/UserContext";

// function AdvertDetail() {
//   const navigate = useNavigate();
//   const { id } = useParams();
//   const [detailManga, setDetailManga] = useState(null);
//   const [activeTab, setActiveTab] = useState("annonce");
//   const [userId, setUserId] = useState(null);
//   const imageCountClass =
//     detailManga &&
//     detailManga[0] &&
//     `images-${detailManga[0].image_paths.length}`;
//   const { setIsModalOpen } = useContext(UserContext);
//   useEffect(() => {
//     fetch(`http://localhost:3310/api/advert-cards/${id}`)
//       .then((response) => {
//         if (!response.ok) {
//           throw new Error(`HTTP error! status: ${response.status}`);
//         }
//         return response.json();
//       })
//       .then((data) => {
//         const detail = data.length > 0 ? data[0] : null;

//         console.info("récupération des datas", data);
//         setDetailManga(data);
//         setUserId(detail.user_id);
//       })
//       .catch((error) => {
//         console.error(
//           "Erreur lors de la récupération des détails de l'annonce",
//           error
//         );
//       });
//   }, [id]);
//   const navigateToFavorites = () => {
//     navigate("/favorites");
//   };
//   if (!detailManga) {
//     return <p>Chargement des détails...</p>;
//   }
//   const navigateToPaymentPage = () => {
//     const token = localStorage.getItem("auth");
//     if (token) {
//       navigate(`/payment/${id}`, {
//         state: { articleData: detailManga[0] },
//       });
//     } else {
//       setIsModalOpen(true);
//     }
//   };
//   return (
//     <div className="announcement-detail container_limit">
//       <div className="container-Details">
//         <div className="image-manga-sell">
//           <div className={`secondary-images-container ${imageCountClass}`}>
//             {detailManga[0].image_paths.map((imagePath, index) => (
//               <div className="image-from-annoucement" key={index}>
//                 <img
//                   src={`http://localhost:3310${imagePath}`}
//                   alt={`Manga ${index + 1}`}
//                 />
//               </div>
//             ))}
//           </div>
//           <div className="information-manga-sell">
//             <p className="information-price">{detailManga[0].price} €</p>
//             <p style={{ fontWeight: "bold", fontSize: "1.3rem" }}>
//               {detailManga[0].title_advert}
//             </p>
//             <p className="description-annonce">{detailManga[0].description}</p>
//             <div className="information-etat">
//               <p>État:</p> <p> {detailManga[0].name_condition}</p>
//             </div>
//             <div className="information-title">
//               <p>Titre:</p>
//               <p>
//                 {detailManga[0].manga_title && detailManga[0].volume_title
//                   ? `${detailManga[0].manga_title}, ${detailManga[0].volume_title}`
//                   : "Ce manga n'est pas encore référencé"}
//               </p>
//             </div>
//             <div className="information-date">
//               <p>Ajouté le:</p>
//               <p>
//                 {detailManga[0].publication_date_advert
//                   ? new Date(detailManga[0].publication_date_advert)
//                       .toLocaleString("fr-FR", {
//                         year: "numeric",
//                         month: "2-digit",
//                         day: "2-digit",
//                       })
//                       .replace(", ", " à ")
//                   : ""}
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//       <div className="button-bar">
//         <button
//           className="btn active"
//           type="button"
//           onClick={navigateToPaymentPage}
//         >
//           Acheter
//         </button>
//         <button className="btn" type="button" onClick={navigateToFavorites}>
//           Favoris
//         </button>
//       </div>
//       {/* A récupérer */}
//       <div className="tab-system">
//         <div className="tabs">
//           <button
//             onClick={() => setActiveTab("annonce")}
//             className={`tab ${activeTab === "annonce" ? "active" : ""}`}
//             type="button"
//           >
//             Vendeur
//           </button>
//           <button
//             onClick={() => setActiveTab("manga")}
//             className={`tab ${activeTab === "manga" ? "active" : ""}`}
//             type="button"
//           >
//             Détails manga
//           </button>
//         </div>
//         <div
//           className={`content ${activeTab === "annonce" ? "content-annonce" : "content-manga"}`}
//         >
//           {activeTab === "annonce" && (
//             <div>
//               <AdvertDetailSeller userId={userId} id={id} />
//             </div>
//           )}
//           {activeTab === "manga" && (
//             <figure className="description-advert-manga">
//               {detailManga[0] && (
//                 <div className="manga-details-container">
//                   <MangaDetails
//                     id={detailManga[0].manga_id}
//                     showVolumes={false}
//                   />
//                 </div>
//               )}
//             </figure>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }
// export default AdvertDetail;

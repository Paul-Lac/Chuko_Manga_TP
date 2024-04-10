// import { useState, useEffect } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import axios from "axios";

// import "./AdvertSeller.css";

// import NoImage from "../assets/navBar.png";

// function AdvertSeller() {
//   const navigate = useNavigate();
//   const { id } = useParams();

//   const [anounces, setAnounces] = useState([]);
//   const [modal1, setModal1] = useState(false);
//   // const [setUserId] = useState(null);

//   useEffect(() => {
//     // console.info("valeur de l'id au fetch:", id);
//     fetch(`http://localhost:3310/api/advert-cards/${id}`)
//       .then((res) => {
//         return res.json();
//       })
//       .then((data) => {
//         // console.info("Mes annonces dans MyAnounces:", data);
//         setAnounces(data);
//       })
//       .catch((error) => {
//         console.error("Erreur lors de la récupération de l'annonce", error);
//       });
//   }, [id]);

//   if (!anounces) {
//     return <p>Chargement des annonces...</p>;
//   }

//   const navigateToProfilUser = () => {
//     if (anounces && anounces.length > 0) {
//       const userId = anounces[0].user_id;
//       navigate(`/profile/${userId}`);
//     }
//   };

//   const navigateToUpdateAdvert = () => {
//     if (anounces && anounces.length > 0) {
//       const advertId = anounces[0].advert_id;
//       navigate(`/update-advert/${advertId}`);
//     }
//   };

//   const toggleModal1 = () => {
//     setModal1(!modal1);
//   };

//   const handleKeyPress = (e) => {
//     if (e.key === "Enter") {
//       toggleModal1();
//     }
//   };

//   const handleDeleteAdvert = (advertId) => {
//     if (advertId) {
//       axios
//         .delete(`http://localhost:3310/api/adverts/${advertId}`)
//         .then((response) => {
//           console.warn("Success delete advert:", response.data);
//           toggleModal1();
//           navigateToProfilUser();
//         })
//         .catch((error) => {
//           console.error("Error delete advert:", error);
//         });
//     } else {
//       console.error("Invalid advert ID:", advertId);
//     }
//   };

//   return (
//     <div className="container_limit">
//       {anounces?.map((anounce) => (
//         <div key={anounce.id} className="containerAnounce">
//           <div className="ContainerImage">
//             <div className="imagePrimary">
//               {anounce.image_paths[0] ? (
//                 <img
//                   className="imageSell1"
//                   src={`http://localhost:3310${anounce.image_paths[0]}`}
//                   alt=""
//                 />
//               ) : (
//                 <img className="NoImage1" src={NoImage} alt="No_Picture" />
//               )}
//             </div>
//             <div className="imageSecond">
//               {anounce.image_paths[1] ? (
//                 <img
//                   className="imageSell2"
//                   src={`http://localhost:3310${anounce.image_paths[1]}`}
//                   alt=""
//                 />
//               ) : (
//                 <img className="NoImage" src={NoImage} alt="No_Picture" />
//               )}
//               {anounce.image_paths[2] ? (
//                 <img
//                   className="imageSell3"
//                   src={`http://localhost:3310${anounce.image_paths[2]}`}
//                   alt=""
//                 />
//               ) : (
//                 <img className="NoImage" src={NoImage} alt="No_Picture" />
//               )}
//             </div>
//           </div>
//           <div className="ContainerInformationSell">
//             <p className="informationPrice">{anounce.price} €</p>
//             <div className="informationTitle">
//               <p>Titre :</p> <p> {anounce.title_search_manga}</p>
//             </div>
//             <div className="informationDescription">
//               <p>Description :</p> <p>{anounce.description}</p>
//             </div>
//             <div className="informationEtat">
//               <p>État :</p> <p> {anounce.name_condition}</p>
//             </div>

//             {/* <div className="informationVues">
//               <p>Nombre de vues :</p>
//               <p>{anounce.view_number}</p>
//             </div> */}
//             <div className="informationDate">
//               <p>Ajouté le :</p>
//               <p>
//                 {anounce.publication_date_advert
//                   ? new Date(anounce.publication_date_advert)
//                       .toLocaleDateString("fr-FR")
//                       .split("/")
//                       .join("-")
//                   : ""}
//               </p>
//             </div>
//           </div>
//           <div className="buttonContainer">
//             <button
//               className="btnModSup"
//               type="button"
//               onClick={() => navigateToUpdateAdvert(anounce.advert_id)}
//             >
//               Modifier
//             </button>
//             <div>
//               <button
//                 className="btnModSup"
//                 onClick={toggleModal1}
//                 type="button"
//               >
//                 Supprimer
//               </button>

//               {modal1 && (
//                 <div className="modal">
//                   <div
//                     role="button"
//                     tabIndex={0}
//                     onClick={toggleModal1}
//                     onKeyPress={handleKeyPress}
//                     aria-label="Cliquez pour ouvrir la modal"
//                     className="overlayAnounces"
//                   />
//                   <div className="modalContent">
//                     <h2 className="MessageModal">Supprimer l'article</h2>
//                     <div className="closeConfirm">
//                       <button
//                         className="closeModal"
//                         type="button"
//                         onClick={toggleModal1}
//                       >
//                         Annuler
//                       </button>
//                       <button
//                         className="confirmModal"
//                         type="button"
//                         onClick={() => handleDeleteAdvert(anounce.advert_id)}
//                       >
//                         Confirmer
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// }
// export default AdvertSeller;

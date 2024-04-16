// import { useEffect, useState } from "react";
// import { Link, useParams } from "react-router-dom";
// import ProfilHead from "../components/ProfilHead";
// import "./ProfilUser.css";

// function ProfilSeller() {
//   const { advertId, id } = useParams();
//   const [annonces, setAnnonces] = useState();
//   const [evaluations, setEvaluations] = useState([]);
//   const [ongletActif, setongletActif] = useState("Annonces");

//   useEffect(() => {
//     fetch(`http://localhost:3310/api/users/${id}/adverts`)
//       .then((res) => res.json())
//       .then((data) => {
//         console.info("Mes annonces dans OngletProfil:", data);
//         setAnnonces(data);
//       });
//   }, [id]);

//   useEffect(() => {
//     fetch(`http://localhost:3310/api/users/${id}/feedbacks`)
//       .then((res) => res.json())
//       .then((data) => {
//         console.info("commentairesTableau:", data);
//         setEvaluations(data);
//       });
//   }, [id]);

//   function renderStars(averageRating) {
//     const fullStars = Math.floor(averageRating); // Nombre d'étoiles pleines
//     const decimalPart = averageRating - fullStars; // Partie décimale de la note
//     let partialStar = ""; // Classe pour l'étoile partielle
//     // Déterminer la classe de l'étoile partielle en fonction de la partie décimale
//     if (decimalPart >= 0.75) {
//       partialStar = "half-star";
//     } else if (decimalPart >= 0.25) {
//       partialStar = "half-star";
//     } else {
//       partialStar = "empty-star";
//     }
//     // Création des étoiles en fonction du nombre d'étoiles pleines et de l'étoile partielle
//     const stars = [];
//     for (let i = 0; i < 5; i += 1) {
//       if (i < fullStars) {
//         stars.push(
//           <div key={i} className="star full-star">
//             ★
//           </div>
//         );
//       } else if (i === fullStars && partialStar === "half-star") {
//         stars.push(
//           <div key={i} className={`star ${partialStar}`}>
//             ★
//           </div>
//         );
//       } else {
//         stars.push(
//           <div key={i} className="star empty-star">
//             ★
//           </div>
//         );
//       }
//     }
//     return <div className="starcontainer">{stars}</div>;
//   }

//   const averageRating =
//     evaluations.reduce(
//       (total, evaluation) => total + parseFloat(evaluation.average_rating),
//       0
//     ) / evaluations.length;

//   return (
//     <div>
//       <ProfilHead />
//       <div className="containerOnglets">
//         <div className="containerButton">
//           <button
//             type="button"
//             className={
//               ongletActif === "Annonces"
//                 ? "buttonOnglet selected"
//                 : "buttonOnglet"
//             }
//             onClick={() => setongletActif("Annonces")}
//           >
//             Annonces
//           </button>
//           <button
//             type="button"
//             className={
//               ongletActif === "Évaluations"
//                 ? "buttonOnglet selected"
//                 : "buttonOnglet"
//             }
//             onClick={() => setongletActif("Évaluations")}
//           >
//             Évaluations
//           </button>
//         </div>

//         <div className="containerInformations">
//           {ongletActif === "Annonces" && (
//             <div className="containerAnnonces">
//               {annonces?.map((annonce) => (
//                 <div key={advertId}>
//                   <Link
//                     key={advertId}
//                     to={`/myAnounces/${annonce.advert_id}`}
//                     className="linkCard"
//                   >
//                     <li className="cardAnnonces">
//                       <div>
//                         <img
//                           className="imagePathAnnonces"
//                           src={`http://localhost:3310${annonce.image_path}`}
//                           alt="image_article_seller"
//                         />
//                         <h2 className="titleSearchMangaAnnonces">{`${annonce.title_advert}`}</h2>
//                         <p className="priceAnnonces">{`${annonce.price}`} €</p>
//                         <p className="name_condition">{`${annonce.name_condition}`}</p>
//                       </div>
//                     </li>
//                   </Link>
//                 </div>
//               ))}
//             </div>
//           )}

//           {ongletActif === "Évaluations" && (
//             <div className="containerEvaluations">
//               {evaluations?.length > 0 && (
//                 <div className="containerNote">
//                   {console.info(evaluations)}
//                   <p className="average_rating">{`${(Math.round(averageRating * 100) / 100).toFixed(2)}`}</p>
//                   <div className="StarNumbCom">
//                     <div className="starcontainer">
//                       {renderStars(parseFloat(averageRating))}
//                     </div>
//                     <p className="Number_comment">({evaluations.length})</p>
//                   </div>
//                 </div>
//               )}
//               {evaluations?.map((evaluation) => (
//                 <div key={evaluation.id} className="cardCom">
//                   {console.info(evaluation.average_rating)}
//                   <div className="containerCom">
//                     <div className="pictureBuyerCom">
//                       <Link to={`/profilseller/${evaluation.user_buyer}`}>
//                         <img
//                           className="picture_buyer"
//                           src={`${evaluation.picture_buyer}`}
//                           alt="image_buyer"
//                         />
//                       </Link>
//                     </div>
//                     <div className="commentBuyer">
//                       <div className="speudoBuyer">
//                         <Link to={`/profilseller/${evaluation.user_buyer}`}>
//                           {`${evaluation.pseudo}`}{" "}
//                         </Link>
//                       </div>
//                       <div className="createdOn">
//                         {`${evaluation.created_on ? new Date(evaluation.created_on).toLocaleDateString("fr-FR").split("/").join("-") : ""}`}
//                       </div>
//                       <div className="rating">
//                         {renderStars(parseFloat(evaluation.rating))}
//                       </div>
//                       <div className="comment">{`${evaluation.comment}`}</div>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }
// export default ProfilSeller;

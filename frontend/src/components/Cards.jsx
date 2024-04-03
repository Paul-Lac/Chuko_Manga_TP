// /* eslint-disable jsx-a11y/no-noninteractive-element-to-interactive-role */
// import PropTypes from "prop-types";
// import "./Cards.css";
// import { useState } from "react";

// function Cards({ data, onImageClick }) {
//   const [isFavorite, setIsFavorite] = useState(false);

//   const handleClickFavorite = () => {
//     setIsFavorite(!isFavorite);
//   };

//   const favoriteSrc = isFavorite
//     ? "http://localhost:3310/static/heartFull.png"
//     : "http://localhost:3310/static/heart.png";

//   return (
//     <section key={data.id} className="card-content">
//       <img
//         src={data.image}
//         alt={data.title}
//         className="card-image"
//         role="button"
//         tabIndex={0}
//         onClick={onImageClick}
//         onKeyDown={(e) => {
//           if (e.key === "Enter" || e.key === " ") {
//             e.preventDefault();
//             onImageClick();
//           }
//         }}
//       />
//       <h2 className="card-title">{data.title}</h2>
//       <div className="card-price-section">
//         <p className="card-price">{data.price}€</p>
//         <img
//           src={favoriteSrc}
//           alt="logo favorite"
//           className="card-favorite"
//           role="button"
//           tabIndex={0}
//           onClick={handleClickFavorite}
//           onKeyDown={(e) => {
//             if (e.key === "Enter" || e.key === " ") {
//               handleClickFavorite();
//             }
//           }}
//         />
//       </div>
//       <p className="card-condition">{data.condition}</p>
//       <div className="card-user-section">
//         <div className="user">
//           <img src={data.imageUser} alt="user" className="card-user-photo" />
//           <p className="card-user-name">{data.nameUser}</p>
//         </div>
//         <div className="note">
//           <img src={data.star} alt="logo star" className="card-star" />
//           <div className="note-text">
//             <p className="card-evaluation">
//               {data.note}
//               <span className="card-number-feedback">({data.comment})</span>
//             </p>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

// Cards.propTypes = {
//   data: PropTypes.shape({
//     id: PropTypes.number.isRequired,
//     image: PropTypes.string.isRequired,
//     title: PropTypes.string.isRequired,
//     price: PropTypes.number.isRequired,
//     condition: PropTypes.string.isRequired,
//     imageUser: PropTypes.string.isRequired,
//     nameUser: PropTypes.string.isRequired,
//     star: PropTypes.string.isRequired,
//     note: PropTypes.number.isRequired,
//     comment: PropTypes.number.isRequired,
//   }),
//   onImageClick: PropTypes.func.isRequired,
// };

// Cards.defaultProps = {
//   data: {
//     id: 0,
//     image: "",
//     title: "",
//     price: 0,
//     condition: "",
//     imageUser: "",
//     nameUser: "",
//     star: "",
//     note: 0,
//     comment: 0,
//   },
// };

// export default Cards;

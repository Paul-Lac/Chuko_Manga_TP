// import { useContext, useState } from "react";

// import { Link, useParams } from "react-router-dom";
// import PropTypes from "prop-types";
// // import { useNotifications } from "../context/NotificationContext";
// import { useFilters } from "../context/FilterContext";
// import UserContext from "../context/UserContext";

// import logo from "../assets/logo.png";
// import ProfileIcon from "../assets/profile.png";
// import AdsIcon from "../assets/ads.png";
// import FavoritesIcon from "../assets/favorites.png";
// import SettingsIcon from "../assets/settings.png";
// import SortIcon from "../assets/sort.png";
// import FilterIcon from "../assets/filter.png";
// // import NotificationBell from "../assets/notificationBell.png";

// // import NotificationCenter from "./NotificationCenter";
// import PriceSlider from "./Slider";
// import ConnexionModal from "./ConnexionModal";

// function HeaderNavMobileMenu({ handleMenuActive, menuMobileActive }) {
//   const { id } = useParams();
//   const [showFilters, setShowFilters] = useState(false);
//   const [currentFilter, setCurrentFilter] = useState(null);
//   const { auth, setAuth } = useContext(UserContext);
//   const [open, setOpen] = useState(false);
//   // const { notifications } = useNotifications();
//   const [notificationCenterVisible, setNotificationCenterVisible] =
//     useState(false);
//   const { updateFilters } = useFilters();
//   const [selectedGenreId, setSelectedGenreId] = useState(null);
//   const [selectedConditionName, setSelectedConditionName] = useState("");
//   const [showPriceSlider, setShowPriceSlider] = useState(false);

//   const handleFilterSelection = (genreId) => {
//     if (genreId === selectedGenreId) {
//       updateFilters({ genreId: null });
//       setSelectedGenreId(null);
//     } else {
//       updateFilters({ genreId });
//       setSelectedGenreId(genreId);
//     }
//   };
//   const handleConditionSelection = (conditionName) => {
//     if (conditionName === selectedConditionName) {
//       setSelectedConditionName("");
//       updateFilters({ condition: "" });
//     } else {
//       setSelectedConditionName(conditionName);
//       updateFilters({ condition: conditionName });
//     }
//   };
//   const toggleFilters = () => {
//     const newShowFilters = !showFilters;
//     setShowFilters(newShowFilters);
//   };

//   const handleFilterClick = (filter) => {
//     setCurrentFilter((prevFilter) => (prevFilter === filter ? null : filter));
//   };
//   const handlePriceClick = () => {
//     setShowPriceSlider((prev) => !prev);
//     setCurrentFilter(currentFilter !== "Prix" ? "Prix" : null);
//   };

//   const handleClickOpen = () => {
//     setOpen(!open);
//     if (!open) {
//       document.body.style.overflow = "hidden";
//     } else {
//       document.body.style.overflow = "auto";
//     }
//   };
//   const handleLogout = () => {
//     localStorage.removeItem("auth");
//     setAuth(null);
//   };

//   const genreOptions = [
//     { id: 1, name: "Shonen" },
//     { id: 2, name: "Shojo" },
//     { id: 3, name: "Seinen" },
//     { id: 4, name: "Josei" },
//     { id: 5, name: "Kodomo" },
//     { id: 6, name: "Isekai" },
//   ];
//   const conditionOptions = [
//     { id: 1, name: "abîmé" },
//     { id: 2, name: "bon état" },
//     { id: 3, name: "comme neuf" },
//   ];

//   return (
//     <section className="header-mobile-menu">
//       {notificationCenterVisible && (
//         // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
//         <div
//           className="backdrop"
//           onClick={() => setNotificationCenterVisible(false)}
//         />
//       )}
//       <div className="mobile-sidebar">
//         {menuMobileActive ? !menuMobileActive : menuMobileActive}
//         <Link to="/explore" onClick={handleMenuActive}>
//           <button type="button" className="explore-btn">
//             Explorer
//           </button>
//         </Link>
//         <Link to="/" className="mobile-sidebar-logo">
//           <img src={logo} alt="Logo" />
//         </Link>
//         <div className="mobile-buttonHeader-container">
//           {!auth?.token ? (
//             <button
//               className="incription-login-button"
//               type="button"
//               onClick={handleClickOpen}
//             >
//               S'inscrire | Se connecter
//             </button>
//           ) : (
//             <button
//               className="incription-login-button"
//               type="button"
//               onClick={handleLogout}
//             >
//               Se déconnecter
//             </button>
//           )}
//           {open && <ConnexionModal handleClickOpen={handleClickOpen} />}
//           <Link to="/new-advert">
//             <button
//               className="vendre-button"
//               type="button"
//               onClick={handleMenuActive}
//             >
//               Vends tes Mangas
//             </button>
//           </Link>
//         </div>
//         <div className="mobile-icon-container">
//           <ul>
//             <div className="mobile-header-icon">
//               <Link to={`/profilUser/${id}`} onClick={handleMenuActive}>
//                 <li>
//                   <img src={ProfileIcon} alt="Profile" />
//                   <span>Profile</span>
//                 </li>
//               </Link>
//               <div className="mobile-menu-separator" />
//               <li>
//                 <img src={AdsIcon} alt="Mes annonces" />
//                 <span>Mes annonces</span>
//               </li>
//               <div className="mobile-menu-separator" />
//               <li>
//                 <img src={FavoritesIcon} alt="Favoris" />
//                 <span>
//                   <a href="/favorites">Favoris</a>
//                 </span>{" "}
//               </li>
//               <div className="mobile-menu-separator" />
//               <li>
//                 <img src={SettingsIcon} alt="Paramètres" />
//                 <span>Paramètres</span>
//               </li>
//               <div className="mobile-menu-separator" />
//               <li>
//                 <img src={SortIcon} alt="Tri" />
//                 <span>Tri</span>
//               </li>
//             </div>
//             <div className="mobile-menu-separator" />
//             {/* {auth && (
//               <li className="notification-li">
//                 <div
//                   className="notification-icon-wrapper"
//                   onClick={() =>
//                     setNotificationCenterVisible(!notificationCenterVisible)
//                   }
//                   tabIndex={0}
//                   role="button"
//                   onKeyDown={(e) =>
//                     e.key === "Enter" &&
//                     setNotificationCenterVisible(!notificationCenterVisible)
//                   }
//                 >
//                   <img
//                     src={NotificationBell}
//                     alt="Notification"
//                     className="notification-bell"
//                   />
//                   {notifications.length > 0 && (
//                     <span className="notification-count">
//                       {notifications.length}
//                     </span>
//                   )}
//                   <span>Notifications</span>
//                 </div>
//                 {notificationCenterVisible && (
//                   <NotificationCenter
//                     setIsVisible={setNotificationCenterVisible}
//                   />
//                 )}
//               </li>
//             )} */}

//             <li>
//               <button
//                 type="button"
//                 onClick={toggleFilters}
//                 className="filter-category"
//               >
//                 <img src={FilterIcon} alt="Filtre" />
//                 <span className="filter-text">Filtre</span>
//               </button>
//             </li>
//             {showFilters && (
//               <li className="filter-dropdown">
//                 <ul>
//                   <li>
//                     <button
//                       type="button"
//                       className={`genres ${currentFilter === "Genres" ? "active" : ""}`}
//                       onClick={() => handleFilterClick("Genres")}
//                     >
//                       Genres
//                     </button>
//                     {currentFilter === "Genres" && (
//                       <ul>
//                         {genreOptions.map((genre) => (
//                           <li key={genre.id}>
//                             <button
//                               type="button"
//                               onClick={() => handleFilterSelection(genre.id)}
//                               className={
//                                 selectedGenreId === genre.id ? "active" : ""
//                               }
//                             >
//                               {genre.name}
//                             </button>
//                           </li>
//                         ))}
//                       </ul>
//                     )}
//                   </li>
//                   <li>
//                     <button
//                       type="button"
//                       className={`condition ${currentFilter === "Condition" ? "active" : ""}`}
//                       onClick={() => handleFilterClick("Condition")}
//                     >
//                       État
//                     </button>
//                     {currentFilter === "Condition" && (
//                       <ul>
//                         {conditionOptions.map((condition) => (
//                           <li key={condition.id}>
//                             <button
//                               type="button"
//                               onClick={() =>
//                                 handleConditionSelection(condition.name)
//                               }
//                               className={
//                                 selectedConditionName === condition.name
//                                   ? "active"
//                                   : ""
//                               }
//                             >
//                               {condition.name}
//                             </button>
//                           </li>
//                         ))}
//                       </ul>
//                     )}
//                   </li>
//                   <li>
//                     <button
//                       type="button"
//                       className={`price ${currentFilter === "Prix" ? "active" : ""}`}
//                       onClick={handlePriceClick}
//                     >
//                       Prix
//                     </button>
//                     {showPriceSlider && <PriceSlider />}
//                   </li>
//                 </ul>
//               </li>
//             )}
//           </ul>
//         </div>
//       </div>
//     </section>
//   );
// }

// HeaderNavMobileMenu.propTypes = {
//   handleMenuActive: PropTypes.bool.isRequired,
//   menuMobileActive: PropTypes.bool.isRequired,
// };

// export default HeaderNavMobileMenu;

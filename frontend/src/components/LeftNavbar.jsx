// /* eslint-disable jsx-a11y/click-events-have-key-events */
// /* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
// import { useContext, useState } from "react";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import { useNotifications } from "../context/NotificationContext";
// import { useFilters } from "../context/FilterContext";
// import UserContext from "../context/UserContext";

// import logo from "../assets/logo.png";
// import ProfileIcon from "../assets/profile.png";
// // import AdsIcon from "../assets/ads.png";
// import FavoritesIcon from "../assets/favorites.png";
// // import SettingsIcon from "../assets/settings.png";
// // import SortIcon from "../assets/sort.png";
// import FilterIcon from "../assets/filter.png";
// import NotificationBell from "../assets/notificationBell.png";

// import NotificationCenter from "./NotificationCenter";
// import PriceSlider from "./Slider";

// import "./LeftNavbar.css";

// function LeftNavbar() {
//   const location = useLocation();
//   const [showFilters, setShowFilters] = useState(false);
//   const [currentFilter, setCurrentFilter] = useState(null);
//   const { auth, setIsModalOpen } = useContext(UserContext);
//   const { notifications } = useNotifications();
//   const navigate = useNavigate();
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
//   const handleProfileClick = () => {
//     if (auth && auth.user) {
//       navigate(`/profilUser/${auth.user.id}`); // Navigue vers le profil si authentifié
//     } else {
//       setIsModalOpen(true); // Sinon, ouvre la modal de connexion
//     }
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
//   // const token = localStorage.getItem("auth");
//   return (
//     <>
//       {notificationCenterVisible && (
//         // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
//         <div
//           className="backdrop"
//           onClick={() => setNotificationCenterVisible(false)}
//         />
//       )}
//       <div className="sidebar">
//         <Link to="/">
//           <div className="sidebar-logo">
//             <img src={logo} alt="Logo" />
//           </div>
//         </Link>
//         <div className="icon-container">
//           <ul>
//             <div className="header-icon">
//               <li onClick={handleProfileClick} style={{ cursor: "pointer" }}>
//                 <img src={ProfileIcon} alt="Profile" />
//                 <span>Profil</span>
//               </li>

//               {/* <li>
//                 <img src={AdsIcon} alt="Mes annonces" />
//                 <span>Mes annonces</span>
//               </li> */}
//               <li>
//                 <img src={FavoritesIcon} alt="Favoris" />
//                 <span>
//                   <Link to="/favorites">Favoris</Link>
//                 </span>
//               </li>
//               {/* <li>
//                 <img src={SettingsIcon} alt="Paramètres" />
//                 <span>Paramètres</span>
//               </li> */}
//               {/* <li>
//                 <img src={SortIcon} alt="Tri" />
//                 <span>Tri</span>
//               </li> */}
//             </div>
//             {auth && (
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
//             )}
//             <li>
//               {location.pathname.startsWith("/explore") && (
//                 <>
//                   <button
//                     type="button"
//                     onClick={toggleFilters}
//                     className="filter-category"
//                   >
//                     <img src={FilterIcon} alt="Filtre" />
//                     <span className="filter-text">Filtre</span>
//                   </button>
//                   {showFilters && (
//                     <li className="filter-dropdown">
//                       <ul>
//                         <li>
//                           <button
//                             type="button"
//                             className={`genres ${currentFilter === "Genres" ? "active" : ""}`}
//                             onClick={() => handleFilterClick("Genres")}
//                           >
//                             Genres
//                           </button>
//                           {currentFilter === "Genres" && (
//                             <ul>
//                               {genreOptions.map((genre) => (
//                                 <li key={genre.id}>
//                                   <button
//                                     type="button"
//                                     onClick={() =>
//                                       handleFilterSelection(genre.id)
//                                     }
//                                     className={
//                                       selectedGenreId === genre.id
//                                         ? "active"
//                                         : ""
//                                     }
//                                   >
//                                     {genre.name}
//                                   </button>
//                                 </li>
//                               ))}
//                             </ul>
//                           )}
//                         </li>
//                         <li>
//                           <button
//                             type="button"
//                             className={`condition ${currentFilter === "Condition" ? "active" : ""}`}
//                             onClick={() => handleFilterClick("Condition")}
//                           >
//                             État
//                           </button>
//                           {currentFilter === "Condition" && (
//                             <ul>
//                               {conditionOptions.map((condition) => (
//                                 <li key={condition.id}>
//                                   <button
//                                     type="button"
//                                     onClick={() =>
//                                       handleConditionSelection(condition.name)
//                                     }
//                                     className={
//                                       selectedConditionName === condition.name
//                                         ? "active"
//                                         : ""
//                                     }
//                                   >
//                                     {condition.name}
//                                   </button>
//                                 </li>
//                               ))}
//                             </ul>
//                           )}
//                         </li>
//                         <li>
//                           <button
//                             type="button"
//                             className={`price ${currentFilter === "Prix" ? "active" : ""}`}
//                             onClick={handlePriceClick}
//                           >
//                             Prix
//                           </button>
//                           {showPriceSlider && <PriceSlider />}
//                         </li>
//                       </ul>
//                     </li>
//                   )}
//                 </>
//               )}
//             </li>
//           </ul>
//         </div>
//       </div>
//     </>
//   );
// }

// export default LeftNavbar;

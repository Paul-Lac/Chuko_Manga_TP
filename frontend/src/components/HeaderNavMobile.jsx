/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../context/UserContext";

import ConnexionModal from "./ConnexionModal";

import "./HeaderNavMobile.css";
import SearchBar from "./SearchBar";
// import HeaderNavMobileMenu from "./HeaderNavMobileMenu";
import logo from "../assets/logo.png";
import iconBurger from "../assets/burger-menu.png";
import iconClose from "../assets/close.png";
import plusIcon from "../assets/plus-grey.png";
import loginIcon from "../assets/login.png";
import logoutIcon from "../assets/logout.png";
import iconBook from "../assets/book.png";
import iconHeart from "../assets/heart-grey.png";
import iconUser from "../assets/user-grey.png";

function HeaderNavMobile() {
  const navigate = useNavigate();
  const { auth, setAuth, isModalOpen, setIsModalOpen } =
    useContext(UserContext);

  const [menuMobileActive, setmenuMobileActive] = useState(false);

  const handleMobileMenuOpen = () => {
    setmenuMobileActive(!menuMobileActive);
    // if (!menuMobileActive) {
    //   document.body.style.overflow = "hidden";
    // } else {
    //   document.body.style.overflow = "auto";
    // }
  };

  const handleAddClick = () => {
    navigate("/new-advert");
    setmenuMobileActive(!menuMobileActive);
  };

  const handleExploreClick = () => {
    navigate("/explore");
    setmenuMobileActive(!menuMobileActive);
  };

  const handleProfilClick = () => {
    navigate(`/profile/${auth.user.id}`);
    setmenuMobileActive(!menuMobileActive);
  };

  const handleFavoriteClick = () => {
    navigate("/favorites");
    setmenuMobileActive(!menuMobileActive);
  };

  const handleClickOpen = () => {
    setIsModalOpen(!isModalOpen);
    if (isModalOpen) {
      document.body.style.overflow = "auto";
    } else {
      document.body.style.overflow = "hidden";
      setmenuMobileActive(!menuMobileActive);
    }
  };

  const handleLogout = async () => {
    try {
      await axios.get(`http://localhost:3310/api/logout`, {
        withCredentials: true,
      });
      setAuth(null);
      localStorage.removeItem("auth");
      localStorage.removeItem("expiresAt");
      navigate("/");
    } catch (error) {
      console.error("Error during logout:", error);
    }
    setmenuMobileActive(!menuMobileActive);
  };

  return (
    <header className="navbar-header-mobile">
      {menuMobileActive && (
        // eslint-disable-next-line jsx-a11y/control-has-associated-label, jsx-a11y/interactive-supports-focus
        <div
          className="mobile-menu-overlay"
          onClick={handleMobileMenuOpen}
          role="button"
        />
      )}
      {/* Overlay */}
      <div className="mobile-header">
        <Link to="/">
          <img className="mobile-logo" src={logo} alt="Logo" />
        </Link>
        {!menuMobileActive && (
          <button type="button" onClick={handleMobileMenuOpen}>
            <img className="icon-open" src={iconBurger} alt="Menu" />
          </button>
        )}
      </div>

      {/* Mobile Menu when user is not connected */}
      {menuMobileActive && !auth && (
        <section className="mobile-menu">
          <button
            className="menu-button-close"
            type="button"
            onClick={handleMobileMenuOpen}
          >
            <img className="icon-close" src={iconClose} alt="Fermer" />
          </button>
          <button
            type="button"
            className="mobile-menu-item"
            onClick={handleAddClick}
          >
            <img className="icon-menu" src={plusIcon} alt="Icone ajout" />
            Vends tes mangas
          </button>
          <button
            type="button"
            className="mobile-menu-item"
            onClick={handleExploreClick}
          >
            <img className="icon-menu" src={iconBook} alt="Icone annonces" />
            Explore nos annonces
          </button>
          <button
            type="button"
            className="mobile-menu-item"
            onClick={handleClickOpen}
          >
            <img className="icon-menu" src={loginIcon} alt="Icone connexion" />
            S'inscrire | Se connecter
          </button>
        </section>
      )}
      {/* Mobile Menu when user is connected */}
      {menuMobileActive && auth && (
        <section className="mobile-menu">
          <button
            className="menu-button-close"
            type="button"
            onClick={handleMobileMenuOpen}
          >
            <img className="icon-close" src={iconClose} alt="Fermer" />
          </button>
          <button
            type="button"
            className="mobile-menu-item"
            onClick={handleAddClick}
          >
            <img className="icon-menu" src={plusIcon} alt="Icone ajout" />
            Vends tes mangas
          </button>
          <button
            type="button"
            className="mobile-menu-item"
            onClick={handleExploreClick}
          >
            <img className="icon-menu" src={iconBook} alt="Icone annonces" />
            Explore nos annonces
          </button>
          <button
            type="button"
            className="mobile-menu-item"
            onClick={handleFavoriteClick}
          >
            <img className="icon-menu" src={iconHeart} alt="Icone favoris" />
            Favoris
          </button>
          <button
            type="button"
            className="mobile-menu-item"
            onClick={handleProfilClick}
          >
            <img className="icon-menu" src={iconUser} alt="Icone profil" />
            Profil
          </button>
          <button
            type="button"
            className="mobile-menu-item"
            onClick={handleLogout}
          >
            <img className="icon-menu" src={logoutIcon} alt="Icone connexion" />
            Se déconnecter
          </button>
        </section>
      )}
      {isModalOpen && <ConnexionModal handleClickOpen={handleClickOpen} />}
      <SearchBar />
    </header>
  );
}

export default HeaderNavMobile;

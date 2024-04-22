import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../context/UserContext";
import ConnexionModal from "./ConnexionModal";
import "./HeaderNav.css";
import SearchBar from "./SearchBar";
import HeaderNavMobile from "./HeaderNavMobile";
import logo from "../assets/logo.png";
import iconHeart from "../assets/icon-heart.png";
import iconUser from "../assets/icon-user.png";
import iconUserActive from "../assets/icon-user-active.png";

function HeaderNav() {
  const navigate = useNavigate();
  const { auth, setAuth, isModalOpen, setIsModalOpen } =
    useContext(UserContext);
  const [userMenu, setUserMenu] = useState(false);
  const handleClickOpen = () => {
    setUserMenu(false);
    setIsModalOpen(!isModalOpen);
    if (isModalOpen) {
      document.body.style.overflow = "auto";
    } else {
      document.body.style.overflow = "hidden";
    }
  };

  const handleUserClick = () => {
    setUserMenu(!userMenu);
  };

  const handleProfileClick = () => {
    navigate(`/profile/${auth.user.id}`);
    setUserMenu(false);
  };

  const handleLogout = async () => {
    try {
      await axios.get(`http://localhost:3310/api/logout`, {
        withCredentials: true,
      });
      setAuth(null);
      localStorage.removeItem("auth");
      navigate("/");
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <>
      <header className="navbar-header-desktop">
        <div className="header-left-container">
          <Link to="/">
            <img id="logo" src={logo} alt="Logo" />
          </Link>
          <Link to="/explore">
            <button type="button" className="explore-btn">
              Explorer
            </button>
          </Link>
          <div className="navbar-desktop-search">
            <SearchBar />
          </div>
        </div>
        {/* <Link to="/cma">
          <button type="button" className="admin-btn">
            Admin
          </button>
        </Link> */}
        <div className="buttonHeader-container">
          {!auth?.token ? (
            <button
              className="inscription-login-button"
              type="button"
              onClick={handleClickOpen}
            >
              S'inscrire | Se connecter
            </button>
          ) : (
            <>
              <Link to="/favorites">
                <img className="icon-heart" src={iconHeart} alt="Favoris" />
              </Link>
              <button type="button" onClick={handleUserClick}>
                {userMenu ? (
                  <img
                    className="icon-user"
                    src={iconUserActive}
                    alt="Profil"
                  />
                ) : (
                  <img className="icon-user" src={iconUser} alt="Profil" />
                )}
              </button>
              {userMenu && (
                <div className="user-menu">
                  <button
                    type="button"
                    className="user-menu-link"
                    onClick={handleProfileClick}
                  >
                    Profil
                  </button>
                  <button
                    className="user-menu-logout"
                    type="button"
                    onClick={handleLogout}
                  >
                    Se déconnecter
                  </button>
                </div>
              )}
            </>
          )}
          {isModalOpen && <ConnexionModal handleClickOpen={handleClickOpen} />}
          <Link to="/new-advert" className="vendre-button">
            Vends tes Mangas
          </Link>
        </div>
      </header>

      <HeaderNavMobile />
    </>
  );
}

export default HeaderNav;

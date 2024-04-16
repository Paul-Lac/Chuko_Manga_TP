/* eslint-disable react/no-array-index-key */
import "./AdvertDetail.css";
import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AdvertDetailSeller from "../components/AdvertDetailSeller";
import MangaDetails from "./MangaDetails";
import UserContext from "../context/UserContext";

function AdvertDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [detailAdvert, setDetailAdvert] = useState(null);
  const [activeTab, setActiveTab] = useState("seller");
  const [userId, setUserId] = useState(null);
  const { setIsModalOpen } = useContext(UserContext);
  useEffect(() => {
    fetch(`http://localhost:3310/api/advert-cards/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        const detail = data.length > 0 ? data[0] : null;
        console.info("récupération des datas", data);
        setDetailAdvert(data);
        setUserId(detail.user_id);
      })
      .catch((error) => {
        console.error(
          "Erreur lors de la récupération des détails de l'annonce",
          error
        );
      });
  }, [id]);
  // const navigateToFavorites = () => {
  //   navigate("/favorites");
  // };
  if (!detailAdvert) {
    return <p>Chargement des détails...</p>;
  }
  const navigateToPaymentPage = () => {
    const token = localStorage.getItem("auth");
    if (token) {
      navigate(`/payment/${id}`, {
        state: { articleData: detailAdvert[0] },
      });
    } else {
      setIsModalOpen(true);
    }
  };

  return (
    <section className="detail-page">
      <div className="advert-detail-container">
        {detailAdvert[0].image_paths.length === 1 && (
          <div className="single-picture-container">
            <img
              className="picture"
              src={`http://localhost:3310${detailAdvert[0].image_paths[0]}`}
              alt={detailAdvert[0].title_advert}
            />
          </div>
        )}
        {detailAdvert[0].image_paths.length === 2 && (
          <div className="two-pictures-container">
            <img
              className="picture"
              src={`http://localhost:3310${detailAdvert[0].image_paths[0]}`}
              alt={detailAdvert[0].title_advert}
            />
            <img
              className="picture"
              src={`http://localhost:3310${detailAdvert[0].image_paths[1]}`}
              alt={detailAdvert[0].title_advert}
            />
          </div>
        )}
        {detailAdvert[0].image_paths.length === 3 && (
          <div className="three-pictures-container">
            <img
              className="picture"
              src={`http://localhost:3310${detailAdvert[0].image_paths[0]}`}
              alt={detailAdvert[0].title_advert}
            />
            <div className="small-picture-container">
              <img
                className="picture small-picture"
                src={`http://localhost:3310${detailAdvert[0].image_paths[1]}`}
                alt={detailAdvert[0].title_advert}
              />
              <img
                className="picture small-picture"
                src={`http://localhost:3310${detailAdvert[0].image_paths[2]}`}
                alt={detailAdvert[0].title_advert}
              />
            </div>
          </div>
        )}
        <div className="content-section">
          <p className="content-price">{detailAdvert[0].price}€</p>
          <div className="description-box">
            <h2>Titre</h2>
            <p className="content-value">{detailAdvert[0].title_advert}</p>
          </div>
          <div className="description-box">
            <h2>Description</h2>
            <p className="content-value">{detailAdvert[0].description}</p>
          </div>
          <div className="description-box">
            <h2>État </h2>
            <p className="content-value">{detailAdvert[0].name_condition}</p>
          </div>
          <div className="description-box">
            <h2>Ajouté le</h2>
            <p className="content-value">
              {detailAdvert[0].publication_date_advert
                ? new Date(detailAdvert[0].publication_date_advert)
                    .toLocaleDateString("fr-FR")
                    .split("/")
                    .join("-")
                : ""}
            </p>
          </div>
        </div>
      </div>
      <button className="buy-btn" type="button" onClick={navigateToPaymentPage}>
        Acheter
      </button>
      <div className="tab-system">
        <div className="tabs">
          <button
            onClick={() => setActiveTab("seller")}
            className={`${activeTab === "seller" && "active"}`}
            type="button"
          >
            Vendeur
          </button>
          <button
            onClick={() => setActiveTab("manga")}
            className={`${activeTab === "manga" && "active"}`}
            type="button"
          >
            Manga
          </button>
        </div>
        {/* <div
          className={`content ${activeTab === "seller" ? "content-seller" : "content-manga"}`}
        > */}
        {activeTab === "seller" && (
          <div className="seller-tab">
            <AdvertDetailSeller userId={userId} id={id} />
          </div>
        )}
        {activeTab === "manga" && (
          <div className="manga-tab">
            {detailAdvert[0] && (
              // <div className="manga-details-container">
              <MangaDetails id={detailAdvert[0].manga_id} showVolumes={false} />
              // </div>
            )}
          </div>
        )}
      </div>
      {/* </div> */}
    </section>
  );
}
export default AdvertDetail;

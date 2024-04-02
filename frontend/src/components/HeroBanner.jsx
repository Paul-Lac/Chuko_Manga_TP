import { Link } from "react-router-dom";
import Banner from "../assets/banner.jpg";
import "./HeroBanner.css";

function HeroBanner() {
  return (
    <section className="home-banner-section">
      <div className="img-container">
        <img src={Banner} alt="Anime" />
      </div>
      <div className="home-banner-content">
        <h1>
          Des tomes que tu <br /> ne lis plus ?
        </h1>
        <Link to="/new-advert">
          <button className="banner-button" type="button">
            Vends tes mangas
          </button>
        </Link>
        {/* <p>Découvrir comment ça marche</p> */}
      </div>
    </section>
  );
}

export default HeroBanner;

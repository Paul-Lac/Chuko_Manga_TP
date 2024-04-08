import instagram from "../assets/instagram.png";
import tiktok from "../assets/tiktok.png";
import facebook from "../assets/fb.png";
import twitter from "../assets/X.png";
import "./Footer.css";

export default function FooterDesk() {
  return (
    <div className="footer container_limit">
      <div className="footer-links-container">
        <div className="footer-links-block">
          <h3 className="footer-title">Chuko Manga</h3>
          <a href="youtube.com" target="_blank" rel="noreferrer">
            A propos
          </a>
        </div>
        <div className="footer-links-block">
          <h3 className="footer-title">Découvrir</h3>
          <a href="youtube.com" target="_blank" rel="noreferrer">
            Comment ça marche ?
          </a>
          {/* <a href="youtube.com" target="_blank" rel="noreferrer">
            Tableau de bord
          </a> */}
        </div>
        <div className="footer-links-block">
          <h3 className="footer-title">Aide</h3>
          <a href="youtube.com" target="_blank" rel="noreferrer">
            Centre d'aide
          </a>
          {/* <a href="youtube.com" target="_blank" rel="noreferrer">
            Vendre
          </a>
          <a href="youtube.com" target="_blank" rel="noreferrer">
            Acheter
          </a> */}
        </div>
      </div>
      <div className="socialMedia">
        <a href="https://www.instagram.com/" target="_blank" rel="noreferrer">
          <img
            className="socialMediaIcon"
            src={instagram}
            alt="Instagram Logo"
            aria-label="Instagram"
          />
        </a>
        <a href="https://www.facebook.com/" target="_blank" rel="noreferrer">
          <img
            className="socialMediaIcon"
            src={facebook}
            alt="Facebook Logo"
            aria-label="Facebook"
          />
        </a>
        <a href="https://www.tiktok.com/" target="_blank" rel="noreferrer">
          <img
            className="socialMediaIcon"
            src={tiktok}
            alt="TikTok Logo"
            aria-label="TikTok"
          />
        </a>
        <a href="https://www.twitter.com/" target="_blank" rel="noreferrer">
          <img
            className="socialMediaIcon"
            src={twitter}
            alt="Twitter Logo"
            aria-label="Twitter"
          />
        </a>
      </div>

      <div className="lastBlock">
        <div className="lastBlock-link">
          <a href="youtube.com" target="_blank" rel="noreferrer">
            Politique de confidentialité
          </a>
          <a href="youtube.com" target="_blank" rel="noreferrer">
            Politique des cookies
          </a>
          <a href="youtube.com" target="_blank" rel="noreferrer">
            Paramètres des cookies
          </a>
          <a href="youtube.com" target="_blank" rel="noreferrer">
            Termes et conditions
          </a>
          {/* <a href="youtube.com" target="_blank" rel="noreferrer">
            Notre plateforme
          </a> */}
        </div>
        <div className="copyright">©2024 CHUKO MANGA</div>
      </div>
    </div>
  );
}

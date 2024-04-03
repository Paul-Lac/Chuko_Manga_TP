import NarutoLogo from "../assets/naruto-logo.png";
import OnePieceLogo from "../assets/onepiece-logo.png";
import LoveHinaLogo from "../assets/lovehina-logo.png";
import NegimaLogo from "../assets/negima-logo.png";
import FairyTailLogo from "../assets/fairytail-logo.png";
import DetectiveConanLogo from "../assets/detectiveconan-logo.png";
import SoloLevelingLogo from "../assets/sololeveling-logo.png";
import BlackCloverLogo from "../assets/blackclover-logo.png";
// import MashleLogo from "../assets/mashle-logo.png";
// import ShamanKingLogo from "../assets/shamanking-logo.webp";
// import JujutsuKaisenLogo from "../assets/jujutsukaisen-logo.png";
// import CenturyboysLogo from "../assets/20centuryboys-logo.png";

import "./TeamFavorites.css";

function TeamFavorites() {
  return (
    <section className="section-coup-de-coeur">
      <h2 className="title-coup-de-coeur">Coup de coeur de l'équipe</h2>
      <ul className="section-logo">
        <li>
          <img src={NarutoLogo} alt="Logo Naruto" className="logo" />
        </li>
        <li>
          <img src={OnePieceLogo} alt="Logo one piece" className="logo" />
        </li>
        <li>
          <img src={LoveHinaLogo} alt="Logo love hina" className="logo" />
        </li>
        <li>
          <img src={NegimaLogo} alt="Logo negi ma" className="logo" />
        </li>
        <li>
          <img src={FairyTailLogo} alt="Logo fairy tail" className="logo" />
        </li>
        <li>
          <img
            src={DetectiveConanLogo}
            alt="Logo detective conan"
            className="logo"
          />
        </li>
        <li>
          <img
            src={SoloLevelingLogo}
            alt="Logo solo leveling"
            className="logo"
          />
        </li>
        <li>
          <img src={BlackCloverLogo} alt="Logo black clover" className="logo" />
        </li>
        {/* <li>
          <img src={MashleLogo} alt="Logo mashle" className="logo" />
        </li>
        <li>
          <img src={ShamanKingLogo} alt="Logo shaman king" className="logo" />
        </li>
        <li>
          <img
            src={JujutsuKaisenLogo}
            alt="Logo jujutsu kaisen"
            className="logo"
          />
        </li>
        <li>
          <img src={CenturyboysLogo} alt="20 century boys" className="logo" />
        </li> */}
      </ul>
    </section>
  );
}

export default TeamFavorites;

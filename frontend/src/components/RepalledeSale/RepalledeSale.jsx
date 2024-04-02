import { Link } from "react-router-dom";
import "./RepalledeSale.css";
// import plusbutton from "../../assets/plusbutton.svg";

function RepalledeSale() {
  return (
    <div className="repalledeContainer">
      <p className="repalledeText">Découvrir de nouvelles oeuvres</p>
      <Link to="/manga/catalog" type="button" className="repalledeBoutton">
        <div className="repalledecontenu">
          {/* <img src={plusbutton} alt="plusbutton" className="repalledeImg" /> */}
          <p>Parcourir le catalogue</p>
        </div>
      </Link>
    </div>
  );
}

export default RepalledeSale;

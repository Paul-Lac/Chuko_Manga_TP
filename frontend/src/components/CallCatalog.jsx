import { Link } from "react-router-dom";
import "./CallCatalog.css";
// import plusbutton from "../../assets/plusbutton.svg";

function CallCatalog() {
  return (
    <div className="repalledeContainer">
      <p className="repalledeText">Découvrir de nouvelles oeuvres</p>
      <Link to="/catalog" type="button" className="repalledeBoutton">
        <div className="repalledecontenu">
          {/* <img src={plusbutton} alt="plusbutton" className="repalledeImg" /> */}
          <p>Parcourir le catalogue</p>
        </div>
      </Link>
    </div>
  );
}

export default CallCatalog;

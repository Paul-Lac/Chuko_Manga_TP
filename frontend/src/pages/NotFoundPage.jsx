/* eslint-disable import/no-unresolved */
import { Link } from "react-router-dom";
import "./NotfoundPage.css";

function NotFoundPage() {
  return (
    <div className="container-404">
      <img
        className="img-NotFound"
        src="http://localhost:3310/static/404NotFound.png"
        alt="404NotFoundImage"
      />
      <Link to="/" className="btn-404">
        Accueil
      </Link>
    </div>
  );
}
export default NotFoundPage;

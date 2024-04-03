import { Link } from "react-router-dom";
import "./Admin.css";

function Admin() {
  return (
    <div className="admin-container container_limit">
      <h1>Interface Admin</h1>
      <div className="btn-admin-container">
        <button type="button" className="btn-admin">
          Utilisateurs
        </button>
        <button type="button" className="btn-admin">
          Commandes
        </button>
        <Link to="/cma/mangas" type="button" className="btn-admin">
          Mangas
        </Link>
        <button type="button" className="btn-admin">
          Volumes
        </button>
      </div>
    </div>
  );
}
export default Admin;

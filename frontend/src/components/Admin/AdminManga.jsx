import { useState } from "react";
import AdminAddManga from "./AdminAddManga";
import AdminListManga from "./AdminListManga";

import "./AdminManga.css";

function AdminManga() {
  const [tabShow, setTabShow] = useState(true);

  const handleTabShow = () => {
    setTabShow(!tabShow);
  };

  return (
    <section className="admin-manga-container container_limit">
      <div className="top-btn-container">
        <button
          type="button"
          className={tabShow ? "top-btn-active" : "top-btn-inactive"}
          onClick={handleTabShow}
        >
          Afficher les Mangas
        </button>
        <button
          type="button"
          className={!tabShow ? "top-btn-active" : "top-btn-inactive"}
          onClick={handleTabShow}
        >
          Ajouter un Manga
        </button>
      </div>
      {tabShow ? (
        <AdminListManga />
      ) : (
        <AdminAddManga tabShow={tabShow} setTabShow={setTabShow} />
      )}
    </section>
  );
}

export default AdminManga;

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
      {tabShow ? <AdminListManga /> : <AdminAddManga />}
    </section>

    // {mangaList.map((manga) => (
    //   <div className="manga-item">
    //     <div className="data-container">
    //       <h2 className="category-title">Titre</h2>
    //       <p>{manga.title}</p>
    //     </div>
    //     <div className="data-container">
    //       <h2 className="category-title">Description</h2>
    //       <p>{manga.description}</p>
    //     </div>
    //     <div className="data-container">
    //       <h2 className="category-title">Auteur</h2>
    //       <p>{manga.author}</p>
    //     </div>
    //     <div className="data-container">
    //       <h2 className="category-title">Illustrateur</h2>
    //       <p>{manga.illustrator}</p>
    //     </div>
    //     <div className="data-container">
    //       <h2 className="category-title">Scénariste</h2>
    //       <p>{manga.script_writer}</p>
    //     </div>
    //     <div className="data-container">
    //       <h2 className="category-title">Date de sortie</h2>
    //       <p>{manga.release_date}</p>
    //     </div>
    //     <div className="data-container">
    //       <h2 className="category-title">Genre</h2>
    //       <p>Liste des genre</p>
    //     </div>
    //   </div>
    // ))}
  );
}

export default AdminManga;

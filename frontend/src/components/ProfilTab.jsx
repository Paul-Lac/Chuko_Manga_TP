import { useState } from "react";
import ProfilTabAdvert from "./ProfilTabAdvert";
import ProfilTabFeedback from "./ProfilTabFeedback";
import ProfilTabOrder from "./ProfilTabOrder";
import "./ProfilTab.css";

function ProfilTab() {
  const [activeTab, setActiveTab] = useState("advertTab");

  return (
    <div className="container-onglets">
      <div className="container-button">
        <button
          type="button"
          className={
            activeTab === "advertTab"
              ? "button-onglet selected"
              : "button-onglet"
          }
          onClick={() => setActiveTab("advertTab")}
        >
          Annonces
        </button>
        <button
          type="button"
          className={
            activeTab === "feedbackTab"
              ? "button-onglet selected"
              : "button-onglet"
          }
          onClick={() => setActiveTab("feedbackTab")}
        >
          Évaluations
        </button>
        <button
          type="button"
          className={
            activeTab === "orderTab"
              ? "button-onglet selected"
              : "button-onglet"
          }
          onClick={() => setActiveTab("orderTab")}
        >
          Achats
        </button>
      </div>

      <div className="container-information">
        {activeTab === "advertTab" && <ProfilTabAdvert />}
        {activeTab === "feedbackTab" && <ProfilTabFeedback />}
        {activeTab === "orderTab" && <ProfilTabOrder />}
      </div>
    </div>
  );
}

export default ProfilTab;

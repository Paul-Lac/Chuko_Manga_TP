import { useState, useEffect } from "react";
import axios from "axios";
import PropTypes from "prop-types";

import "./AdvertFormContent.css";

function AdvertFormContent(props) {
  const {
    advertTitle,
    description,
    handleDescChange,
    handlePriceChange,
    handleTitleChange,
    maxDescReached,
    maxTitleReached,
    price,
    priceErr,
    setConditionId,
    conditionAnounce,
    isNewAdvertPage,
  } = props;

  // State designed to set condition list
  const [conditionList, setConditionList] = useState([]);

  // Fetch condition's list
  useEffect(() => {
    axios
      .get("http://localhost:3310/api/conditions")
      .then((response) => {
        // console.info("Condition are", response.data);
        setConditionList(response.data);
      })
      .catch((error) => {
        console.error("Error fetching conditions:", error);
      });
  }, []);

  return (
    <>
      <label htmlFor="title" className="advert-label">
        Titre *
      </label>
      <input
        className={`advert-input ${maxTitleReached && "advert-wrong-input"}`}
        type="text"
        id="title"
        name="title_search_manga"
        value={advertTitle}
        onChange={handleTitleChange}
        placeholder="ex: Naruto, tome 44"
        required="required"
      />
      <div
        className={
          maxTitleReached
            ? "advert-warning"
            : "advert-warning advert-hide-warning"
        }
      >
        40 caractères maximum
      </div>
      <label htmlFor="description" className="advert-label">
        Description *
      </label>
      <textarea
        className={`advert-description ${maxDescReached && "advert-wrong-input"}`}
        type="text"
        id="description"
        name="description"
        value={description}
        onChange={handleDescChange}
        placeholder="ex: Pages intactes, mais couverture légèrement usée"
        required="required"
      />
      <div
        className={
          maxDescReached
            ? "advert-warning"
            : "advert-warning advert-hide-warning"
        }
      >
        255 caractères maximum
      </div>
      <label htmlFor="condition" className="advert-label">
        Etat *
      </label>
      <select
        id="condition"
        className="advert-select"
        name="article_condition_id"
        onChange={(e) => setConditionId(e.target.value)}
      >
        <option value="">
          {isNewAdvertPage
            ? "Sélectionne l'état de ton article"
            : conditionAnounce}
        </option>
        {conditionList.map((conditionItem) => (
          <option key={conditionItem.id} value={conditionItem.id}>
            {conditionItem.name_condition}
          </option>
        ))}
      </select>
      <label htmlFor="price" className="advert-label">
        Prix hors frais de port *
      </label>
      <input
        className={`advert-input ${priceErr && "advert-wrong-input"}`}
        type="text"
        id="price"
        name="price"
        value={price}
        onChange={handlePriceChange}
        placeholder="0.00€"
        required="required"
      />
      <div
        className={
          priceErr ? "advert-warning" : "advert-warning advert-hide-warning"
        }
      >
        Format incorrect
      </div>
    </>
  );
}

export default AdvertFormContent;

AdvertFormContent.propTypes = {
  advertTitle: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  handleDescChange: PropTypes.func.isRequired,
  handlePriceChange: PropTypes.func.isRequired,
  handleTitleChange: PropTypes.func.isRequired,
  maxDescReached: PropTypes.bool.isRequired,
  maxTitleReached: PropTypes.bool.isRequired,
  price: PropTypes.string.isRequired,
  priceErr: PropTypes.bool.isRequired,
  previewUrls: PropTypes.shape({
    image1: PropTypes.string,
    image2: PropTypes.string,
    image3: PropTypes.string,
  }).isRequired,
  setConditionId: PropTypes.func.isRequired,
  conditionAnounce: PropTypes.string.isRequired,
  isNewAdvertPage: PropTypes.bool.isRequired,
};

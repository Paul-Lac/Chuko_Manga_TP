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
  } = props;

  // State designed to set condition's list
  const [conditionList, setConditionList] = useState([]);

  // Fetch condition's list
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/api/conditions`)
      .then((response) => {
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
        name="title_advert"
        value={advertTitle}
        onChange={handleTitleChange}
        placeholder="ex: Naruto, tome 44"
        required
      />
      <div
        className={`advert-warning ${!maxTitleReached && "advert-hide-warning"}`}
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
        required
      />
      <div
        className={`advert-warning ${!maxDescReached && "advert-hide-warning"}`}
      >
        255 caractères maximum
      </div>
      <label htmlFor="condition" className="advert-label">
        Etat *
      </label>
      <select
        id="condition"
        className="advert-select-condition"
        name="article_condition_id"
        onChange={(e) => setConditionId(e.target.value)}
        required
      >
        <option value="">Sélectionne l'état de ton article</option>
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
        required
      />
      <div className={`advert-warning ${!priceErr && "advert-hide-warning"}`}>
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
  setConditionId: PropTypes.func.isRequired,
};

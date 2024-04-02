/* eslint-disable import/no-extraneous-dependencies */
import PropTypes from "prop-types";
import { useState, useEffect } from "react";
// eslint-disable-next-line import/no-unresolved
import { Rating } from "react-simple-star-rating";

function Stars({ ratingValue, starSize }) {
  const [rating, setRating] = useState(0);

  useEffect(() => {
    setRating(ratingValue);
  }, [ratingValue]);

  return (
    <div className="stars">
      <Rating initialValue={rating} readonly allowFraction size={starSize} />
    </div>
  );
}

Stars.propTypes = {
  ratingValue: PropTypes.number.isRequired,
  starSize: PropTypes.number,
};

Stars.defaultProps = {
  starSize: 24,
};

export default Stars;

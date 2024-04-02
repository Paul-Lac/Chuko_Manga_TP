import { useState, useEffect } from "react";
import RangeSlider from "react-range-slider-input";
import "react-range-slider-input/dist/style.css";
import { useFilters } from "../context/FilterContext";

function PriceSlider() {
  const { applyDynamicPriceFilter, priceRange } = useFilters();
  const [min, setMin] = useState(priceRange.minPrice);
  const [max, setMax] = useState(priceRange.maxPrice);
  const [value, setValue] = useState([
    priceRange.minPrice,
    priceRange.maxPrice,
  ]);

  const handleInput = (newValue) => {
    const minGap = 1;
    let newLowerValue = newValue[0];
    let newUpperValue = newValue[1];

    if (newUpperValue - newLowerValue < minGap) {
      if (newLowerValue > value[0]) {
        newUpperValue = newLowerValue + minGap;
      } else if (newUpperValue < value[1]) {
        newLowerValue = newUpperValue - minGap;
      }
    }

    if (newLowerValue >= min && newUpperValue <= max) {
      setValue([newLowerValue, newUpperValue]);
      console.info(
        "Appel de applyDynamicPriceFilter avec les valeurs :",
        newLowerValue,
        newUpperValue
      );

      applyDynamicPriceFilter(newLowerValue, newUpperValue);
    }
  };

  useEffect(() => {
    setMin(priceRange.minPrice);
    setMax(priceRange.maxPrice);
    setValue([priceRange.minPrice, priceRange.maxPrice]);
  }, [priceRange.minPrice, priceRange.maxPrice]);

  return (
    <div className="price-slider-container">
      <div className="min-max-labels">
        <span>{min} €</span>
        <span>{max} €</span>
      </div>
      <RangeSlider
        className="double-thumb"
        value={value}
        min={min}
        max={max}
        onInput={handleInput}
      />
      <div className="values-display">
        <span className="slider-value slider-value-left">{value[0]} €</span>
        <span className="slider-value slider-value-right">{value[1]} €</span>
      </div>
    </div>
  );
}

export default PriceSlider;

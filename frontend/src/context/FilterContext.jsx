import PropTypes from "prop-types";
import { createContext, useContext, useState, useMemo } from "react";

const FiltersContext = createContext();

export const useFilters = () => useContext(FiltersContext);

export function FiltersProvider({ children }) {
  const [filters, setFilters] = useState({});
  const [batch, setBatch] = useState("");
  const [priceRange, setPriceRange] = useState({ minPrice: 0, maxPrice: 0 });
  const [dynamicPriceFilter, setDynamicPriceFilter] = useState({
    // minPrice: null,
    // maxPrice: null,
  });

  const applyDynamicPriceFilter = (minPrice, maxPrice) => {
    console.info(
      "Mise à jour de dynamicPriceFilter avec les valeurs :",
      minPrice,
      maxPrice
    );

    setDynamicPriceFilter({ minPrice, maxPrice });
  };
  const updateFilters = (newFilters) => {
    setFilters((prevFilters) => ({ ...prevFilters, ...newFilters }));
  };
  const setMinMaxPrices = (minPrice, maxPrice) => {
    setPriceRange({ minPrice, maxPrice });
  };
  const contextValue = useMemo(() => {
    return {
      filters,
      updateFilters,
      batch,
      setBatch,
      setMinMaxPrices,
      priceRange,
      dynamicPriceFilter,
      applyDynamicPriceFilter,
    };
  }, [filters, batch, priceRange, dynamicPriceFilter]);

  return (
    <FiltersContext.Provider value={contextValue}>
      {children}
    </FiltersContext.Provider>
  );
}

FiltersProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

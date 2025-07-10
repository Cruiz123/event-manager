import React from "react";
// import { Event } from "../types/Events";

interface FilterBarProps {
  categories: string[];
  selectedCategory: string;
  petFriendly: boolean;
  onCategoryChange: (category: string) => void;
  onPetFriendlyChange: (petFriendly: boolean) => void;
}

function FilterBar({
  categories,
  selectedCategory,
  petFriendly,
  onCategoryChange,
  onPetFriendlyChange,
}: FilterBarProps) {
  return (
    <div className="filter-bar">
      <div className="filter-group">
        <label htmlFor="category">Filtrar Categoría:</label>
        <select
          id="category-filter"
          value={selectedCategory}
          onChange={(e) => onCategoryChange(e.target.value)}
        >
          <option value="">Todas las categorías</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>
      <div className="filter-group">
        <label>
          <input
            type="checkbox"
            checked={petFriendly}
            onChange={(e) => onPetFriendlyChange(e.target.checked)}
          />
          Solo eventos aptos para mascotas
        </label>
      </div>
    </div>
  );
}

export default FilterBar;

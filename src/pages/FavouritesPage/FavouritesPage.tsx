import React from "react";
import { useFavorites } from "../../context/FavoritesContext";
import { Link } from "react-router-dom";
import "./FavouritesPage.css";

export const FavoritesPage: React.FC = () => {
  const { selectedRecipes } = useFavorites();

  return (
    <div className="favourites-container">
      <h1 className="favourites-title">Favourites Meals</h1>
      {selectedRecipes.length === 0 ? (
        <p>Choose favorite meals</p>
      ) : (
        <div className="favourite-cards">
          {selectedRecipes.map((meal) => (
            <div key={meal.idMeal} className="favourite-card">
              <Link
                to={`/meal/${meal.idMeal}`}
                className="favourite-link"
              >
                <div>
                  <img
                    src={meal.strMealThumb}
                    alt={meal.strMeal}
                    className="favourite-image"
                  />
                  <h3 className="favourite-name">{meal.strMeal}</h3>
                  <p className="favourite-category">
                    <strong>Category:</strong> {meal.strCategory}
                  </p>
                  <p className="favourite-origin">
                    <strong>Origin:</strong> {meal.strArea}
                  </p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

import React from "react";
import { useFavorites } from "../../context/FavoritesContext";

import { Link } from "react-router-dom";
import { Meal } from "../../types/Meal";

import "./FavouritesPage.css";

export const FavoritesPage: React.FC = () => {
  const { selectedRecipes } = useFavorites();

  const getIngredients = (meal: any) => {
    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
      const ingredient = meal[`strIngredient${i}`];
      const measure = meal[`strMeasure${i}`];
      if (ingredient) {
        ingredients.push(`${ingredient} (${measure})`);
      }
    }
    return ingredients;
  };

  return (
    <div className="favourites-container">
      <h1 className="favourites-title">Favourite Meals</h1>
      {selectedRecipes.length === 0 ? (
        <p>You have no favourite meals yet.</p>
      ) : (
        <div className="favourite-cards">
          {selectedRecipes.map((meal: Meal) => (
            <div key={meal.idMeal} className="favourite-card">
              <Link to={`/meal/${meal.idMeal}`} className="favourite-link">
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

                  <div>
                    <h4 className="favourite-ing-title">Ingredients:</h4>
                    <ul className="favourite-ing-list">
                      {getIngredients(meal).length > 0 ? (
                        getIngredients(meal).map((ingredient, index) => (
                          <li key={index}>{ingredient}</li>
                        ))
                      ) : (
                        <p>No ingredients available</p>
                      )}
                    </ul>
                  </div>

                  <p className="favourite-instructions">
                    <strong>Instructions:</strong> {meal.strInstructions}
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

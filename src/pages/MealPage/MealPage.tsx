import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Meal } from "../../types/Meal";

import "./MealPage.css";

export const MealPage: React.FC = () => {
  const { mealId } = useParams();
  const [meal, setMeal] = useState<Meal | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchRecipeData = async () => {
      try {
        if (!mealId) return;

        const response = await fetch(
          `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch recipe data");
        }

        const data = await response.json();

        if (data.meals && data.meals.length > 0) {
          const mealData = data.meals[0];
          setMeal({
            idMeal: mealData.idMeal,
            strMeal: mealData.strMeal,
            strMealThumb: mealData.strMealThumb,
            strCategory: mealData.strCategory,
            strArea: mealData.strArea,
            strIngredient: getIngredients(mealData),
            strInstructions: mealData.strInstructions,
          });
        } else {
          throw new Error("Recipe not found");
        }
      } catch (error) {
        setError(error instanceof Error ? error.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchRecipeData();
  }, [mealId]);

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

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!meal) {
    return <p>Recipe not found</p>;
  }

  return (
    <div className="meal-page">
      <h1 className="meal-title">{meal.strMeal}</h1>

      <div className="meal-page-content">
        <div className="meal-content-left">
          <img
            className="meal-desc-img"
            src={meal.strMealThumb}
            alt={meal.strMeal}
          />
          <p className="meal-desc-category">Category: {meal.strCategory}</p>
          <p className="meal-desc-origin">Origin: {meal.strArea}</p>
        </div>

        <div className="meal-content-right">
          <h2 className="meal-ing-title">Ingredients:</h2>
          <ul className="meal-ing-list">
            {meal.strIngredient.map((ingredient, index) => (
              <li className="meal-ing-item" key={index}>
                {ingredient}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <h2 className="meal-instr-title">Instructions:</h2>
      <p className="meal-instr-desc">{meal.strInstructions}</p>
    </div>
  );
};

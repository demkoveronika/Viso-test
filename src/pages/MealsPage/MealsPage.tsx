import React, { useState, useEffect } from "react";
import "./MealsPage.css";
import { MealCard } from "../../components/MealCard/MealCard";
import { Meal } from "../../types/Meal";
import { Pagination } from "../../components/Pagination/Pagination";
import { useFavorites } from "../../context/FavoritesContext";
import { Link } from "react-router-dom";

export const MealsPage: React.FC = () => {
  const [meals, setMeals] = useState<Meal[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  const { addToFavorites } = useFavorites();

  const totalPages = Math.ceil(meals.length / itemsPerPage);

  const currentMeals = meals.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    const fetchMeals = async () => {
      try {
        const alphabet = "abcdefghijklmnopqrstuvwxyz".split("");
        const urls = alphabet.map(
          (letter) => `https://www.themealdb.com/api/json/v1/1/search.php?s=${letter}`
        );

        const responses = await Promise.all(
          urls.map((url) => fetch(url).then((res) => res.json()))
        );

        const allMeals = responses.flatMap((response) => response.meals || []);

        const uniqueMeals = Array.from(
          new Set(allMeals.map((meal) => meal.idMeal))
        ).map((id) => allMeals.find((meal) => meal.idMeal === id));

        setMeals(uniqueMeals as Meal[]);
        setLoading(false);
      } catch (error) {
        setError("Failed to fetch meals");
        setLoading(false);
      }
    };

    fetchMeals();
  }, []);

  if (error) {
    return <div>{error}</div>;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="meal-titles">
        <h1 className="meal-list-title">Meals List</h1>
        <Link to="/favorites">
          <h3 className="meal-favorites">Favourites →</h3>
        </Link>
      </div>

      <div className="meal-container">
        {currentMeals.map((meal) => (
          <MealCard
            key={meal.idMeal}
            id={meal.idMeal}
            title={meal.strMeal}
            image={meal.strMealThumb}
            category={meal.strCategory}
            origin={meal.strArea}
            onAddToFavorites={() => addToFavorites(meal)}
          />
        ))}
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

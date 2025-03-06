import React, { useState, useEffect } from "react";
import { useFavorites } from "../../context/FavoritesContext";
import { Link } from "react-router-dom";

import { Meal } from "../../types/Meal";
import { MealCard } from "../../components/MealCard/MealCard";
import { Pagination } from "../../components/Pagination/Pagination";

import "./MealsPage.css";

export const MealsPage: React.FC = () => {
  const [meals, setMeals] = useState<Meal[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  const [searchQuery, setSearchQuery] = useState<string>("");
  const [category, setCategory] = useState<string>("All");
  const [categories, setCategories] = useState<string[]>([]);

  const { addToFavorites } = useFavorites();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          "https://www.themealdb.com/api/json/v1/1/categories.php"
        );
        const data = await response.json();
        setCategories(
          data.categories.map(
            (category: { strCategory: string }) => category.strCategory
          )
        );
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchMeals = async () => {
      try {
        const alphabet = "abcdefghijklmnopqrstuvwxyz".split("");
        const urls = alphabet.map(
          (letter) =>
            `https://www.themealdb.com/api/json/v1/1/search.php?s=${letter}`
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

  const filteredMeals = meals.filter((meal) => {
    if (category === "All") {
      return true;
    }
    return meal.strCategory === category;
  });

  useEffect(() => {
    const debounceSearch = setTimeout(() => {
      setSearchQuery(searchQuery);
    }, 500);

    return () => clearTimeout(debounceSearch);
  }, [searchQuery]);

  const searchedMeals = filteredMeals.filter((meal) =>
    meal.strMeal.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const mealsToDisplay = searchedMeals;

  const totalPages = Math.ceil(mealsToDisplay.length / itemsPerPage);

  const currentMeals = mealsToDisplay.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

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

      <div className="filters">
        <input
          type="text"
          placeholder="Search meals..."
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <select onChange={(e) => setCategory(e.target.value)} value={category}>
          <option value="All">All Categories</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
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

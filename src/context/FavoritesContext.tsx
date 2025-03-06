import React, { createContext, useContext, useState } from "react";
import { ReactNode } from "react";

import { Meal } from "../types/Meal";

interface FavoritesContextType {
  selectedRecipes: Meal[];
  addToFavorites: (meal: Meal) => void;
  removeFromFavorites: (mealId: string) => void;
}

interface FavoritesProviderProps {
  children: ReactNode;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(
  undefined
);

export const FavoritesProvider: React.FC<FavoritesProviderProps> = ({
  children,
}) => {
  const [selectedRecipes, setSelectedRecipes] = useState<Meal[]>([]);

  const addToFavorites = (meal: Meal) => {
    setSelectedRecipes((prev) => {
      if (prev.some((mealInFavorites) => mealInFavorites.idMeal === meal.idMeal)) {
        return prev;
      }
      return [...prev, meal];
    });
  };

  const removeFromFavorites = (mealId: string) => {
    setSelectedRecipes((prev) => prev.filter((meal) => meal.idMeal !== mealId));
  };

  return (
    <FavoritesContext.Provider
      value={{ selectedRecipes, addToFavorites, removeFromFavorites }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error("useFavorites must be used within a FavoritesProvider");
  }
  return context;
};

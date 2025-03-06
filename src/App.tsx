import React from "react";
import "./App.css";
import { FavoritesProvider } from "./context/FavoritesContext";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { FavoritesPage } from "./pages/FavouritesPage/FavouritesPage";
import { MealPage } from "./pages/MealPage/MealPage";
import { MealsPage } from "./pages/MealsPage/MealsPage";

function App() {
  return (
    <FavoritesProvider>
      <div className="App">
        <Router>
          <Routes>
            <Route path="/" element={<MealsPage />} />
            <Route path="/favorites" element={<FavoritesPage />} />
            <Route path="/meal/:mealId" element={<MealPage />} />
          </Routes>
        </Router>
      </div>
    </FavoritesProvider>
  );
}

export default App;

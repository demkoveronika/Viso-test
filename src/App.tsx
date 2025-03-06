import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { FavoritesProvider } from "./context/FavoritesContext";

import { FavoritesPage } from "./pages/FavouritesPage/FavouritesPage";
import { MealPage } from "./pages/MealPage/MealPage";
import { MealsPage } from "./pages/MealsPage/MealsPage";

import "./App.css";

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

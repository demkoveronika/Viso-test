import { useNavigate } from "react-router-dom";
import { useFavorites } from "../../context/FavoritesContext";

import "./MealCard.css";

interface RecipeCardProps {
  id: string;
  title: string;
  category: string;
  origin: string;
  image: string;
  onAddToFavorites: (id: string) => void;
}

export const MealCard: React.FC<RecipeCardProps> = ({
  id,
  title,
  image,
  category,
  origin,
  onAddToFavorites,
}) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/meal/${id}`);
  };

  const { selectedRecipes } = useFavorites();

  const isFavorite = selectedRecipes.some((meal) => meal.idMeal === id);

  return (
    <div className="meal-card" onClick={handleCardClick}>
      <img src={image} alt={title} className="meal-img" />
      <div>
        <h3 className="meal-name">{title}</h3>
        <p className="meal-category">
          <strong>Category:</strong> {category}
        </p>
        <p className="meal-origin">
          <strong>Origin:</strong> {origin}
        </p>
        <button
          className={`add-to-favorites ${isFavorite ? "added" : ""}`}
          onClick={(e) => {
            e.stopPropagation();
            onAddToFavorites(id);
          }}
        >
          <i className="add-title">{isFavorite ? "Added" : "Add"}</i>
        </button>
      </div>
    </div>
  );
};

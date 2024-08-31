// frontend/src/components/RecipeList.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const RecipeList = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/recipes")
      .then((response) => setRecipes(response.data))
      .catch((error) => console.error("There was an error fetching the recipes!", error));
  }, []);

  return (
    <div className="recipe-list">
      <h2>Recipe List</h2>
      {recipes.length === 0 ? (
        <p>No recipes available. Try adding some!</p>
      ) : (
        recipes.map((recipe) => (
          <div key={recipe._id}>
            <h3>{recipe.title}</h3>
            <p>{recipe.ingredients}</p>
            <Link to={`/recipes/${recipe._id}`}>View Details</Link>
          </div>
        ))
      )}
    </div>
  );
};

export default RecipeList;

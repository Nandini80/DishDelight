import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const RecipeList = () => {
  const [recipes, setRecipes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    axios.get("http://localhost:5000/api/recipes")
      .then((response) => {
        setRecipes(response.data);
        const uniqueCategories = [...new Set(response.data.map(recipe => recipe.category))];
        setCategories(uniqueCategories);
      })
      .catch((error) => console.error("Error fetching recipes:", error));
  }, []);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    if (category === "") {
      axios.get("http://localhost:5000/api/recipes")
        .then((response) => setRecipes(response.data))
        .catch((error) => console.error("Error fetching recipes:", error));
    } else {
      axios.get(`http://localhost:5000/api/recipes/category/${category}`)
        .then((response) => setRecipes(response.data))
        .catch((error) => console.error("Error fetching recipes by category:", error));
    }
  };

  return (
    <div className="recipe-list">
      <h2>Recipe List</h2>
      <div className="category-filter">
        <label htmlFor="category">Browse by Category:</label>
        <select
          id="category"
          value={selectedCategory}
          onChange={(e) => handleCategoryChange(e.target.value)}
        >
          <option value="">All Categories</option>
          {categories.map((category, index) => (
            <option key={index} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>
      {recipes.length === 0 ? (
        <p>No recipes available. Try adding some!</p>
      ) : (
        recipes.map((recipe) => (
          <div key={recipe._id}>
            <h3>{recipe.title}</h3>
            <p>{recipe.ingredients}</p>
            <Link to={`/recipes/${recipe._id}`}>View Details</Link>
            <Link to={`/recipes/${recipe._id}/edit`}>Edit</Link>
          </div>
        ))
      )}
    </div>
  );
};

export default RecipeList;
